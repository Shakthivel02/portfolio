import React, { Suspense } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';
import Header from './Header';
import { MainWrapper } from './AppLayout.styles';

const CustomImageCursor = React.lazy(() => import('../ui/CustomImageCursor'));

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />

      <Suspense fallback={null}>
        <CustomImageCursor />
      </Suspense>

      <Header />
      <MainWrapper>
        {/* Note: SmoothScroll wrap logic moved to App.tsx where it's correctly wrapping everything */}
        {children}
      </MainWrapper>
    </ThemeProvider>
  );
}
