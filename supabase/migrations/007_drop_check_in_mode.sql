-- Drop deprecated check_in_mode from both tables
-- Replaced by entry_mode / exit_mode (migration 005)
ALTER TABLE public.locations DROP COLUMN check_in_mode;
ALTER TABLE public.workers DROP COLUMN check_in_mode;
