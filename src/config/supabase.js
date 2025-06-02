import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hsplhmrzjtywgdhvsirv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcGxobXJ6anR5d2dkaHZzaXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODAwMDksImV4cCI6MjA2MzY1NjAwOX0.mcfbXpHW3eWzl3SRey5P7-CpNxoUG1R9zqwFiKorIDk";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 