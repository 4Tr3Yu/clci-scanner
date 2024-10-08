import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://<your-supabase-url>.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '<your-supbase-key>';

export const supabase = createClient(supabaseUrl, supabaseKey);
