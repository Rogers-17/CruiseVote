-- 1. Create the profiles table
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    username text unique,
    display_name text,
    avatar_url text,
    bio text,
    created_at timestamp with time zone default now()
);
-- 2. Set up Security
alter table public.profiles enable row level security;
-- Public can read any profile (to see creator names)
create policy "Public profiles are viewable by everyone" on public.profiles for
select using (true);
-- Users can only edit their own profile
create policy "Users can update own profile" on public.profiles for
update using (auth.uid() = id);