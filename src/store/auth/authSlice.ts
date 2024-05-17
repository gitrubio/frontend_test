import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuth, IUserSlice, TAuthStatus } from '@/types';
import { authEnum } from '@/constants/auth.const';

interface IAuthSlice {
	status: TAuthStatus; // 'not-authenticated', 'authenticated'
	user: IAuth | null;
    token: string | null;
}

const initialState: IAuthSlice = {
	status: authEnum.UNAUTHENTIC,
	user: null,
    token: null,
};

export const persistLocalStorageState = ( authInfo : IAuthSlice) => {
	localStorage.setItem('auth',JSON.stringify(authInfo))
}

export const authSlice = createSlice({
	name: 'auth',
	initialState:  localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) as IAuthSlice: initialState,
	reducers: {
		onLogin: (state, { payload }: PayloadAction<IUserSlice>) => {
			state.status = authEnum.AUTHENTIC;
			state.user = payload.user;
            state.token = payload.access_token;
            persistLocalStorageState(state)
		},
		onLogout: (state) => {
			state.status = authEnum.UNAUTHENTIC;
			state.user = null;
            state.token = null;
            localStorage.removeItem('auth')
		},
	},
});

export const { onLogin, onLogout } = authSlice.actions;