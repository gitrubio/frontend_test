import { Table, Group, Button, Center } from '@mantine/core';
import { TableProductsProps } from '@/types';
import { MdModeEdit, MdDelete  } from "react-icons/md";


export function TableProducts({ products , openDrawer,deleteProduct}: TableProductsProps) {
    const rows = products.map((product) => {
        return (
            <Table.Tr key={product.Handle}>
                <Table.Td>
                   
                        {product.Title}
                    
                </Table.Td>
                <Table.Td>{product.Grams}</Table.Td>
                <Table.Td>

                    {product.Stock}

                </Table.Td>
                <Table.Td>{product.Price}</Table.Td>
                <Table.Td>
                    <Group justify="center">
                        <Button onClick={()=>openDrawer(product,'edit')} size="xs"  color="orange" variant="light">
                            <MdModeEdit/>
                        </Button>
                        <Button  onClick={()=>deleteProduct(product.id)} size="xs" color="red" variant="light">
                            <MdDelete/>
                        </Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Table.ScrollContainer minWidth={300} >
            <Table verticalSpacing="xs" striped horizontalSpacing={'lg'}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Gram</Table.Th>
                        <Table.Th>Stock</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th><Center>Actions</Center></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}