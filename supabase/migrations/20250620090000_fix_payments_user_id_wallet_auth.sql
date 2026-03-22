/*
  # Fix Payments Table user_id for Wallet-Based Authentication

  1. Problem
    - payments.user_id is UUID type (from migration 20250620044226_small_sun.sql)
    - App uses wallet addresses (text) as user IDs, not Supabase Auth UUIDs
    - Inserts fail with: "invalid input syntax for type uuid: '0x...'"
    - VAT refunds can't be saved to Supabase

  2. Solution
    - Change user_id from UUID to TEXT to support wallet addresses
    - Drop any foreign key constraints if they exist
    - Update RLS policies if needed (they should already work with text)
*/

-- Check if user_id column exists and is UUID type
DO $$
BEGIN
    -- Check if user_id is UUID type
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'payments' 
        AND column_name = 'user_id' 
        AND data_type = 'uuid'
    ) THEN
        -- Drop any foreign key constraints on user_id
        ALTER TABLE public.payments
        DROP CONSTRAINT IF EXISTS payments_user_id_fkey;
        
        -- Change user_id from UUID to TEXT
        ALTER TABLE public.payments
        ALTER COLUMN user_id TYPE text USING user_id::text;
        
        RAISE NOTICE 'Successfully changed payments.user_id from UUID to TEXT';
    ELSIF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'payments' 
        AND column_name = 'user_id' 
        AND data_type = 'text'
    ) THEN
        RAISE NOTICE 'payments.user_id is already TEXT type - no changes needed';
    ELSE
        -- If user_id doesn't exist, add it as TEXT
        ALTER TABLE public.payments
        ADD COLUMN IF NOT EXISTS user_id text;
        
        RAISE NOTICE 'Added user_id column as TEXT to payments table';
    END IF;
END $$;

-- Update index if it exists
DROP INDEX IF EXISTS idx_payments_user_id;
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);

-- Note: RLS policies from migration 20250620060000_vat_refund_access.sql should already work
-- They filter by employee_id and user_id, which will now work with text values
