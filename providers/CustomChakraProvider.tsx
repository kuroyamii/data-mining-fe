import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import React from "react";

// const theme = extendBaseTheme({});

const CustomChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default CustomChakraProvider;
