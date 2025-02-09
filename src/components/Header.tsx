// components/Header.tsx
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('common');
  return (
    <AppBar position="static"
    style={{
      backgroundColor: '#000',
      color: '#ffffff', // Text color on primary
    }} >
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 2, display: 'flex', alignItems: 'center' }}>
          <Image src="/mark-logo.svg" alt="Logo" width={200} height={40} />
               <Typography variant="subtitle2" component="div" sx={{ padding: 2 }}>
          {t('tagLine')}</Typography>
        </Typography>
   
        <Box>
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}