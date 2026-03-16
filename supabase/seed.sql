-- -- Enable the pgcrypto extension to use gen_salt()
-- create extension if not exists "pgcrypto" with schema "extensions";
-- -- Set search_path to include the extensions schema so Postgres can find the function
-- set search_path = extensions,
--     public,
--     auth;
-- 1. Create the Auth Users (This goes into the hidden auth schema)
-- We use '00000000-0000-0000-0000-000000000001' style IDs for testing
INSERT INTO auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data,
        created_at,
        updated_at,
        instance_id
    )
VALUES (
        'a1111111-1111-1111-1111-111111111111',
        'alex@example.com',
        extensions.crypt('password123', extensions.gen_salt('bf')),
        (now()),
        '{"display_name": "Alex Rivera"}',
        (now()),
        (now()),
        '00000000-0000-0000-0000-000000000000'
    ),
    (
        'b2222222-2222-2222-2222-222222222222',
        'sarah@example.com',
        extensions.crypt('password123', extensions.gen_salt('bf')),
        (now()),
        '{"display_name": "Sarah Jenkins"}',
        (now()),
        (now()),
        '00000000-0000-0000-0000-000000000000'
    ),
    (
        'c3333333-3333-3333-3333-333333333333',
        'nature@example.com',
        extensions.crypt('password123', extensions.gen_salt('bf')),
        (now()),
        '{"display_name": "Nature Hub"}',
        (now()),
        (now()),
        '00000000-0000-0000-0000-000000000000'
    );
-- 1. Create 3 Different User Profiles
-- We use fixed UUIDs here so the IDs are consistent every time you reset
INSERT INTO public.profiles (id, username, display_name, bio, avatar_url)
VALUES (
        'a1111111-1111-1111-1111-111111111111',
        'tech_guru',
        'Alex Rivera',
        'Deep dives into Next.js and Supabase.',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    ),
    (
        'b2222222-2222-2222-2222-222222222222',
        'travel_vlogs',
        'Sarah Jenkins',
        'Exploring the world, one city at a time.',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    ),
    (
        'c3333333-3333-3333-3333-333333333333',
        'nature_beats',
        'Nature Hub',
        'Cinematic views of the natural world.',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Nature'
    );
-- 2. Create 10 Videos spread across these 3 users
INSERT INTO public.videos (
        id,
        user_id,
        title,
        description,
        views,
        video_url,
        thumbnail_url,
        duration
    )
VALUES -- Alex (tech_guru)
    (
        gen_random_uuid(),
        'a1111111-1111-1111-1111-111111111111',
        'Big Buck Bunny Intro',
        'The classic open-source animation that started it all.',
        15400,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        '09:56'
    ),
    (
        gen_random_uuid(),
        'a1111111-1111-1111-1111-111111111111',
        'Tears of Steel Preview',
        'A sci-fi short featuring amazing VFX work.',
        8200,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
        '12:14'
    ),
    (
        gen_random_uuid(),
        'a1111111-1111-1111-1111-111111111111',
        'Vento Review',
        'Taking the Volkswagen Vento for a spin around the city.',
        4500,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg',
        '05:43'
    ),
    -- Sarah (travel_vlogs)
    (
        gen_random_uuid(),
        'b2222222-2222-2222-2222-222222222222',
        'Elephants Dream',
        'A surreal journey through a machine-world.',
        22000,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
        '10:53'
    ),
    (
        gen_random_uuid(),
        'b2222222-2222-2222-2222-222222222222',
        'Chromecast Fun',
        'Testing out some cool new streaming features.',
        1200,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
        '01:00'
    ),
    (
        gen_random_uuid(),
        'b2222222-2222-2222-2222-222222222222',
        'Joyrides in 4K',
        'The beauty of the open road in high definition.',
        3100,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
        '00:15'
    ),
    (
        gen_random_uuid(),
        'b2222222-2222-2222-2222-222222222222',
        'The Bullrun Experience',
        'High-speed highlights from the famous rally.',
        12400,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg',
        '00:47'
    ),
    -- Nature Hub (nature_beats)
    (
        gen_random_uuid(),
        'c3333333-3333-3333-3333-333333333333',
        'Sintel Story',
        'The touching tale of a girl and her dragon.',
        45000,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
        '14:48'
    ),
    (
        gen_random_uuid(),
        'c3333333-3333-3333-3333-333333333333',
        'Subaru Street Test',
        'Testing out handling on both dirt and asphalt.',
        5600,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
        '09:54'
    ),
    (
        gen_random_uuid(),
        'c3333333-3333-3333-3333-333333333333',
        'Blazes of Glory',
        'Short cinematic shots of intense fire effects.',
        900,
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
        '00:15'
    );