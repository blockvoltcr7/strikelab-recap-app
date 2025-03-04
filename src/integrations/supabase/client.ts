
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jahdxbrbkygslzmbappq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaGR4YnJia3lnc2x6bWJhcHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNTU2NzAsImV4cCI6MjA1NjYzMTY3MH0.SfnCpwZkzDKC441gub78hrjn4zLU33WAm18oJASx7iU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
