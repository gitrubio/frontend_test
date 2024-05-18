
import { useState } from 'react';
import { ProductService } from '@/services/products.service';
import {  IProducts, ProductResponse } from '@/types/products.type';
import { useAppSelector } from '@/store';

export default function useProducts() {
    const [data,setData] = useState<ProductResponse>({
        products: [],
        totalProducts: 0
    })

    const [loadProducts,setLoadProducts] = useState(false)
    const [loader,setLoader] = useState(false)
    const {token} = useAppSelector(store => store.auth)

    const getProducts = async  (title: string = '',offset: number = 0) => {
        setLoadProducts(true)
        const pagination = offset >= 1 ? (offset-1) * 10 : 0
        const res = await ProductService.getAll(token,title,pagination);
        setData(res)
        setLoadProducts(false)
    }

    const editProduct = async (id: string, product : Partial<IProducts>) => {
        setLoader(true)
        const res = await ProductService.edit(token,id,product)
        setLoader(false)
        return res
    }
	return {
        data,
        loadProducts,
        loader,
        getProducts,
        editProduct
	}
}