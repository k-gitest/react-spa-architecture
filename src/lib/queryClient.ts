import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  /* グローバルエラー設定
  defaultOptions: {
    queries: {},
    mutations: {
      onSuccess: () => {},
      onError: (error) => {
        //console.error('グローバルエラー:', error);
      },
    },
  },
  */
});

export { queryClient, QueryClientProvider };
