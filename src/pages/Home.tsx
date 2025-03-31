//import MemoManager from '@/components/memo-manager'
import MemoManagerTrpc from '@/components/memo-manager-trpc';
import MemoManager from '@/components/memo-manager-tanstack';
import MainWrapper from '@/components/layout/main-wrapper';

const Home = () => {
  return (
    <MainWrapper>
      <MemoManagerTrpc />
      <MemoManager />
    </MainWrapper>
  );
};

export default Home;
