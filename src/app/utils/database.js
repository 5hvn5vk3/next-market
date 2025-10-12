import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    "https://mgmerdrjozkmqdzhxfvh.supabase.co", // ProjectURL
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbWVyZHJqb3prbXFkemh4ZnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4ODg4MjMsImV4cCI6MjA3NTQ2NDgyM30.DtwyqAlTxzG5qFLqGigTFOAEzvDKovpxbhxmTnHyLec" // APIKey
)

export default supabase
