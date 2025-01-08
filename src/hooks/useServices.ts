import { ApiService } from '@/services/api';
import { useState, useEffect } from 'react';

interface Service {
  en: {
    name: string;
    description: string;
  };
  ar: {
    name: string;
    description: string;
  };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiService = ApiService.getInstance();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.fetchWithCache<{ services: Service[] }>(
          '/api/services?type=services',
          'services' // Ensure this cacheKey is unique
        );

        setServices(response.services);
        setError(null);

        apiService.inspectCache();
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, loading, error };
}