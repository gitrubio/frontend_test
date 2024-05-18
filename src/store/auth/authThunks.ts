import { notifications } from "@mantine/notifications"
import { onLogin, onLogout } from "./authSlice"
import { AuthService } from "@/services/auth.services"
import { IAuth, IUser } from "@/types"
const welcomeMessage = () => {
    notifications.show({
        id: 'auth-login',
        title: 'Bienvenido !!',
        message: 'Has iniciado sesión correctamente 😎',
        color: 'green',
        autoClose: true,
    })
}

export const authLogin = (user: IAuth,setLoader:  React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: any) => {
        setLoader(true)
        const { data, status } = await AuthService.login(user)
        if (status === 201) {
            welcomeMessage()
            dispatch(
                onLogin({
                    user: data.user,
                    access_token: data.access_token,
                })
            )
        } else {
            notifications.show({
                title: 'Error al iniciar sesión',
                message: 'Usuario o contraseña incorrectos',
                color: 'red',
                autoClose: true,
            })
        }
        setLoader(false)
    }
}

export const authRegister = (user: IUser,setLoader:  React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: any) => {
        setLoader(true)
        const { data, status } = await AuthService.register(user)
        if (status === 201) {
            welcomeMessage()
            dispatch(
                onLogin({
                    user: data.user,
                    access_token: data.access_token,
                })
            )
        }else{
            notifications.show({
                title: 'Error al registrar',
                message: 'El usuario ya existe',
                color: 'red',
                autoClose: true,
            })
        
        }
        setLoader(false)
    }
}
export const authLogOut = () => {
    return async (dispatch: any) => {
        dispatch(onLogout())
        return true
    }
}
