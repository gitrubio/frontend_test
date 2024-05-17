export interface IUser {
    name: string;
    email: string;
}

export type TAuthStatus = 'not-authenticated' | 'authenticated';