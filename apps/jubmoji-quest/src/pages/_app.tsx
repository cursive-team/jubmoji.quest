import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="md:container flex-col relative min-h-[100vh] px-[16px] pb-28">
        <div className="mx-auto w-full">
          <Component {...pageProps} />
        </div>
      </div>
      <AppFooter />
      <Toaster
        toastOptions={{
          className: "font-dm-sans",
          duration: 5000,
        }}
      />
    </QueryClientProvider>
  );
}
