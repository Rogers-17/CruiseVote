-- 1. Contestants table
create table if not exists contestants (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    photo_url text not null,
    department text not null,
    bio text,
    vote_count int default 0,
    -- Added for real-time performance
    created_at timestamp with time zone default timezone('utc'::text, now())
);
-- 2. Vote codes table
create table if not exists vote_codes (
    id uuid primary key default gen_random_uuid(),
    code text unique not null,
    is_used boolean not null default false,
    used_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
-- 3. Votes table
create table if not exists votes (
    id uuid primary key default gen_random_uuid(),
    contestant_id uuid references contestants(id) on delete cascade,
    vote_code_id uuid references vote_codes(id) on delete cascade,
    device_fingerprint text not null,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
-- 4. Poll settings table
create table if not exists poll_settings (
    id serial primary key,
    voting_start timestamp with time zone,
    voting_end timestamp with time zone,
    is_active boolean not null default false
);
-- 5. Indexes for speed
create index if not exists idx_vote_code_code on vote_codes(code);
create index if not exists idx_votes_device_fingerprint on votes(device_fingerprint);
create index if not exists idx_votes_contestant_id on votes(contestant_id);
-- 6. TRIGGER: Auto-update contestant vote_count
create or replace function increment_contestant_vote() returns trigger as $$ begin
update contestants
set vote_count = vote_count + 1
where id = new.contestant_id;
return new;
end;
$$ language plpgsql;
create trigger tr_increment_vote
after
insert on votes for each row execute function increment_contestant_vote();
-- 7. ENABLE REALTIME
alter publication supabase_realtime
add table contestants;
INSERT INTO vote_codes (code)
SELECT 'STARZ-' || upper(substring(md5(random()::text), 1, 8))
FROM generate_series(1, 10000) ON CONFLICT (code) DO NOTHING;
-- Function to check if a device has already voted 5 times
create or replace function check_vote_limit() returns trigger as $$ begin if (
        select count(*)
        from votes
        where device_fingerprint = new.device_fingerprint
    ) >= 5 then raise exception 'Device limit reached: This device has already cast 5 votes.';
end if;
return new;
end;
$$ language plpgsql;
-- Trigger to run the check before any new vote is inserted
create trigger tr_check_vote_limit before
insert on votes for each row execute function check_vote_limit();