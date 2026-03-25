import { render, screen } from '@testing-library/react';
import { useApp, AppProvider } from '../context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('AppContext', () => {
  it('throws error if used outside provider', () => {
    // Suppress error output for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => useApp()).toThrow();
    spy.mockRestore();
  });

  it('provides context value', () => {
    // Render children with AppProvider and check value shape
    const TestChild = () => {
      const ctx = useApp();
      expect(ctx).toHaveProperty('activePoll');
      expect(ctx).toHaveProperty('contestants');
      expect(ctx).toHaveProperty('retry');
      expect(ctx).toHaveProperty('addContestant');
      expect(ctx).toHaveProperty('generateCodes');
      expect(ctx).toHaveProperty('loading');
      expect(ctx).toHaveProperty('allPolls');
      return <div>ok</div>;
    };
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <TestChild />
        </AppProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByText('ok')).toBeInTheDocument();
  });
});
