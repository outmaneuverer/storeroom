import React from "react";
import {
  Container,
  Flex,
  Text,
  HStack,
  Link,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container
      maxW="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      py={4}
      mt="auto"
      borderTop="1px solid"
      borderColor={borderColor}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align="center"
        justify="space-between"
        gap={3}
        px={6}
      >
        {/* Left Section: Copyright */}
        <Text fontSize="sm" color={textColor} textAlign="center">
          © {new Date().getFullYear()} Products Store. All rights reserved.
        </Text>

        {/* Right Section: Social Links */}
        <HStack spacing={3}>
          <Link href="https://github.com" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
            />
          </Link>
          <Link href="https://facebook.com" isExternal>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
            />
          </Link>
          <Link href="https://linkedin.com" isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
            />
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Footer;
