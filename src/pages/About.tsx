import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>Aboutページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="このメモアプリはReactとViteとshadcn/uiで開発されています" />
      </Helmet>
      <div className="w-full text-center">
        <h2 className="text-2xl mb-4">About</h2>
        <p>このアプリはreactとviteとshadcn/uiで開発されています</p>
        <p>react-hook-formとzodとshadcn/uiのフォームコンポーネントを使用したメモアプリです。</p>
      </div>
    </MainWrapper>
  );
};

export default About;