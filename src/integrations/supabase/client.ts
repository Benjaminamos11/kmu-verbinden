// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kwlczdokanwdtwhnojcw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bGN6ZG9rYW53ZHR3aG5vamN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NDgyNTIsImV4cCI6MjA1MTEyNDI1Mn0.S_gNAdMzhHY2iaw_3CHKrzgmjwR3x2szTxlPmksEaaY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);