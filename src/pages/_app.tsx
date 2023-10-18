import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AppFooter from "@/components/AppFooter";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-[100vh] bg-shark-970 pb-28">
        <div className="container">
          <Component {...pageProps} />
        </div>
        <AppFooter />
      </div>
    </QueryClientProvider>
  );
}
