import { authEnum } from "@/constants/auth.const"
import { PublicRoutes } from "@/routes/models/routes.model"
import { useAppSelector } from "@/store/store"
import { Navigate, Outlet } from "react-router-dom"

export const AuthGuard = () => {
    const userState = useAppSelector((store) => store.auth)
    return userState.status === authEnum.AUTHENTIC ? <Outlet/> : <Navigate to={PublicRoutes.LOGIN}/>
}

export default AuthGuard