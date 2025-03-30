//import MemoManager from '@/components/memo-manager'
import MemoManagerTrpc from '@/components/memo-manager-trpc';
import MemoManager from '@/components/memo-controller'

const Home = () => {
  return (
    <main className="w-full p-4">
      <MemoManagerTrpc />
      <MemoManager />
    </main>
  );
};

export default Home;
