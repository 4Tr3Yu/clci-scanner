import { createClient } from '@supabase/supabase-js';

const supabaseUrl =   import.meta.env.SUPABASE_URL || 'https://<your-supabase-url>.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || '<your-supbase-key>';

export const supabase = createClient(supabaseUrl, supabaseKey);
