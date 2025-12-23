import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { ShoppingItem } from '@/hooks/useShoppingList';

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const SWIPE_THRESHOLD = 80;
const DELETE_THRESHOLD = 150;

export function ShoppingItemCard({ item, onToggle, onDelete }: ShoppingItemCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
    const diff = startX.current - currentX.current;
    // Only allow swiping left (positive diff)
    if (diff > 0) {
      setOffsetX(Math.min(diff, DELETE_THRESHOLD + 20));
    } else {
      setOffsetX(0);
    }
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (offsetX >= DELETE_THRESHOLD) {
      // Trigger haptic feedback and delete with animation
      triggerHapticFeedback();
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(item.id);
      }, 200);
    } else if (offsetX >= SWIPE_THRESHOLD) {
      // Snap to show delete button
      setOffsetX(SWIPE_THRESHOLD);
    } else {
      // Reset position
      setOffsetX(0);
    }
  };

  const handleDeleteClick = () => {
    triggerHapticFeedback();
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(item.id);
    }, 200);
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg',
      isDeleting && 'animate-slide-out'
    )}>
      {/* Delete background */}
      <div 
        className={cn(
          'absolute inset-y-0 right-0 flex items-center justify-end bg-destructive transition-all',
          offsetX >= DELETE_THRESHOLD ? 'w-full' : 'w-20'
        )}
      >
        <div className={cn(
          'flex items-center gap-2 pr-4 text-destructive-foreground',
          offsetX >= DELETE_THRESHOLD && 'pr-6'
        )}>
          <Trash2 className="h-5 w-5" />
          {offsetX >= DELETE_THRESHOLD && (
            <span className="font-medium text-sm">Elimina</span>
          )}
        </div>
      </div>

      {/* Main card content */}
      <div
        className={cn(
          'relative flex items-center gap-3 p-4 bg-card border border-border',
          item.completed && 'bg-completed-bg border-transparent',
          !isDragging && 'transition-transform duration-200'
        )}
        style={{ transform: `translateX(-${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        
        {/* Desktop delete button */}
        <button
          onClick={handleDeleteClick}
          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 hidden sm:block"
          aria-label="Elimina elemento"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
