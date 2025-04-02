import { ReactNode } from 'react';

export const MainWrapper = ({ children }: { children?: ReactNode }) => {
  return <main className="w-full p-4">{children}</main>;
};
