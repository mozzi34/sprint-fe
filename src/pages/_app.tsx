import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContextProvider } from '../context/UserContextProvider';
import { NextPage } from 'next';

export default function App({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
