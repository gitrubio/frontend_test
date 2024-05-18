import { IProducts } from "./products.type";

export type DrawerType = 'edit' | 'create'

export interface DrawerProps { type: DrawerType, opened: boolean; close: () => void, currentProduct: IProducts | null, onFinished: () => void }