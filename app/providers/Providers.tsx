'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/lib/authContext';
import { CartProvider } from '@/lib/cartContext';

const queryClient = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

// Combine all providers into one component
export function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouterCacheProvider>
                <CssBaseline />
                <AuthProvider>
                    <CartProvider>{children}</CartProvider>
                </AuthProvider>
            </AppRouterCacheProvider>
        </QueryClientProvider>
    );
}