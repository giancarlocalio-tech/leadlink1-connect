import { ShoppingCart } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        La tua lista è vuota
      </h2>
      <p className="text-muted-foreground">
        Aggiungi un prodotto per iniziare
      </p>
    </div>
  );
}
