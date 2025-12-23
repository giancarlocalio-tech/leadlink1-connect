import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

export function CityAutocomplete({
  value,
  onChange,
  placeholder = "Cerca città o CAP...",
  className = "",
  autoFocus = false,
}: CityAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<ItalianCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync input value with external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Search cities when input changes
  useEffect(() => {
    const searchCities = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Check if input looks like a CAP (5 digits)
        const isCAP = /^\d{2,5}$/.test(inputValue);

        let query = supabase
          .from('italian_cities')
          .select('*')
          .limit(10);

        if (isCAP) {
          // Search by CAP
          query = query.contains('cap', [inputValue]);
        } else {
          // Search by city name (case insensitive)
          query = query.ilike('name', `${inputValue}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error searching cities:', error);
          setSuggestions([]);
        } else {
          setSuggestions(data || []);
        }
      } catch (err) {
        console.error('Error in city search:', err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 200);
    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    onChange(null, newValue);
  };

  const handleSelectCity = (city: ItalianCity) => {
    const displayValue = `${city.name} (${city.province_code})`;
    setInputValue(displayValue);
    setSuggestions([]);
    setShowSuggestions(false);
    onChange(city, displayValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectCity(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10"
          autoFocus={autoFocus}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <ScrollArea className="max-h-[200px]">
            <div className="p-1">
              {suggestions.map((city, index) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-start gap-3 p-3 rounded-md text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {city.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {city.province_name} ({city.province_code}) • {city.region}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {showSuggestions && inputValue.length >= 2 && !isLoading && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground">
          Nessuna città trovata per "{inputValue}"
        </div>
      )}
    </div>
  );
}
