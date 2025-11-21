import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaRegSquarePlus } from "react-icons/fa6";

function Navbar() {
  // ✅ Fix: Call useColorMode() properly
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        {/* --- Brand Name --- */}
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Products Store</Link>
        </Text>

        {/* --- Right Side Buttons --- */}
        <HStack spacing={4} alignItems="center">
          {/* Create Product Button */}
          <Link to="/create">
            <Button
              leftIcon={<FaRegSquarePlus />}
              colorScheme="cyan"
              variant="solid"
            >
            </Button>
          </Link>

          {/* Theme Toggle Button */}
          <Button onClick={toggleColorMode} colorScheme="gray" variant="ghost">
            {colorMode === "light" ? (
              <IoMoon fontSize="20px" />
            ) : (
              <LuSun fontSize="20px" />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
