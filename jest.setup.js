/// <reference types="@testing-library/jest-dom" />
require('@testing-library/jest-dom');
// Mock Supabase client to prevent env errors in tests
jest.mock('./utils/supabase/client', () => {
  // Chainable .on().on().subscribe() mock
  const subscribeMock = () => ({});
  const onMock = () => ({ on: onMock, subscribe: subscribeMock });
  // Chainable .from().select().limit()
  const selectMock = () => ({
    limit: () => ({ data: [], error: { message: 'fail' } }),
  });
  return {
    supabase: {
      from: () => ({
        select: selectMock,
        insert: () => ({ data: [], error: null }),
        update: () => ({ data: [], error: null }),
        eq: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        single: () => ({ data: {}, error: null }),
      }),
      channel: () => ({ on: onMock }),
      removeChannel: () => {},
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        onAuthStateChange: jest.fn(),
      },
      storage: {
        from: () => ({
          upload: jest.fn(),
          getPublicUrl: () => ({ data: { publicUrl: 'mock-url' } }),
        }),
      },
      rpc: jest.fn(),
    },
  };
});
