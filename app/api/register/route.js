import { supabase } from '@/lib/supabaseClient'
import bcrypt from 'bcryptjs'

// REGISTER
export async function POST(request) {
    try{
        // Ambil data dari request body
        const body = await request.json()
        console.log('Received body:', body)
        const {name, email, password, role, address, phone} = body
        
        // Cek validasi
        if(!name || !email || !password || !role || !address || !phone){
            return new Response(JSON.stringify({error: 'Tolong pastikan semua field terisi'}), {status: 400})   
        }

        // Cek apakah email sudah pernah digunakan
        const {data: existingUser} = await supabase.from('users').select('*').eq('email', email).single()
        if(existingUser){
            return new Response(JSON.stringify({error: 'Email sudah pernah didaftarkan'}), {status: 400})
        }

        // Hash password yang akan disimpan ke encrypt by bycryptjs
        const hashPassword = await bcrypt.hash(password, 10)

        // Save data ke database
        const {data, error} = await supabase.from('users').insert([
            {name, email, password: hashPassword, role, address, phone}
        ])

        // Error save data user ke database
        if(error){
            return new Response(JSON.stringify({error: error.message}), {status: 500})

        }

        return new Response(JSON.stringify({message: 'Data user sudah berhasil tersimpan', user:data}), {status: 200})
    }
    catch(err){
        return new Response(JSON.stringify({error: 'Server Error'}), {status: 500})
    }
}