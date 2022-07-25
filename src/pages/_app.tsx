import "@/styles/globals.css";
import { CustomAppProps } from "@/types/next";
import { SpotlightProvider } from "@/contexts/SportlightContext";
import Head from "next/head";
import { SITE_INFO } from "@/constants/site";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SpotlightProvider>
      <Head>
        <title>{SITE_INFO.title}</title>
        <meta name="description" content={SITE_INFO.desc} />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </SpotlightProvider>
  );
}

export default MyApp;
