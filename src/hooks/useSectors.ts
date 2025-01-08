import { ApiService } from '@/services/api';
import { useState, useEffect } from 'react';

interface Location {
  en: string;
  ar: string;
}

export function useSectors() {
  const [sectors, setSectors] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiService = ApiService.getInstance();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.fetchWithCache<{ sectors: Location[] }>(
          '/api/sectors?type=sectors',
          'sectors'
        );

        setSectors(response.sectors);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sectors');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { sectors, loading, error };
}
