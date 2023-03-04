export default async(req, res)=>{
    if(req.method === 'POST'){
        const { name, email, password } = req.body
        const body=JSON.stringify({
            name,
            email,
            password,
        })
        try{
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            const data = await apiRes.json()
            if (apiRes.status === 201){
                return res.status(200).json({
                    success: 'Account registration is successed!',
                })
            }else{
                return res.status(apiRes.status).json({
                    error: 'We failed to register your account',
                })
            }
        }catch(err){
            return res.status(500).json({
                error: 'We failed to register your account',
            })
        }
    }else{
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} not allowded.` })
    }
}