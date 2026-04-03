'use client';

import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppProvider } from '@/context/AppContext';
import { FingerprintProvider } from '@fingerprint/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            placeholderData: (previousData: any) => previousData,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FingerprintProvider apiKey="aEsWP7OD1EfTS5IherkG">
        <AppProvider>{children}</AppProvider>
      </FingerprintProvider>
    </QueryClientProvider>
  );
}
