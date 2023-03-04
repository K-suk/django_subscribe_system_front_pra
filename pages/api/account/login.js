import cookie from 'cookie'

export default async(req, res)=>{
    if(req.method === 'POST'){
        const {email, password } = req.body
        const body=JSON.stringify({
            email,
            password,
        })
        try{
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/login/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            const data = await apiRes.json()
            if (apiRes.status === 200){
                res.setHeader('Set-Cookie', [
                    cookie.serialize('access', data.access, {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'Lax',
                        path: '/',
                        maxAge: 60*60,
                    }),
                    cookie.serialize('refresh', data.refresh, {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'Lax',
                        path: '/',
                        maxAge: 60*60*24*3,
                    }),
                ])
                return res.status(200).json({
                    success: 'We successed to login to your account',
                })
            }else{
                return res.status(apiRes.status).json({
                    error: 'We failed to login to your account',
                })
            }
        }catch(err){
            return res.status(500).json({
                error: 'We failed to login to your account',
            })
        }
    }else{
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} not allowded.` })
    }
}