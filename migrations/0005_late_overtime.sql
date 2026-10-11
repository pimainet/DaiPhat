ALTER TABLE attendance ADD COLUMN IF NOT EXISTS late_minutes integer DEFAULT 0;
ALTER TABLE attendance ADD COLUMN IF NOT EXISTS overtime_minutes integer DEFAULT 0;
