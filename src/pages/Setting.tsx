import { SettingManager } from '@/components/setting-manager';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const Setting = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>Settingページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザー設定のページです" />
      </Helmet>
      <SettingManager />
    </MainWrapper>
  );
};
export default Setting;
