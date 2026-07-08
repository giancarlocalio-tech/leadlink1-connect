import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

// Stubbed after pivot: italian_cities table removed. Kept as free-text input
// so legacy blog/city forms keep compiling. Emits the raw string as displayValue.

export interface ItalianCity {
  id: string;
  name: string;
  province_code: string;
  province_name: string;
  region: string;
  cap: string[];
}

interface CityAutocompleteProps {
  value: string;
  onChange: (city: ItalianCity | null, displayValue: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const CityAutocomplete = forwardRef<HTMLDivElement, CityAutocompleteProps>(({
  value,
  onChange,
  placeholder = "Città",
  className = "",
  autoFocus = false,
}, ref) => {
  return (
    <div ref={ref} className={`relative ${className}`}>
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(null, e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="pl-9"
      />
    </div>
  );
});

CityAutocomplete.displayName = 'CityAutocomplete';
