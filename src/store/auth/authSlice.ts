import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, TAuthStatus } from '../../types';
import { authEnum } from '../../constants/auth.const';

interface IAuthSlice {
	status: TAuthStatus; // 'not-authenticated', 'authenticated'
	user: IUser | null;
}

const initialState: IAuthSlice = {
	status: authEnum.UNAUTHENTIC,
	user: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLogin: (state, { payload }: PayloadAction<IUser>) => {
			state.status = authEnum.AUTHENTIC;
			state.user = payload;
		},
		onLogout: (state) => {
			state.status = authEnum.UNAUTHENTIC;
			state.user = null;
		},
	},
});

export const { onLogin, onLogout } = authSlice.actions;