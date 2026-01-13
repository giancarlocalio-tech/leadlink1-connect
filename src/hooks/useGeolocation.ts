import { useState, useEffect, useCallback } from 'react';
import { CITIES, CityData } from '@/lib/seoData';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  cityData: CityData | null;
  cityName: string | null;
  coordinates: { lat: number; lng: number } | null;
}

// Map of major Italian cities with approximate coordinates
const CITY_COORDINATES: { slug: string; lat: number; lng: number; radius: number }[] = [
  { slug: 'milano', lat: 45.4642, lng: 9.1900, radius: 0.3 },
  { slug: 'roma', lat: 41.9028, lng: 12.4964, radius: 0.4 },
  { slug: 'napoli', lat: 40.8518, lng: 14.2681, radius: 0.3 },
  { slug: 'torino', lat: 45.0703, lng: 7.6869, radius: 0.3 },
  { slug: 'palermo', lat: 38.1157, lng: 13.3615, radius: 0.25 },
  { slug: 'genova', lat: 44.4056, lng: 8.9463, radius: 0.25 },
  { slug: 'bologna', lat: 44.4949, lng: 11.3426, radius: 0.2 },
  { slug: 'firenze', lat: 43.7696, lng: 11.2558, radius: 0.2 },
  { slug: 'bari', lat: 41.1171, lng: 16.8719, radius: 0.2 },
  { slug: 'catania', lat: 37.5079, lng: 15.0830, radius: 0.2 },
  { slug: 'venezia', lat: 45.4408, lng: 12.3155, radius: 0.2 },
  { slug: 'verona', lat: 45.4384, lng: 10.9916, radius: 0.2 },
  { slug: 'messina', lat: 38.1938, lng: 15.5540, radius: 0.15 },
  { slug: 'padova', lat: 45.4064, lng: 11.8768, radius: 0.15 },
  { slug: 'trieste', lat: 45.6495, lng: 13.7768, radius: 0.15 },
  { slug: 'brescia', lat: 45.5416, lng: 10.2118, radius: 0.15 },
  { slug: 'parma', lat: 44.8015, lng: 10.3279, radius: 0.15 },
  { slug: 'modena', lat: 44.6471, lng: 10.9252, radius: 0.15 },
  { slug: 'reggio-calabria', lat: 38.1112, lng: 15.6467, radius: 0.15 },
  { slug: 'pisa', lat: 43.7228, lng: 10.4017, radius: 0.15 },
  { slug: 'livorno', lat: 43.5485, lng: 10.3106, radius: 0.15 },
  { slug: 'cagliari', lat: 39.2238, lng: 9.1217, radius: 0.2 },
  { slug: 'sassari', lat: 40.7259, lng: 8.5556, radius: 0.15 },
  { slug: 'salerno', lat: 40.6824, lng: 14.7681, radius: 0.15 },
  { slug: 'bergamo', lat: 45.6983, lng: 9.6773, radius: 0.15 },
  { slug: 'monza', lat: 45.5845, lng: 9.2744, radius: 0.1 },
  { slug: 'rimini', lat: 44.0678, lng: 12.5695, radius: 0.15 },
  { slug: 'ferrara', lat: 44.8381, lng: 11.6198, radius: 0.15 },
  { slug: 'siena', lat: 43.3188, lng: 11.3308, radius: 0.1 },
  { slug: 'vicenza', lat: 45.5455, lng: 11.5354, radius: 0.15 },
  { slug: 'treviso', lat: 45.6669, lng: 12.2430, radius: 0.15 },
  { slug: 'taranto', lat: 40.4644, lng: 17.2470, radius: 0.15 },
  { slug: 'lecce', lat: 40.3516, lng: 18.1718, radius: 0.15 },
  { slug: 'udine', lat: 46.0711, lng: 13.2346, radius: 0.15 },
  { slug: 'catanzaro', lat: 38.9098, lng: 16.5877, radius: 0.15 },
  { slug: 'ancona', lat: 43.6158, lng: 13.5189, radius: 0.15 },
  { slug: 'pesaro', lat: 43.9098, lng: 12.9131, radius: 0.1 },
  { slug: 'pescara', lat: 42.4618, lng: 14.2161, radius: 0.15 },
  { slug: 'perugia', lat: 43.1107, lng: 12.3908, radius: 0.15 },
  { slug: 'trento', lat: 46.0748, lng: 11.1217, radius: 0.15 },
  { slug: 'bolzano', lat: 46.4983, lng: 11.3548, radius: 0.15 },
  { slug: 'potenza', lat: 40.6404, lng: 15.8056, radius: 0.1 },
  { slug: 'matera', lat: 40.6664, lng: 16.6043, radius: 0.1 },
  { slug: 'campobasso', lat: 41.5603, lng: 14.6626, radius: 0.1 },
  { slug: 'aosta', lat: 45.7370, lng: 7.3152, radius: 0.1 },
];

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  // Simple Euclidean distance for nearby cities (good enough for Italy)
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

function findNearestCity(lat: number, lng: number): CityData | null {
  let nearestCity: CityData | null = null;
  let minDistance = Infinity;

  for (const cityCoord of CITY_COORDINATES) {
    const distance = calculateDistance(lat, lng, cityCoord.lat, cityCoord.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = CITIES.find(c => c.slug === cityCoord.slug) || null;
    }
  }

  // If distance is too far (> 1 degree ~ 100km), return null
  if (minDistance > 1) {
    return null;
  }

  return nearestCity;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    cityData: null,
    cityName: null,
    coordinates: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocalizzazione non supportata dal browser',
        loading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestCity = findNearestCity(latitude, longitude);

        setState({
          loading: false,
          error: null,
          coordinates: { lat: latitude, lng: longitude },
          cityData: nearestCity,
          cityName: nearestCity?.name || null,
        });
      },
      (error) => {
        let errorMessage = 'Errore nella geolocalizzazione';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permesso di geolocalizzazione negato';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Posizione non disponibile';
            break;
          case error.TIMEOUT:
            errorMessage = 'Timeout nella richiesta di posizione';
            break;
        }
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  }, []);

  return {
    ...state,
    requestLocation,
  };
}
