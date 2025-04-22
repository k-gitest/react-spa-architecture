import { MemoManager } from '@/features/memo/components/memo-manager';
import { MemoManagerTrpc } from '@/features/memo/components/memo-manager-trpc';
import { MemoManagerTanstack } from '@/features/memo/components/memo-manager-tanstack';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>トップページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="React,vite,shadcn/uiで構築されたspaのメモapp" />
      </Helmet>
      <MemoManager />
      <MemoManagerTrpc />
      <MemoManagerTanstack />
    </MainWrapper>
  );
};

export default Home;
