import { Container, VStack, Text, SimpleGrid, Button } from '@chakra-ui/react'
import React from 'react'
import { FaRegFaceSadTear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/Product'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const {fetchProducts, products} = useProductStore();

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={12}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >     
        Available Products     
        </Text>
        <SimpleGrid
        columns={{
            base:1,
            md:2,
            lg:3
        }}
        spacing={10}
        w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <VStack spacing={4}>
            <FaRegFaceSadTear size={100} color='gray.400' />
            <Text fontSize='xl' fontWeight='bold' color='gray.600'>
              No products available
            </Text>
            <Link to='/create'>
              <Button colorScheme='blue'>Create Product</Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage