import { ReactElement } from 'react';

export type TabProps = {
  name: string;
  content: ReactElement;
};

export const Tab = ({ content }: TabProps): ReactElement => content;
