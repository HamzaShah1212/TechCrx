import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', SUPABASE_URL)
console.log('Supabase Key exists:', !!SUPABASE_ANON_KEY)

let supabase = null

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    console.log('Supabase initialized successfully')
  } catch (err) {
    console.error('Failed to initialize Supabase:', err)
  }
} else {
  console.warn('Missing Supabase credentials')
}

export { supabase }
