import { IAuth, IUser, IUserSlice } from "@/types";
import { API } from ".";

export const AuthService = {

    async login(send: IAuth): Promise<{ status: number, data: IUserSlice }> {
        try {
            const { status, data } = await API.post<IUserSlice>("/auth/login", send);
            return { status, data };
        } catch (error: any) {
            return { status: error?.response?.status || 500, data: { user: { name: "", email: "" }, access_token: "" } };
        }
    },

    async register(user: IUser): Promise<{ status: number, data: IUserSlice }> {
        try {
            const { status, data } = await API.post<IUserSlice>("/auth/register", user);
            return { status, data };
        } catch (error: any) {
            return { status: error?.response?.status || 500, data: { user: { name: "", email: "" }, access_token: "" } };
        }
    },


}