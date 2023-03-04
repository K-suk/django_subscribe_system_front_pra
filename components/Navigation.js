import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/actions/auth";

const Navigation=()=>{
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    const logoutHandler = async()=>{
        if (dispatch && dispatch !== null && dispatch !== undefined){
            await dispatch(logout())
        }
    }
    return (
        <>
            <div className="bg-gray-900">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <p className="text-white hover:text-gray-50 font-extrabold text-lg">
                                    Kosuke Practice
                                </p>
                            </Link>
                        </div>
                        <div className="">
                            {isAuthenticated ? (
                                <div onClick={logoutHandler} className="cursor-pointer button-nav">
                                    Logout
                                </div>
                            ) : (
                                <div>
                                    <Link href="/login">
                                        <p className="button-nav mr-4">Login</p>
                                    </Link>
                                    <Link href="/register">
                                        <p className="button-nav">Register</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation