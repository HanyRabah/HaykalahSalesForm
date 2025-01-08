// components/AddressField.tsx
import { TextField, Button, Box } from '@mui/material';

interface AddressFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function AddressField({ value, onChange }: AddressFieldProps) {
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onChange(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        required
      />
      <Button variant="outlined" onClick={detectLocation}>
        Detect My Location
      </Button>
    </Box>
  );
}