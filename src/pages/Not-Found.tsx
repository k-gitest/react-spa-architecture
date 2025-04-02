import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>404 ページが見つかりません: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="404 page not found" />
      </Helmet>
      <h1 className="text-center">Page Not Found 404.</h1>
    </MainWrapper>
  );
};

export default NotFound;
