import { useServices } from '@/hooks/useServices';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

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
  value: string[];
  onChange: (value: string[]) => void;
  locale?: string;
}

function ServicesDropdown({ value, onChange, locale = 'en' }: ServicesDropdownProps) {
  const t = useTranslations('common');
  const { services, loading, error } = useServices();

  const handleServiceChange = (serviceName: string) => {
    const updatedValues = value.includes(serviceName)
      ? value.filter((val) => val !== serviceName)
      : [...value, serviceName];

    onChange(updatedValues);
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
                  height: '100%', // Make box take full height of grid item
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left', // Align text to left as per screenshot
                  cursor: 'pointer',
                  backgroundColor: value.includes(localizedService.name) ? '#e0f7fa' : '#fff',
                  color: value.includes(localizedService.name) ? '#00acc1' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => handleServiceChange(localizedService.name)}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {localizedService.name}
                </Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
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
                  sx={{ mt: 1, justifyContent: 'center' }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ServicesDropdown;