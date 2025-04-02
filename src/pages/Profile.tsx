import { UserProfile } from '@/components/user-profile';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>Profileページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザープロフィールのページです" />
      </Helmet>
      <UserProfile />
    </MainWrapper>
  );
};
export default Profile;
