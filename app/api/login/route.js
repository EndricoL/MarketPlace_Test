import {supabase} from '@/lib/supabaseClient'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request) {
    try{
        //Request dari body untuk login (email & password)
        const body = await request.json()
        const {email, password} = body

        if(!email || !password){
            return new Response(JSON.stringify({error: 'Silakan isi field email dan password'}), {status: 400})
        }

        // Search user dari database based on email
        const {data: user, error} = await supabase.from('users').select('*').eq('email', email).single()

        if(error || !user){
            return new Response(JSON.stringify({error: 'User tidak ada'}), {status: 404})
        }

        // Cek password match dengan email atau tidak
        const matching = await bcrypt.compare(password, user.password)
        if(!matching){
            return new Response(JSON.stringify({error: 'Password atau email salah'}), {status: 401})
        }

        // Email dan password sesuai
        return new Response(JSON.stringify({
            message: 'Login sukses',
            user: {
                email: user.email,
                role: user.role,   
                id: user.id,
                name: user.name
            }
        }), {status: 200})
    }
    catch(err){
        return new Response(JSON.stringify({error: 'Server Error'}), {status: 500})
    }
}