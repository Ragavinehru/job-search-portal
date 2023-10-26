import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://jmmmahusotnqiiyjmnnh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbW1haHVzb3RucWlpeWptbm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3MDU2MDAsImV4cCI6MjAxMzI4MTYwMH0.vAQEzNgquSTPxU816RVvVYeVJ1La_ZJfwhMPKaw07eg'
// const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

// export default supabase;