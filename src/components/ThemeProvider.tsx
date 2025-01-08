// components/ThemeProvider.tsx
'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

import { ReactNode } from 'react';

// Create RTL and LTR caches
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
});

const getCustomTheme = (direction: 'rtl' | 'ltr', locale: string) => {
  const fontFamily = locale === 'ar' ? 'ArabicFont, sans-serif' : 'EnglishFont, sans-serif';

  return createTheme({
    direction,
    palette: {
      primary: {
        main: '#1976d2', // Change primary color
        light: '#42a5f5', // Light variant
        dark: '#1565c0', // Dark variant
        contrastText: '#ffffff', // Text color on primary
      },
      secondary: {
        main: '#9c27b0', // Change secondary color
        light: '#ba68c8', // Light variant
        dark: '#7b1fa2', // Dark variant
        contrastText: '#ffffff', // Text color on secondary
      },
      error: {
        main: '#d32f2f', // Error color
      },
      warning: {
        main: '#ed6c02', // Warning color
      },
      info: {
        main: '#0288d1', // Info color
      },
      success: {
        main: '#2e7d32', // Success color
      },
      background: {
        default: '#f5f5f5', // Default background color
        paper: '#ffffff', // Background color for paper components
      },
      text: {
        primary: '#212121', // Primary text color
        secondary: '#757575', // Secondary text color
      },
    },
    typography: {
      fontFamily, // Set font family based on locale
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      // Add more typography overrides as needed
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily, // Ensure body uses the custom font
          },
        },
      },
    },
  });
};

interface ThemeProviderProps {
  children: ReactNode;
  direction: 'rtl' | 'ltr';
  locale: string;
}

export function ThemeProvider({ children, direction, locale }: ThemeProviderProps) {
  const cache = direction === 'rtl' ? cacheRtl : cacheLtr;
  const customTheme = getCustomTheme(direction, locale);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={customTheme}>
        <div dir={direction}>{children}</div>
      </MuiThemeProvider>
    </CacheProvider>
  );
}