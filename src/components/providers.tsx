'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();
export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
        </QueryClientProvider>
    );
}
