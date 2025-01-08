// components/Footer.tsx
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('common');
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 2, mt: 4 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} {t('allRightsReserved')}
      </Typography>
    </Box>
  );
}