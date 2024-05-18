import { API } from ".";
import { IProducts, ProductResponse } from "@/types/products.type";

export const ProductService = {

    async getAll(token: string | null, title: string = '', offset: number = 0, logout: () => void): Promise<ProductResponse> {
        try {
            const { status, data } = (await API.get<ProductResponse>(`/products?title=${title}&offset=${offset}&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }))
            return data
        } catch (error: any) {
            if(error.response.status === 401){
                logout()
            }
            return {
                products: [],
                totalProducts: 0
            };
        }
},

    async edit(token: string | null, id: string, product: Partial<IProducts>,logout: () => void): Promise<boolean> {
        try {
            await API.patch<IProducts>(`/products/${id}`, product,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return true
        } catch (error: any) {
            if(error.response.status === 401){
                logout()
            }
            return false;
        }
    },
        async delete (token: string | null, id: string,logout: () => void): Promise < boolean > {
            try {
                 await API.delete<boolean>(`/products/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return true;
            } catch(error: any) {
                if(error.response.status === 401){
                    logout()
                }
                return false;
            }
        },
        async create (token: string | null, product:Partial<IProducts>,logout: () => void): Promise < IProducts | null > {
            try {
                const { data } = await API.post<IProducts>("/products",product,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return data;
            } catch(error: any) {
                if(error.response.status === 401){
                    logout()
                }
                return null;
            }
        },

        
}