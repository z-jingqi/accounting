import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { client } from '../lib/apollo-client';
import { queryClient } from '../lib/query-client';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <NextUIProvider>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <main className="light text-foreground bg-background">
              <Component {...pageProps} />
            </main>
          </QueryClientProvider>
        </ApolloProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
} 
