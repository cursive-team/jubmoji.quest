import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import AppFooter from "@/components/AppFooter";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-shark-970">
        <div className="container flex flex-col relative min-h-[100vh] pb-28">
          <Component {...pageProps} />
        </div>
      </div>
      <AppFooter />
      <Toaster
        toastOptions={{
          className: "font-dm-sans",
        }}
      />
    </QueryClientProvider>
  );
}
