// js/supabaseClient.js
const SUPABASE_URL = "https://zmvazbrtpqbvurghginq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptdmF6YnJ0cHFidnVyZ2hnaW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzk1MTMsImV4cCI6MjA4NTcxNTUxM30.KAuHA-Du37lsixyXzEWVrh-M_-BYeK6Hhb-DqlH2BYs";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
