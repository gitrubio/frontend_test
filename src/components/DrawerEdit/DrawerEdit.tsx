import { IProducts } from '@/types/products.type';
import { Button, Drawer, NumberInput, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { Editor } from '../Editor/Editor';
import useProducts from '@/hooks/useProducts';
import { notifications } from '@mantine/notifications';
import { DrawerProps } from '@/types';
import { textMessage } from './utils';

export default function DrawerEdit({close,opened,currentProduct,type, onFinished}: DrawerProps ){
  const [newDescription,setNewDescription] = useState<string>('')  
  const {editProduct,loader, createProduct} = useProducts()
  const form = useForm({
        initialValues: {
          Title:  '',
          Description: '',
          SKU: '',
          Grams:  1,
          Stock:  0,
          Price:  0,
          CompareAtPrice:  0,
          Barcode: '',
        }
      });

      useEffect(() => {
        form.setValues({
          Title: currentProduct?.Title || '',
          SKU: currentProduct?.SKU ||'',
          Grams: currentProduct?.Grams || 0,
          Stock: currentProduct?.Stock || 0,
          Price: currentProduct?.Price || 0,
          CompareAtPrice: currentProduct?.CompareAtPrice || 0,
          Barcode: currentProduct?.Barcode || '',
        })
      }, [currentProduct])

      const submit = async () => {
        const product : Partial<IProducts> = {
          ...form.values,
          Description: newDescription
        }
        let res = false
        if(type === 'create'){
          res =  await createProduct(product)
        }else {
         res =  await editProduct(currentProduct?.id || '',product)
        }
       if(res){
          notifications.show({title: textMessage[type].title,message: textMessage[type].message,color: 'blue'})
           close()
           onFinished()
       }else{
          notifications.show({title: 'Error',message: 'Error process',color: 'red'})
       }
      }

    return (
    <Drawer size={'lg'} withCloseButton={false} opened={opened} onClose={close}   position={type === 'edit' ? 'left' : 'right'}>
        
        <Stack>
          
          <TextInput
            required
            label="Title"
            placeholder="Title of product"
            value={form.values.Title}
            onChange={(event) => form.setFieldValue('Title', event.currentTarget.value.toUpperCase())}
            radius="md"
          />
        

        <SimpleGrid cols={2}>
        <TextInput
          required
          label="SKU"
          value={form.values.SKU}
          onChange={(event) => form.setFieldValue('SKU', event.currentTarget.value)}
        
          radius="md"
        />

        <NumberInput
          required
          label="Grams"
          value={form.values.Grams}
          onChange={(value) => form.setFieldValue('Grams',+value)}
          radius="md"
        />
        </SimpleGrid>

        <SimpleGrid cols={2}>
        <NumberInput
            required
            label="Stock"
            value={form.values.Stock}
            onChange={(value) => form.setFieldValue('Stock',  +value)}
            radius="md"
        />
        <NumberInput
            required
            label="Price"
            value={form.values.Price}
            onChange={(value) => form.setFieldValue('Price',  +value)}
            radius="md"
        />
        </SimpleGrid>
      
       <SimpleGrid cols={2}>
       <NumberInput
            required
            label="CompareAtPrice"
            value={form.values.CompareAtPrice}
            onChange={(value) => form.setFieldValue('CompareAtPrice',   +value)}
            radius="md"
        />
        <TextInput
          required
          label="Barcode"
          value={form.values.Barcode}
          onChange={(event) => form.setFieldValue('Barcode', event.currentTarget.value)}
          radius="md"
        />
       </SimpleGrid>
       
        <label>Description</label>
        <Editor content={currentProduct?.Description || ''} setDescription={setNewDescription}/>

        <SimpleGrid cols={2} mt={20}>
          <Button onClick={close} color="gray" variant="outline" loading={loader} >Cancel</Button>
          <Button color="blue" type="submit" onClick={()=>submit()} loading={loader}  >Save</Button>
        </SimpleGrid>
      </Stack>
     
      </Drawer>
  )
}
