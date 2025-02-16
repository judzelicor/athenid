import { createClient } from '@supabase/supabase-js'

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_PROJECT_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_PROJECT_KEY)