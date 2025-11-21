import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/Product'

function CreatPage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "", // Changed from "Image" to "image"
    })
    
    const {createProduct} = useProductStore();
    const toast = useToast();
    
    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct);
        console.log(success, message);
        
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Clear form after successful creation
            setNewProduct({ name: "", price: "", image: "" });
        }
    }
    
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"}
                    p={8}
                    bg={useColorModeValue("white", "gray.800")}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                        <Input
                            placeholder='Product Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                        <Input
                            placeholder='Product Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatPage