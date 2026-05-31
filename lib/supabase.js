// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Using dummy/placeholder data - replace with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-anon-key')) {
  console.warn('Supabase environment variables not configured - using dummy data')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
// Made By Krishna Patil