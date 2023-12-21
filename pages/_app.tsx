import CustomChakraProvider from "@/providers/CustomChakraProvider";
import "../styles/globals.css";
import "@/styles/tailwind.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomChakraProvider>
      <Component {...pageProps} />
    </CustomChakraProvider>
  );
}

export default MyApp;
