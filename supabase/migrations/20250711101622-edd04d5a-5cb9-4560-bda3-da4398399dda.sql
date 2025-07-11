-- Add appearance settings columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN theme text DEFAULT 'dark',
ADD COLUMN font_size text DEFAULT 'medium',
ADD COLUMN animations_enabled boolean DEFAULT true,
ADD COLUMN compact_mode boolean DEFAULT false;