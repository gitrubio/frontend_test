
import { useState } from 'react';
import { ProductService } from '@/services/products.service';
import {  IProducts, ProductResponse } from '@/types/products.type';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { authLogOut } from '@/store/auth/authThunks';

export default function useProducts() {
    const [data,setData] = useState<ProductResponse>({
        products: [],
        totalProducts: 0
    })

    const [loadProducts,setLoadProducts] = useState(false)
    const [loader,setLoader] = useState(false)
    const {token} = useAppSelector(store => store.auth)
    const dispatch = useAppDispatch()
	const navitage = useNavigate()

    const logout = () => {
		dispatch(authLogOut()).then(() => {
			navitage('/login')
		})
	}

    const getProducts = async  (title: string = '',offset: number = 0) => {
        setLoadProducts(true)
        const pagination = offset >= 1 ? (offset-1) * 10 : 0
        const res = await ProductService.getAll(token,title,pagination,logout);
        setData(res)
        setLoadProducts(false)
    }

    const editProduct = async (id: string, product : Partial<IProducts>) => {
        setLoader(true)
        const res = await ProductService.edit(token,id,product,logout)
        setLoader(false)
        return res
    }

    const createProduct = async (product : Partial<IProducts>) => {
        setLoader(true)
        const res = await ProductService.create(token,product,logout)
        setLoader(false)
        return res != null
    
    }
    const deleteProduct = async (id: string) => {
        setLoader(true)
        const res = await ProductService.delete(token,id,logout)
        setLoader(false)
        return res
    }
	return {
        data,
        loadProducts,
        loader,
        getProducts,
        editProduct,
        createProduct,
        deleteProduct
	}
}