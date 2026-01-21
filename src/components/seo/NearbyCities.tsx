import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { CityData, ServiceData } from '@/lib/seoData';

interface NearbyCitiesProps {
  cityData: CityData;
  serviceData?: ServiceData;
}

export function NearbyCities({ cityData, serviceData }: NearbyCitiesProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        {cityData.name} {serviceData?.shortName || 'Idraulico'} per Città
      </h3>
      
      <div className="space-y-2">
        {cityData.nearbyAreas.slice(0, 6).map((area) => (
          <Link
            key={area}
            to={serviceData ? `/${area.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}-${serviceData.slug}` : `/${area.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
            className="block text-primary hover:underline text-sm"
          >
            {area}
          </Link>
        ))}
      </div>
    </div>
  );
}
