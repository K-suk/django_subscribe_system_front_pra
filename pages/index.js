import { useSelector } from "react-redux"
import Head from "next/head"

const Index=()=>{
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  return(
    <>
      <Head>
        <title>Subscription app</title>
      </Head>
      <div className="text-center text-2xl">
        {isAuthenticated && user ? (
          <div>
            <div>Welcome! Mr.{user.name}</div>
            <div>You are not pro account yet</div>
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h64">This is free Content</div>
            </div>
          </div>
        ):(
          <div className="text-center text-2xl">
            This is Subscription app presented by Kosuke.
          </div>
        )}
      </div>
    </>
  )
}

export default Index