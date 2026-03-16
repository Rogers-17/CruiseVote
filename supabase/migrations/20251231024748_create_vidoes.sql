-- 1. Create the videos table
create table public.videos (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    description text,
    video_url text not null,
    thumbnail_url text,
    duration text,
    -- e.g., "14:02"
    views bigint default 0,
    category text,
    created_at timestamp with time zone default now()
);
-- 2. Set up Security
alter table public.videos enable row level security;
-- Public can watch any video
create policy "Videos are viewable by everyone" on public.videos for
select using (true);
-- Only the creator can upload/edit/delete
create policy "Users can insert own videos" on public.videos for
insert with check (auth.uid() = user_id);
create policy "Users can update own videos" on public.videos for
update using (auth.uid() = user_id);
create policy "Users can delete own videos" on public.videos for delete using (auth.uid() = user_id);