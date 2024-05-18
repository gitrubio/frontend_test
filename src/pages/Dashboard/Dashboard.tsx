import { Header } from '@/components/Header/Header'
import { TableProducts } from '@/components/TableProducts/TableProducts'
import { ActionIcon, AppShell, Button, Container, Grid, Loader, Pagination, ScrollArea, TextInput, rem } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import classes from './dashboard.module.css'
import useProducts from '@/hooks/useProducts'
import { useEffect, useState } from 'react'
import { totalPage } from '@/utils/common.utils'
import { useDisclosure } from '@mantine/hooks'
import DrawerEdit from '@/components/DrawerEdit/DrawerEdit'
import { IProducts } from '@/types/products.type'

export default function Dashboard() {

    const [opened, { open, close }] = useDisclosure(false);
    const [currentProduct, setCurrentProduct] = useState<IProducts| null>(null)
    const [typeDrawer, setTypeDrawer] = useState<'edit'|'create'>('create')
    const { data, loadProducts, getProducts, deleteProduct } = useProducts()
    const [title,setTitle] = useState('')
    const [page,setPage] = useState(1)


    useEffect(() => {
        getProducts(title,page)
    }, [page])

    const clearInput = () => {
        setTitle('')
        getProducts('',1)
    }

    const openDrawer = (product: IProducts | null,type : 'edit' | 'create') => {
        setCurrentProduct(product)
        open()
        setTypeDrawer(type)
    }
    const productDelete = async (id : string)=> {
       const res = await deleteProduct(id)
         if(res){
              getProducts(title,page)
         }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          getProducts( event.currentTarget.value,page)
        }
    }

    return (
        <AppShell padding={0} m={0} header={{ height: 40 }} >
            <AppShell.Header  m={0}>
                <Header />
            </AppShell.Header>

            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`} className={classes.container}>
                <Container maw={rem(800)} >
                    <DrawerEdit opened={opened} close={close} currentProduct={currentProduct} type={typeDrawer} onFinished={()=>  getProducts(title)} />
                    <Grid  grow gutter={'xs'}  justify='space-between'  className={classes.grid} >
                        <Grid.Col span={9}>
                            <TextInput
                                onKeyDown={handleKeyDown}
                                rightSection={
                                    (title != '' && (
                                        <ActionIcon
                                            onClick={() => clearInput()}
                                            color="gray"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                        </ActionIcon>
                                    ))
                                }
                                placeholder="Search by any field"
                                mb="md"
                                size='md'
                                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid.Col>
                        <Grid.Col  span={"auto"}>

                            <Button disabled={loadProducts} color={"#E12242"} onClick={()=>openDrawer(null,'create')} variant="light" size="md" radius={"md"}>New</Button>
                        </Grid.Col>
                    </Grid>
                    <ScrollArea miw={300} w={'100%'} h={500} >
                        {loadProducts ?
                            <Container display={'flex'} style={{ justifyContent: 'center'}}>
                                 <Loader color="red" />
                            </Container>:
                            <TableProducts products={data.products} openDrawer={openDrawer} deleteProduct={productDelete} />}
                    </ScrollArea>
                    <div className={classes.paginator}>
                        <Pagination total={totalPage(data.totalProducts, 10)} onChange={(page)=>{
                            getProducts(title,page)
                            setPage(page)
                            }}/>
                    </div>
                </Container>
            </AppShell.Main>

        </AppShell>
    )
}
