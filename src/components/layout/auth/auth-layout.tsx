import { ReactNode } from 'react';
import { AuthMainWrapper } from '@/components/layout/auth/auth-main-wrapper';
import { AuthHeader } from '@/components/layout/auth/auth-header';
import { Toaster } from '@/components/ui/toaster';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <AuthMainWrapper>{children}</AuthMainWrapper>
      <Toaster />
    </>
  );
};
