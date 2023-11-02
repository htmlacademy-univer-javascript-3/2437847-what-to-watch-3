import { ReactNode } from 'react';

export type TabProps = {
  name: string;
  children: ReactNode;
};

export const Tab = ({ children }: TabProps) => children;
