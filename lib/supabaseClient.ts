import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wtxmmdzkewzxkptxybdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0eG1tZHprZXd6eGtwdHh5YmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNzU3NDMsImV4cCI6MjA2OTg1MTc0M30.JX5ZHQcy3OSXkLJwQRl0U6cG12klC6-ozp_25q1q0Dw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

