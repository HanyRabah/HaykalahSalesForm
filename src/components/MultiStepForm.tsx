'use client';

import { useSectors } from '@/hooks/useSectors';
import { useServices } from '@/hooks/useServices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, CircularProgress, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { IndustrialSectorDropdown } from './IndustrialSectorDropdown';
import ServicesDropdown from './ServicesDropdown';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  locationUrl: string;
  industrialSector: string;
  industrialCity: string;
  services: string[];
  comments: string;
}

export default function SinglePageForm() {
  const t = useTranslations('common');
  const locale = useLocale();
  const { loading: sectorsLoading } = useSectors();
  const { loading: servicesLoading } = useServices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    address: '',
    locationUrl: '',
    industrialSector: '',
    industrialCity: 'Jeddah 3rd Industrial City',
    services: [],
    comments: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData(prev => ({ ...prev, locationUrl }));
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-form?type=submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t('submitFailed'));
      }

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        address: '',
        locationUrl: '',
        industrialSector: '',
        industrialCity: 'Jeddah 3rd Industrial City',
        services: [],
        comments: '',
      });
      
      alert(t('submitSuccess'));
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sectorsLoading || servicesLoading) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('formTitle')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label={t('fullName')}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label={t('phoneNumber')}
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label={t('companyName')}
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label={t('address')}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                fullWidth
              />
              <IconButton onClick={detectLocation} disabled={isSubmitting}>
                <LocationOnIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <IndustrialSectorDropdown
              value={formData.industrialSector}
              onChange={(value) => setFormData(prev => ({ ...prev, industrialSector: value }))}
              locale={locale}
            />
          </Grid>

          <Grid item xs={12}>
            <ServicesDropdown
              value={formData.services}
              onChange={(value) => setFormData(prev => ({ ...prev, services: value }))}
              locale={locale}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label={t('comments')}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              multiline
              rows={4}
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ minWidth: 150 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: 'common.white' }} />
            ) : (
              t('submit')
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}