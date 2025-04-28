import { Helmet } from 'react-helmet-async';
import { ContentHome } from '@/components/content-home';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>トップページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="React,vite,shadcn/uiで構築されたspaのメモapp" />
      </Helmet>
      <ContentHome />
    </>
  );
};

export default Home;
