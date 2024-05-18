import { IUser, IUserSlice } from "@/types";
import { API } from ".";
import { IProducts, ProductResponse } from "@/types/products.type";

export const ProductService = {

    async getAll(token: string | null, title: string = '', offset: number = 0): Promise<ProductResponse> {
        try {
            console.log('token', token);

            const { data } = (await API.get<ProductResponse>(`/products?title=${title}&offset=${offset}&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }))
            return data
        } catch (error: any) {
            return {
                products: [],
                totalProducts: 0
            };
        }
},

    async edit(token: string | null, id: string, product: Partial<IProducts>): Promise<boolean> {
        try {
            const { data } = await API.patch<IProducts>(`/products/${id}`, product,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return true
        } catch (error: any) {
            return false;
        }
    },
        async delete (token: string, user: IUser): Promise < { status: number, data: IUserSlice } > {
            try {
                const { status, data } = await API.post<IUserSlice>("/auth/register", user);
                return { status, data };
            } catch(error: any) {
                return { status: error?.response?.status || 500, data: { user: { name: "", email: "" }, access_token: "" } };
            }
        },


}