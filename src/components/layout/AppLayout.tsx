import type { ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import SmoothScroll from './SmoothScroll';
import { theme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';
import CustomImageCursor from '../ui/CustomImageCursor';

const MainWrapper = styled.main`
  position: relative;
  width: 100%;
  z-index: 10;
  cursor: none;
`;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <CustomImageCursor />
      <MainWrapper>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </MainWrapper>
    </ThemeProvider>
  );
}
