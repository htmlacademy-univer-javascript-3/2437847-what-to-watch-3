import { BallTriangle } from 'react-loader-spinner';
import { ReactNode } from 'react';
import { LoaderStyle } from './LoaderStyle.ts';

type LoaderProps = {
  isLoading: boolean;
  height?: string;
  backgroundColor?: string;
  children: ReactNode;
};
export const Loader = ({
  isLoading,
  height,
  backgroundColor,
  children,
}: LoaderProps) => {
  const loader = (
    <div
      style={{
        height: height,
        backgroundColor: backgroundColor,
        ...LoaderStyle,
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#eee5b5"
        ariaLabel="ball-triangle-loading"
        visible
      />
    </div>
  );
  return <> {isLoading ? loader : children} </>;
};
