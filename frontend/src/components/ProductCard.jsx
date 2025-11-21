import { 
    Box, 
    Button,
    Heading, 
    HStack, 
    IconButton, 
    Image, 
    Input,
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text, 
    useColorModeValue, 
    useDisclosure, 
    useToast, 
    VStack 
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React from 'react'
import { useProductStore } from '../store/Product';

function ProductCard({ product }) {
    const textColor = useColorModeValue('gray.600', 'gray.400');
    const bg = useColorModeValue('white', 'gray.800');
    
    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [UpdateProduct, setUpdateProduct] = React.useState(product);
    
    const handleUpdateProduct = async (productId) => {
        const {success, message} = await updateProduct(productId, UpdateProduct);
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
            onClose(); // Close modal after successful update
        }
    };

    const handleDeleteProduct = async (productId) => {
        const {success, message} = await deleteProduct(productId);
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
        }
    };
    
    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s ease-in-out'
            _hover={{
                transform: 'translateY(-5px)',
                shadow: 'xl',
            }}
            bg={bg}
        >
            <Image 
                src={product.image} 
                alt={product.name} 
                h={'400px'} 
                w='full' 
                objectFit='cover'
            />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    sh. {product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton 
                        icon={<EditIcon/>} 
                        colorScheme='blue'
                        onClick={onOpen}
                        aria-label='Edit product'
                    />
                    <IconButton 
                        icon={<DeleteIcon/>} 
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                        aria-label='Delete product'
                    />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                value={UpdateProduct.name}
                                onChange={(e) => setUpdateProduct({...UpdateProduct, name: e.target.value})}
                            />
                            <Input
                                placeholder='Product Price'
                                type='number'
                                value={UpdateProduct.price}
                                onChange={(e) => setUpdateProduct({...UpdateProduct, price: e.target.value})}
                            />
                            <Input
                                placeholder='Product Image URL'
                                value={UpdateProduct.image}
                                onChange={(e) => setUpdateProduct({...UpdateProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id)}>
                            Save Changes
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard