create table public.comments (
    id uuid primary key default gen_random_uuid(),
    video_id uuid references public.videos(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default now()
);
alter table public.comments enable row level security;
create policy "Users can read comments" on public.comments for
select using (true);
create policy "Users can insert own comments" on public.comments for
insert with check (auth.uid() = user_id);
create policy "Users can update own comments" on public.comments for
update using (auth.uid() = user_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = user_id);