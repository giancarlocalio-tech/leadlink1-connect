import { useState } from 'react';
import { useShoppingList } from '@/hooks/useShoppingList';
import { AddItemForm } from '@/components/AddItemForm';
import { ShoppingItemCard } from '@/components/ShoppingItemCard';
import { EmptyState } from '@/components/EmptyState';
import { AdBanner } from '@/components/AdBanner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Index = () => {
  const {
    items,
    addItem,
    toggleItem,
    deleteItem,
    clearCompleted,
    clearAll,
    hasCompletedItems,
    hasItems,
  } = useShoppingList();

  const [clearCompletedOpen, setClearCompletedOpen] = useState(false);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const handleClearCompleted = () => {
    clearCompleted();
    setClearCompletedOpen(false);
  };

  const handleClearAll = () => {
    clearAll();
    setClearAllOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
        <div className="container max-w-lg py-4">
          <h1 className="text-2xl font-bold text-foreground">
            Lista Spesa Veloce
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Scrivi, spunta e vai a fare la spesa
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-lg py-4 pb-24">
        {/* Add item form */}
        <div className="sticky top-[88px] z-10 bg-background pb-4">
          <AddItemForm onAdd={addItem} />
        </div>

        {/* Shopping list */}
        {hasItems ? (
          <div className="space-y-2">
            {items.map((item) => (
              <ShoppingItemCard
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={deleteItem}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {/* Action buttons */}
        {hasItems && (
          <div className="flex flex-col gap-2 mt-6">
            {hasCompletedItems && (
              <Button
                variant="secondary"
                onClick={() => setClearCompletedOpen(true)}
                className="w-full"
              >
                Cancella elementi completati
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setClearAllOpen(true)}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Svuota lista
            </Button>
          </div>
        )}
      </main>

      {/* Ad Banner - fixed at bottom */}
      <AdBanner className="fixed bottom-0 left-0 right-0 p-2 bg-background/95 backdrop-blur-sm border-t border-border safe-bottom" />

      {/* Clear completed dialog */}
      <AlertDialog open={clearCompletedOpen} onOpenChange={setClearCompletedOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancella elementi completati</AlertDialogTitle>
            <AlertDialogDescription>
              Vuoi eliminare tutti gli elementi completati?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearCompleted}>
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear all dialog */}
      <AlertDialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Svuota lista</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler svuotare tutta la lista?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="bg-destructive hover:bg-destructive/90"
            >
              Svuota tutto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
