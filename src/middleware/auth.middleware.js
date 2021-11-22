
import { useLocalContext } from '../context/context'
import { Navigate } from 'react-router-dom'


export default function AuthMiddleware({ children }) {

    const { authLogin } = useLocalContext();



    return (
        <>
            {children}
            {!authLogin ? (
                <Navigate
                    to={{
                        pathname: "/login",
                    }}
                />
            ) : ""}
        </>
    )
}