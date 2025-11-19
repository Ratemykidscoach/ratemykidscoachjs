import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mpyzoxrckllctdayqory.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1weXpveHJja2xsY3RkYXlxb3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDI0NjksImV4cCI6MjA3ODQ3ODQ2OX0.QAQxyqF40Gq6fc-wuG5DK1IdfGfRZCz3blId5Hr3oRQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

