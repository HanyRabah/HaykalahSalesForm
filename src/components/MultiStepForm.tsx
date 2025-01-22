'use client'; // Mark as a Client Component

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, IconButton, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { IndustrialSectorDropdown } from './IndustrialSectorDropdown';
import ServicesDropdown from './ServicesDropdown';
import { IndustrialCityDropdown } from './industrialCityDropdown';

// Define the form data interface
interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  locationUrl: string; // New field for Google Maps URL
  industrialSector: string;
  industrialCity: string;
  services: string[];
  comments: string;
}

// Define steps for the form
const steps = ['personalInfo', 'companyInfo', 'additionalInfo'];

export default function MultiStepForm() {
  const t = useTranslations('common');
  const locale = useLocale();  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    address: '',
    locationUrl: '', // Initialize location URL
    industrialSector: '',
    industrialCity: '',
    services: [],
    comments: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData({ ...formData, locationUrl });
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-form?type=submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true); // Show success message
      } else {
        alert(t('submitFailed'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('submitError'));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false); // Hide success message
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      address: '',
      locationUrl: '',
      industrialSector: '',
      industrialCity: '',
      services: [],
      comments: '',
    });
    setActiveStep(0); // Reset to the first step
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('fullName')}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label={t('phoneNumber')}
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('companyName')}
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={t('address')}
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
              <IconButton onClick={detectLocation}>
                <LocationOnIcon />
              </IconButton>
            </Box>
            <IndustrialSectorDropdown
              value={formData.industrialSector}
              onChange={(value) =>
                setFormData({ ...formData, industrialSector: value })
              }
              locale={locale}
            />
            <IndustrialCityDropdown
              value={formData.industrialCity}
              onChange={(value) =>
                setFormData({ ...formData, industrialCity: value })
              }
              locale={locale}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ServicesDropdown
              value={formData.services}
              onChange={(value) =>
                setFormData({ ...formData, services: value })
              }
            />
            <TextField
              label={t('comments')}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      {isSubmitted ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('submitSuccess')}
          </Typography>
          <Button variant="contained" onClick={resetForm}>
            {t('startAgain')}
          </Button>
        </Box>
      ) : (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{t(label)}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>
            </motion.div>
          </AnimatePresence>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              {t('back')}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit}>
                {t('submit')}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                {t('next')}
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}