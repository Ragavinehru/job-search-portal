import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://jmmmahusotnqiiyjmnnh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbW1haHVzb3RucWlpeWptbm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3MDU2MDAsImV4cCI6MjAxMzI4MTYwMH0.vAQEzNgquSTPxU816RVvVYeVJ1La_ZJfwhMPKaw07eg'
// const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey,
    {
        auth: {
            detectSessionInUrl: false,
            storage: AsyncStorage,
        },
    }
)


export const uploadFile = async (fileinterface) => {
    console.log("fileinterface : ", fileinterface);
    console.log("fileinterface : ", fileinterface.fileName, fileinterface.file);

    const { data, error } = await supabase.storage.from('job_portal').upload(fileinterface.fileName, fileinterface.file)
    console.log("supabase", data, error)
    if (error) {
        // Handle error
    } else {
        // Handle success
        const { data: url } = await supabase.storage.from('job_portal').getPublicUrl(data.path);
        console.log("url ||:", url);
        return url;
    }
}
// export const Uploadfile = createClient(supabaseUrl, supabaseKey, {
//     auth: {
//         storage: AsyncStorage,
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: false,
//     },
// })

// export default supabase;