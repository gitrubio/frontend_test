import { useAppDispatch } from '../store/store'
import { authLogOut, authLogin, authRegister } from '@/store/auth/authThunks'
import { useNavigate } from 'react-router-dom'
import {  IAuth, IUser } from '../types/auth.types';
import { useState } from 'react';

export default function useAuth() {
	const dispatch = useAppDispatch()
	const navitage = useNavigate()
    const [loading,setLoading] = useState(false)
	const login = (values: IAuth) => {
		dispatch(authLogin(values,setLoading))
	}
    const register = (values: IUser) => {
        dispatch(authRegister(values,setLoading))
    }


	const logout = () => {
		dispatch(authLogOut()).then(() => {
			navitage('/login')
		})
	}
	return {
		login,
        register,
		logout,
        loading
	}
}