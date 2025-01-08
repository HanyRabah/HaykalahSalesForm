import { useTranslations } from 'next-intl';
import { Autocomplete, TextField } from '@mui/material';
import { useCities } from '@/hooks/useCities';

interface IndustrialCityDropdownProps {
  value: string;
  onChange: (value: string) => void;
  locale?: string;
}

export function IndustrialCityDropdown({ 
  value, 
  onChange,
  locale = 'en'
}: IndustrialCityDropdownProps) {
  const t = useTranslations('common');
  const { cities, loading, error } = useCities();

  const getCurrentValue = () => {
    if (!value) return '';
    const cityObject = cities.find(city => 
      city.en === value || city.ar === value
    );
    return cityObject ? cityObject[locale as 'en' | 'ar'] : value;
  };

  return (
    <Autocomplete
      value={getCurrentValue()}
      onChange={(_, newValue) => {
        onChange(newValue || '');
      }}
      options={cities.map(city => city[locale as 'en' | 'ar'])}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('industrialCity')}
          placeholder={t('selectIndustrialCity')}
          error={!!error}
          helperText={error}
        />
      )}
      loading={loading}
      freeSolo
      fullWidth
    />
  );
}