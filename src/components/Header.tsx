// components/Header.tsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher';
import Image from 'next/image';

export function Header() {
  return (
    <AppBar position="static"
    style={{
      backgroundColor: '#333',
      color: '#ffffff', // Text color on primary
    }} >
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 2, display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="Logo" width={200} height={40} />
        </Typography>
        <Box>
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}