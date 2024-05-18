export interface IProducts {
    id: string

    Handle: string

    Title: string

    Description: string

    SKU: string


    Grams: number


    Stock: number


    Price: number


    CompareAtPrice: number


    Barcode: string

}

export interface ProductResponse { products: IProducts[], totalProducts: number }

export interface TableProductsProps { products: IProducts[], openDrawer: (product: IProducts, type: 'edit' | 'create') => void, deleteProduct: (id: string) => void }