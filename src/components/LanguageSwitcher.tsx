'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();  

  const changeLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button 
        variant="text" 
        onClick={() => changeLanguage('en')}
        disabled={locale === 'en'}
        style={{ display: locale === 'en' ? 'none' : 'block', fontSize: '1.5rem' }}
        aria-label="Switch to English" 
        >
        🇬🇧
      </Button>
      <Button 
        variant="text" 
        onClick={() => changeLanguage('ar')}
        style={{ display: locale === 'ar' ? 'none' : 'block', fontSize: '1.5rem'  }}
        disabled={locale === 'ar'}
        aria-label="Switch to Arabic"   
        >
        🇸🇦
      </Button>
    </Stack>
  );
}