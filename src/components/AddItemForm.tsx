import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddItemFormProps {
  onAdd: (name: string) => void;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
      // Keep focus on input for rapid entry
      inputRef.current?.focus();
    }
  };

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Aggiungi un prodotto…"
        className="flex-1 h-12 text-base bg-card border-border focus-visible:ring-primary"
      />
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 shrink-0 bg-primary hover:bg-primary/90"
        disabled={!value.trim()}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </form>
  );
}
