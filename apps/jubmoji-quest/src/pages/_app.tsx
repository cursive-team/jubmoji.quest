import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { APP_CONFIG } from "@/constants";
import OnlyMobile from "@/components/OnlyMobile";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const showFooter = pageProps?.showFooter ?? true;

  return (
    <>
      <Head>
        <title>{APP_CONFIG.APP_PAGE_TITLE}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <OnlyMobile>
          <div className="md:container flex-col relative px-[16px] pb-28 overflow-hidden">
            <div className="mx-auto w-full">
              <Component {...pageProps} />
            </div>
          </div>
          {showFooter && <AppFooter />}
          <Toaster
            toastOptions={{
              className: "font-dm-sans",
              duration: 5000,
            }}
          />
        </OnlyMobile>
      </QueryClientProvider>
    </>
  );
}
