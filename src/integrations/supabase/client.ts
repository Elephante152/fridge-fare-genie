// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kbpvlqmlemujurizizan.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticHZscW1sZW11anVyaXppemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MTE3NjgsImV4cCI6MjA1MTA4Nzc2OH0.w4bRlp1aifKNahbTk2EhYRw6m2iFdGUUQEGk8pwvzBw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);