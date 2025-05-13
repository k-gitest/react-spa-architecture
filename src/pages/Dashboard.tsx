import { MemoManager } from '@/features/memo/components/memo-manager';
import { MemoManagerTrpc } from '@/features/memo/components/memo-manager-trpc';
import { MemoManagerTanstack } from '@/features/memo/components/memo-manager-tanstack';
import { Helmet } from 'react-helmet-async';
import { withBehaviorVariant } from '@/components/withBehaviorVariant';

const MemoComponents = withBehaviorVariant({
  default: MemoManager,
  tanstack: MemoManagerTanstack,
  trpc: MemoManagerTrpc,
});

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>ダッシュボード: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="React,vite,shadcn/uiで構築されたspaのメモapp" />
      </Helmet>
      <MemoComponents />
    </>
  );
};

export default Dashboard;
