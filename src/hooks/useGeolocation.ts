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
  // Grandi città
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
  // Nuove città aggiunte
  { slug: 'varese', lat: 45.8206, lng: 8.8257, radius: 0.15 },
  { slug: 'como', lat: 45.8081, lng: 9.0852, radius: 0.15 },
  { slug: 'lecco', lat: 45.8566, lng: 9.3976, radius: 0.1 },
  { slug: 'cremona', lat: 45.1333, lng: 10.0167, radius: 0.1 },
  { slug: 'mantova', lat: 45.1564, lng: 10.7913, radius: 0.1 },
  { slug: 'pavia', lat: 45.1847, lng: 9.1582, radius: 0.1 },
  { slug: 'lodi', lat: 45.3167, lng: 9.5000, radius: 0.1 },
  { slug: 'busto-arsizio', lat: 45.6119, lng: 8.8519, radius: 0.1 },
  { slug: 'legnano', lat: 45.5958, lng: 8.9142, radius: 0.1 },
  { slug: 'gallarate', lat: 45.6603, lng: 8.7919, radius: 0.1 },
  { slug: 'saronno', lat: 45.6231, lng: 9.0369, radius: 0.1 },
  { slug: 'seregno', lat: 45.6500, lng: 9.2000, radius: 0.1 },
  { slug: 'desio', lat: 45.6167, lng: 9.2167, radius: 0.1 },
  { slug: 'lissone', lat: 45.6167, lng: 9.2500, radius: 0.1 },
  { slug: 'cantu', lat: 45.7333, lng: 9.1333, radius: 0.1 },
  { slug: 'crema', lat: 45.3636, lng: 9.6856, radius: 0.1 },
  { slug: 'novara', lat: 45.4469, lng: 8.6220, radius: 0.15 },
  { slug: 'asti', lat: 44.9000, lng: 8.2067, radius: 0.1 },
  { slug: 'cuneo', lat: 44.3903, lng: 7.5469, radius: 0.1 },
  { slug: 'alessandria', lat: 44.9117, lng: 8.6153, radius: 0.15 },
  { slug: 'moncalieri', lat: 44.9978, lng: 7.6825, radius: 0.1 },
  { slug: 'rivoli', lat: 45.0714, lng: 7.5147, radius: 0.1 },
  { slug: 'piacenza', lat: 45.0522, lng: 9.6928, radius: 0.15 },
  { slug: 'reggio-emilia', lat: 44.6983, lng: 10.6312, radius: 0.15 },
  { slug: 'ravenna', lat: 44.4175, lng: 12.2014, radius: 0.15 },
  { slug: 'forli', lat: 44.2225, lng: 12.0408, radius: 0.15 },
  { slug: 'cesena', lat: 44.1397, lng: 12.2431, radius: 0.1 },
  { slug: 'prato', lat: 43.8777, lng: 11.1024, radius: 0.15 },
  { slug: 'lucca', lat: 43.8430, lng: 10.5067, radius: 0.1 },
  { slug: 'pistoia', lat: 43.9308, lng: 10.9072, radius: 0.1 },
  { slug: 'arezzo', lat: 43.4623, lng: 11.8819, radius: 0.1 },
  { slug: 'grosseto', lat: 42.7603, lng: 11.1128, radius: 0.1 },
  { slug: 'massa', lat: 44.0353, lng: 10.1397, radius: 0.1 },
  { slug: 'carrara', lat: 44.0794, lng: 10.0967, radius: 0.1 },
  { slug: 'viareggio', lat: 43.8667, lng: 10.2333, radius: 0.1 },
  { slug: 'empoli', lat: 43.7189, lng: 10.9500, radius: 0.1 },
  { slug: 'scandicci', lat: 43.7556, lng: 11.1861, radius: 0.1 },
  { slug: 'rovigo', lat: 45.0702, lng: 11.7897, radius: 0.1 },
  { slug: 'belluno', lat: 46.1403, lng: 12.2169, radius: 0.1 },
  { slug: 'bassano-del-grappa', lat: 45.7656, lng: 11.7264, radius: 0.1 },
  { slug: 'schio', lat: 45.7125, lng: 11.3569, radius: 0.1 },
  { slug: 'conegliano', lat: 45.8833, lng: 12.3000, radius: 0.1 },
  { slug: 'chioggia', lat: 45.2189, lng: 12.2794, radius: 0.1 },
  { slug: 'foggia', lat: 41.4622, lng: 15.5447, radius: 0.15 },
  { slug: 'brindisi', lat: 40.6328, lng: 17.9419, radius: 0.15 },
  { slug: 'andria', lat: 41.2314, lng: 16.2939, radius: 0.1 },
  { slug: 'trani', lat: 41.2761, lng: 16.4167, radius: 0.1 },
  { slug: 'altamura', lat: 40.8256, lng: 16.5528, radius: 0.1 },
  { slug: 'molfetta', lat: 41.2000, lng: 16.5972, radius: 0.1 },
  { slug: 'cerignola', lat: 41.2639, lng: 15.8958, radius: 0.1 },
  { slug: 'martina-franca', lat: 40.7050, lng: 17.3392, radius: 0.1 },
  { slug: 'caserta', lat: 41.0753, lng: 14.3337, radius: 0.15 },
  { slug: 'benevento', lat: 41.1297, lng: 14.7822, radius: 0.1 },
  { slug: 'avellino', lat: 40.9139, lng: 14.7908, radius: 0.1 },
  { slug: 'battipaglia', lat: 40.6083, lng: 14.9833, radius: 0.1 },
  { slug: 'cava-de-tirreni', lat: 40.6981, lng: 14.7072, radius: 0.1 },
  { slug: 'aversa', lat: 40.9722, lng: 14.2067, radius: 0.1 },
  { slug: 'torre-del-greco', lat: 40.7878, lng: 14.3669, radius: 0.1 },
  { slug: 'siracusa', lat: 37.0755, lng: 15.2866, radius: 0.15 },
  { slug: 'ragusa', lat: 36.9267, lng: 14.7281, radius: 0.1 },
  { slug: 'trapani', lat: 38.0176, lng: 12.5144, radius: 0.1 },
  { slug: 'agrigento', lat: 37.3111, lng: 13.5767, radius: 0.1 },
  { slug: 'caltanissetta', lat: 37.4900, lng: 14.0628, radius: 0.1 },
  { slug: 'enna', lat: 37.5667, lng: 14.2750, radius: 0.1 },
  { slug: 'marsala', lat: 37.7978, lng: 12.4378, radius: 0.1 },
  { slug: 'vittoria', lat: 36.9531, lng: 14.5364, radius: 0.1 },
  { slug: 'modica', lat: 36.8467, lng: 14.7683, radius: 0.1 },
  { slug: 'acireale', lat: 37.6125, lng: 15.1653, radius: 0.1 },
  { slug: 'milazzo', lat: 38.2233, lng: 15.2403, radius: 0.1 },
  { slug: 'nuoro', lat: 40.3219, lng: 9.3311, radius: 0.1 },
  { slug: 'oristano', lat: 39.9033, lng: 8.5900, radius: 0.1 },
  { slug: 'olbia', lat: 40.9231, lng: 9.4969, radius: 0.1 },
  { slug: 'quartu-sant-elena', lat: 39.2389, lng: 9.1878, radius: 0.1 },
  { slug: 'alghero', lat: 40.5581, lng: 8.3197, radius: 0.1 },
  { slug: 'cosenza', lat: 39.3000, lng: 16.2500, radius: 0.15 },
  { slug: 'crotone', lat: 39.0808, lng: 17.1275, radius: 0.1 },
  { slug: 'vibo-valentia', lat: 38.6758, lng: 16.1003, radius: 0.1 },
  { slug: 'lamezia-terme', lat: 38.9683, lng: 16.3106, radius: 0.1 },
  { slug: 'rende', lat: 39.3333, lng: 16.1833, radius: 0.1 },
  { slug: 'la-spezia', lat: 44.1025, lng: 9.8244, radius: 0.15 },
  { slug: 'savona', lat: 44.3092, lng: 8.4772, radius: 0.1 },
  { slug: 'imperia', lat: 43.8894, lng: 8.0278, radius: 0.1 },
  { slug: 'macerata', lat: 43.2989, lng: 13.4533, radius: 0.1 },
  { slug: 'fermo', lat: 43.1606, lng: 13.7194, radius: 0.1 },
  { slug: 'ascoli-piceno', lat: 42.8533, lng: 13.5750, radius: 0.1 },
  { slug: 'civitanova-marche', lat: 43.3083, lng: 13.7258, radius: 0.1 },
  { slug: 'san-benedetto-del-tronto', lat: 42.9500, lng: 13.8833, radius: 0.1 },
  { slug: 'senigallia', lat: 43.7192, lng: 13.2181, radius: 0.1 },
  { slug: 'l-aquila', lat: 42.3508, lng: 13.3997, radius: 0.15 },
  { slug: 'teramo', lat: 42.6592, lng: 13.7039, radius: 0.1 },
  { slug: 'chieti', lat: 42.3508, lng: 14.1678, radius: 0.1 },
  { slug: 'montesilvano', lat: 42.5083, lng: 14.1500, radius: 0.1 },
  { slug: 'vasto', lat: 42.1106, lng: 14.7078, radius: 0.1 },
  { slug: 'lanciano', lat: 42.2311, lng: 14.3900, radius: 0.1 },
  { slug: 'terni', lat: 42.5636, lng: 12.6475, radius: 0.15 },
  { slug: 'foligno', lat: 42.9500, lng: 12.7167, radius: 0.1 },
  { slug: 'spoleto', lat: 42.7333, lng: 12.7333, radius: 0.1 },
  { slug: 'isernia', lat: 41.5958, lng: 14.2306, radius: 0.1 },
  { slug: 'termoli', lat: 41.9872, lng: 14.9939, radius: 0.1 },
  { slug: 'merano', lat: 46.6686, lng: 11.1594, radius: 0.1 },
  { slug: 'rovereto', lat: 45.8892, lng: 11.0431, radius: 0.1 },
  { slug: 'bressanone', lat: 46.7147, lng: 11.6567, radius: 0.1 },
  { slug: 'guidonia', lat: 41.9942, lng: 12.7231, radius: 0.1 },
  { slug: 'tivoli', lat: 41.9633, lng: 12.7983, radius: 0.1 },
  { slug: 'civitavecchia', lat: 42.0933, lng: 11.7958, radius: 0.1 },
  { slug: 'velletri', lat: 41.6881, lng: 12.7778, radius: 0.1 },
  { slug: 'pomezia', lat: 41.6697, lng: 12.5008, radius: 0.1 },
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
