import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { register } from '@/actions/auth'
import { Oval } from 'react-loader-spinner'
import Head from 'next/head'

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const loading = useSelector((state) => state.auth.loading)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formData

    const onChange = (e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (dispatch && dispatch !== null && dispatch !== undefined){
            await dispatch(register(name, email, password))
        }
    }

    if (typeof window !== 'undefined' && isAuthenticated){
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>subscribe app | register an account</title>
            </Head>
            <div className="text-center text-2xl mb-5">Register an account</div>
            <form className="w-1/3 mx-auto" onSubmit={onSubmit}>
                <div className="mb-4">
                    <div className="mb-1" htmlFor="name">
                        Name:
                    </div>
                    <input
                        className="input-form"
                        type="text"
                        name="name"
                        placeholder="Kosuke"
                        onChange={onChange}
                        value={name}
                        required
                    />
                </div>
                <div className="mb-4">
                    <div className="mb-1" htmlFor="email">
                        Email:
                    </div>
                    <input
                        className="input-form"
                        type="email"
                        name="email"
                        placeholder="xxx@xxx.com"
                        onChange={onChange}
                        value={email}
                        required
                    />
                </div>
                <div className="mb-4">
                    <div className="mb-1" htmlFor="password">
                        Password:
                    </div>
                    <input
                        className="input-form"
                        type="password"
                        name="password"
                        placeholder="More than 8 letters"
                        onChange={onChange}
                        value={password}
                        minLength="8"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    {loading ? (
                        <Oval color="#f59e00" width={50} height={50} />
                    ) : (
                        <button className="button-yellow" type="submit">
                            Send
                        </button>
                    )}
                </div>
            </form>
        </>
    )
}

export default Register