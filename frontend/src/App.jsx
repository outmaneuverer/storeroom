import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatPage from "./pages/CreatPage";
import Footer from "./components/Footer";

function App(){
  return(
    <Flex minH={"100vh"} direction={"column"}>
    <Box minH={"100vh"} bg={useColorModeValue ("gray.300, gray.1000")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatPage />} />
      </Routes>
      <Footer />
    </Box>
  </Flex>
  )
}

export default App