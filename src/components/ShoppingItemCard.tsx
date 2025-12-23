import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { ShoppingItem } from '@/hooks/useShoppingList';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShoppingItemCard({ item, onToggle, onDelete }: ShoppingItemCardProps) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-4 rounded-lg bg-card border border-border transition-all duration-200',
        item.completed && 'bg-completed-bg border-transparent'
      )}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="h-6 w-6 rounded-full border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      
      <span
        className={cn(
          'flex-1 text-lg font-medium transition-all duration-200',
          item.completed && 'line-through text-completed'
        )}
      >
        {item.name}
      </span>
      
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Elimina elemento"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
