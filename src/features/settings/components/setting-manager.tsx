import { useState } from 'react';
import { AccountManager } from '@/features/account/components/account-manager-tanstack';
import { ProfileManager } from '@/features/profile/components/profile-manager';
import { AccountManager as AccountManagerTanstack } from '@/features/account/components/account-manager-tanstack';
import { ProfileManager as ProfileManagerTanstack } from '@/features/profile/components/profile-manager-tanstack';
import { ProfileManager as ProfileManagerTRPC } from '@/features/profile/components/profile-manager-trpc';
import { AccountManager as AccountManagerTRPC } from '@/features/account/components/account-manager-trpc';
import { Button } from '@/components/ui/button';

export const SettingManager = () => {
  const [display, setDisplay] = useState<string>('profile');

  const handleDisplay = (displayName: string) => {
    setDisplay(displayName);
  };

  return (
    <div className="w-full flex gap-4">
      <div className="flex flex-col gap-2">
        <Button variant="ghost" onClick={() => handleDisplay('profile')}>
          プロフィール
        </Button>
        <Button variant="ghost" onClick={() => handleDisplay('account')}>
          アカウント
        </Button>
      </div>
      <div className="w-full">
        {display === 'profile' && (
          <>
            <ProfileManager />
            <ProfileManagerTanstack />
            <ProfileManagerTRPC />
          </>
        )}
        {display === 'account' && (
          <>
            <AccountManager />
            <AccountManagerTanstack />
            <AccountManagerTRPC />
          </>
        )}
      </div>
    </div>
  );
};
