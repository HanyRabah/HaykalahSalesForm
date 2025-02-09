import { ApiService } from '@/services/api';
import { useEffect, useState } from 'react';

interface Location {
  en: string;
  ar: string;
}
export function useCities() {
    const [cities, setCities] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const apiService = ApiService.getInstance();
      
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await apiService.fetchWithCache<{ cities: Location[] }>(
            '/api/cities?type=cities',
            'cities'
          );

          setCities(response.cities);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch cities');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { cities, loading, error };
  }