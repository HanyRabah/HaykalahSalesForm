import { useTranslations } from 'next-intl';
import { Autocomplete, TextField } from '@mui/material';
import { useSectors } from '@/hooks/useSectors';

interface IndustrialSectorDropdownProps {
  value: string;
  onChange: (value: string) => void;
  locale?: string;
}

export function IndustrialSectorDropdown({ 
  value, 
  onChange,
  locale = 'en'
}: IndustrialSectorDropdownProps) {
  const t = useTranslations('common');
  const { sectors, loading, error } = useSectors();

  const getCurrentValue = () => {
    if (!value) return '';
    const sectorObject = sectors.find(sector => 
      sector.en === value || sector.ar === value
    );
    return sectorObject ? sectorObject[locale as 'en' | 'ar'] : value;
  };

  return (
    <Autocomplete
      value={getCurrentValue()}
      onChange={(_, newValue) => {
        onChange(newValue || '');
      }}
      options={sectors.map(sector => sector[locale as 'en' | 'ar'])}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('industrialSector')}
          placeholder={t('selectIndustrialSector')}
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