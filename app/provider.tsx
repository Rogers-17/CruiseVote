'use client';

import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppProvider } from '@/context/AppContext';
import { FingerprintProvider } from '@fingerprint/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use React.useState to ensure the client is only created once
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Prevents data from being marked as "undefined" on initial load
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
