-- CLEAR EVERYTHING (Optional but safer to do manually in SQL Editor if tables exist)
-- drop table if exists votes, vote_codes, contestants, polls cascade;
-- 1. Polls Table
create table polls (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text unique not null,
    -- For clean URLs
    description text,
    is_active boolean default true,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone default now(),
    -- Ensures the poll can't end before it starts
    constraint valid_dates check (end_date > start_date)
);
-- 2. Contestants (Linked to Poll)
create table contestants (
    id uuid primary key default gen_random_uuid(),
    poll_id uuid references polls(id) on delete cascade,
    name text not null,
    photo_url text not null,
    department text not null,
    bio text,
    vote_count int default 0,
    created_at timestamp with time zone default now()
);
-- 3. Vote Codes (With Status Tracking)
create table vote_codes (
    id uuid primary key default gen_random_uuid(),
    poll_id uuid references polls(id) on delete cascade,
    code text not null,
    status text default 'available',
    -- 'available' or 'voted'
    is_used boolean default false,
    used_at timestamp with time zone,
    unique(poll_id, code)
);
-- 4. Votes Table (The Audit Trail)
create table votes (
    id uuid primary key default gen_random_uuid(),
    poll_id uuid references polls(id) on delete cascade,
    contestant_id uuid references contestants(id) on delete cascade,
    vote_code_id uuid references vote_codes(id) on delete cascade,
    device_fingerprint text not null,
    created_at timestamp with time zone default now()
);
-- 5. TRIGGER: Auto-Update Status & Count
create or replace function handle_new_vote() returns trigger as $$ begin -- Update Contestant Count
update contestants
set vote_count = vote_count + 1
where id = new.contestant_id;
-- Update Code Status
update vote_codes
set status = 'voted',
    is_used = true,
    used_at = now()
where id = new.vote_code_id;
return new;
end;
$$ language plpgsql;
create trigger tr_after_vote
after
insert on votes for each row execute function handle_new_vote();
-- 6. TRIGGER: Device Limit (5 per poll)
create or replace function check_device_limit() returns trigger as $$ begin if (
        select count(*)
        from votes
        where device_fingerprint = new.device_fingerprint
            and poll_id = new.poll_id
    ) >= 5 then raise exception 'Device limit reached for this poll.';
end if;
return new;
end;
$$ language plpgsql;
create trigger tr_pre_vote before
insert on votes for each row execute function check_device_limit();
-- 7. Realtime
alter publication supabase_realtime
add table contestants;
alter publication supabase_realtime
add table polls;