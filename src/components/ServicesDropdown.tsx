import { useServices } from '@/hooks/useServices';
import { useTranslations } from 'next-intl';
import { Box, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';

type Service = {
  en: {
    name: string;
    description: string;
  };
  ar: {
    name: string;
    description: string;
  };
};

interface ServicesDropdownProps {
  value: string[]; // Array of selected service names
  onChange: (value: string[]) => void; // Callback to update selected services
  locale?: string;
}

export function ServicesDropdown({ value, onChange, locale = 'en' }: ServicesDropdownProps) {
  const t = useTranslations('common');
  const { services, loading, error } = useServices();

  // Handle service selection
  const handleServiceChange = (serviceName: string) => {
    const updatedValues = value.includes(serviceName)
      ? value.filter((val) => val !== serviceName) // Deselect
      : [...value, serviceName]; // Select

    onChange(updatedValues); // Update the parent component
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('services')}
      </Typography>

      {loading && <Typography>Loading services...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {services.map((service: Service) => {
          const localizedService = service[locale as 'en' | 'ar'];
          return (
            <Grid item xs={12} sm={6} md={4} key={localizedService.name}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: value.includes(localizedService.name) ? '#e0f7fa' : '#fff',
                  color: value.includes(localizedService.name) ? '#00acc1' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => handleServiceChange(localizedService.name)}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {localizedService.name}
                </Typography>
                <Typography variant="body2" >
                  {localizedService.description}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.includes(localizedService.name)}
                      onChange={() => handleServiceChange(localizedService.name)}
                      color="primary"
                      sx={{ display: 'none' }} 
                    />
                  }
                  label=""
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}