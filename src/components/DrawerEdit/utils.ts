import { DrawerType } from "@/types";

export const textMessage : Record<DrawerType,{title: string, message: string}> = {
    'create' : {
        title : 'Create Product',
        message: 'Product has been created'
    },
    'edit' : {
        title : 'Edit Product',
        message: 'Product has been updated'
    }
}