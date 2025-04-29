import { MemoManager } from '@/features/memo/components/memo-manager';
import { MemoManagerTrpc } from '@/features/memo/components/memo-manager-trpc';
import { MemoManagerTanstack } from '@/features/memo/components/memo-manager-tanstack';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>ダッシュボード: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="React,vite,shadcn/uiで構築されたspaのメモapp" />
      </Helmet>
      <MemoManager />
      <MemoManagerTanstack />
      <MemoManagerTrpc />
    </>
  );
};

export default Dashboard;
