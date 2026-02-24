import React, { Suspense } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import { MainWrapper } from './AppLayout.styles';

const CustomImageCursor = React.lazy(() => import('../ui/CustomImageCursor'));

interface AppLayoutProps {
  children: ReactNode;
  isPlaying: boolean;
}

export default function AppLayout({ children, isPlaying }: AppLayoutProps) {
  return (
    <>
      <Suspense fallback={null}>
        {!isPlaying && <CustomImageCursor />}
      </Suspense>

      <Header />
      <MainWrapper>
        {/* Note: SmoothScroll wrap logic moved to App.tsx where it's correctly wrapping everything */}
        {children}
      </MainWrapper>
    </>
  );
}
