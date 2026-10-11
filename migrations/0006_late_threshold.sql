ALTER TABLE attendance ADD COLUMN IF NOT EXISTS late_threshold_minutes integer DEFAULT 15;
