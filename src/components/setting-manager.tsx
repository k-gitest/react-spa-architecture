import { useState } from 'react';
import { AccountManager } from '@/components/account-manager';
import { ProfileManager } from '@/components/profile-manager';
import { ProfileManager as ProfileManagerTRPC } from '@/components/profile-manager-trpc';
import { AccountManager as AccountManagerTRPC } from '@/components/account-manager-trpc';
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
            <ProfileManagerTRPC />
          </>
        )}
        {display === 'account' && (
          <>
            <AccountManager />
            <AccountManagerTRPC />
          </>
        )}
      </div>
    </div>
  );
};
