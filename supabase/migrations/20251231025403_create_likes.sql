create table public.likes (
    id uuid primary key default gen_random_uuid(),
    video_id uuid references public.videos(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    created_at timestamp with time zone default now(),
    unique (video_id, user_id)
);
alter table public.likes enable row level security;
create policy "Users can like videos" on public.likes for
insert with check (auth.uid() = user_id);
create policy "Users can view likes" on public.likes for
select using (true);
create policy "Users can delete their likes" on public.likes for delete using (auth.uid() = user_id);