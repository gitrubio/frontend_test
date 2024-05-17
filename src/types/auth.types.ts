export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IAuth {
    name: string;
    email: string;
}

export interface IUserSlice {
    user : IAuth;
    access_token: string;
}

export type TAuthStatus = 'not-authenticated' | 'authenticated';