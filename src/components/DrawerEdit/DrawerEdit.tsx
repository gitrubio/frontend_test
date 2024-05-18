import { IProducts } from '@/types/products.type';
import { Button, Drawer, NumberInput, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { Editor } from '../Editor/Editor';
import useProducts from '@/hooks/useProducts';
import { notifications } from '@mantine/notifications';

export default function DrawerEdit({close,opened,currentProduct,type, onFinished}: { type: 'edit' | 'create', opened: boolean; close: () => void, currentProduct : IProducts | null, onFinished: () => void}){
  const [newDescription,setNewDescription] = useState<string>('')  
  const {editProduct,loader} = useProducts()
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
        },
    
        validate: {
          Title: (val) => (val.trim().length > 4 ? null : 'Title is too short'),
          Description: (val) => (val.trim().length > 10 ? 'Description is too short' : null),
        },
      });
      useEffect(() => {
        form.setValues({
          Title: currentProduct?.Title || '',
          Description: currentProduct?.Description || '',
          SKU: currentProduct?.SKU ||'',
          Grams: currentProduct?.Grams || 1,
          Stock: currentProduct?.Stock || 0,
          Price: currentProduct?.Price || 0,
          CompareAtPrice: currentProduct?.CompareAtPrice || 0,
          Barcode: currentProduct?.Barcode || '',
        })
      }, [currentProduct])

      const submit = async () => {
        console.log('form.values',form.values)
        console.log('description',newDescription)
        const product : Partial<IProducts> = {
          ...form.values,
          Description: newDescription
        }
       const res =  await editProduct(currentProduct?.id || '',product)
       if(res){
          notifications.show({title: 'Product updated',message: 'Product has been updated',color: 'blue'})
           close()
       }else{
          notifications.show({title: 'Error',message: 'Error updating product',color: 'red'})
       }
       onFinished()
      }
    return (
    <Drawer size={'lg'} withCloseButton={false} opened={opened} onClose={close}   position={type === 'edit' ? 'left' : 'right'}>
        
        <Stack>
          
          <TextInput
            required
            label="Title"
            placeholder="Title of product"
            value={form.values.Title}
            onChange={(event) => form.setFieldValue('Title', event.currentTarget.value)}
            error={form.errors.name && 'user is too short'}
            radius="md"
          />
        

        <SimpleGrid cols={2}>
        <TextInput
          required
          label="SKU"
        
          value={form.values.SKU}
          onChange={(event) => form.setFieldValue('SKU', event.currentTarget.value)}
          error={form.errors.email && 'Invalid email'}
          radius="md"
        />

        <NumberInput
          required
          label="Grams"
          value={form.values.Grams}
          onChange={(value) => form.setFieldValue('Grams',+value)}
          error={form.errors.password && 'Password should include at least 6 characters'}
          radius="md"
        />
        </SimpleGrid>

        <SimpleGrid cols={2}>
        <NumberInput
            required
            label="Stock"
            value={form.values.Stock}
            onChange={(value) => form.setFieldValue('Stock',  +value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
        />
        <NumberInput
            required
            label="Price"
            value={form.values.Price}
            onChange={(value) => form.setFieldValue('Price',  +value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
        />
        </SimpleGrid>
      
       <SimpleGrid cols={2}>
       <NumberInput
            required
            label="CompareAtPrice"
            value={form.values.CompareAtPrice}
            onChange={(value) => form.setFieldValue('CompareAtPrice',   +value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
        />
        <TextInput
          required
          label="Barcode"
          value={form.values.Barcode}
          onChange={(event) => form.setFieldValue('Barcode', event.currentTarget.value)}
          error={form.errors.password && 'Password should include at least 6 characters'}
          radius="md"
        />
       </SimpleGrid>
       
        <label>Description</label>
        {opened && <Editor content={form.values.Description} setDescription={setNewDescription}/>}
        <SimpleGrid cols={2} mt={20}>
          <Button onClick={close} color="gray" variant="outline" loading={loader} >Cancel</Button>
          <Button color="blue" type="submit" onClick={()=>submit()} loading={loader}  >Save</Button>
        </SimpleGrid>
      </Stack>
     
      </Drawer>
  )
}
