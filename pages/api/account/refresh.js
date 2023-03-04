import cookie from 'cookie'

export default async(req,res)=>{
    if(req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const refresh = cookies.refresh ?? false
        if(refresh === false){
            return res.status(401).json({
                error: "You don't have refresh token",
            })
        }
        const body = JSON.stringify({
            refresh,
        })
        try{
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/refresh/`,{
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
                ])
                return res.status(200).json({
                    success: 'We successed to get refresh token',
                })
            }else{
                return res.status(apiRes.status).json({
                    error: 'We failed to get refresh token',
                })
            }
        }catch(err){
            return res.status(500).json({
                error: 'We failed to get refresh token',
            })
        }
    }else{
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ error: `Method ${req.method} not allowded.` })
    }
}