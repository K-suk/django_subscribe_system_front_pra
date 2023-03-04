import cookie from 'cookie'

export default async(req,res)=>{
    if(req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const refresh = cookies.refresh ?? false
        if(refresh === false){
            return res.status(403).json({
                error: "You don't have access token",
            })
        }
        const body = JSON.stringify({
            token: access,
        })
        try{
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/verify/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            if (apiRes.status === 200){
                return res.status(200).json({
                    success: 'We successed to get access token',
                })
            }else{
                return res.status(apiRes.status).json({
                    error: 'We failed to get access token',
                })
            }
        }catch(err){
            return res.status(500).json({
                error: 'We failed to get access token',
            })
        }
    }else{
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ error: `Method ${req.method} not allowded.` })
    }
}