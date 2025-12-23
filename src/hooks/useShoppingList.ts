import { useState, useEffect, useCallback } from 'react';

export interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'lista-spesa-veloce';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function loadFromStorage(): ShoppingItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading shopping list:', error);
  }
  return [];
}

function saveToStorage(items: ShoppingItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving shopping list:', error);
  }
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => loadFromStorage());

  // Save to localStorage whenever items change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addItem = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem: ShoppingItem = {
      id: generateId(),
      name: trimmedName,
      completed: false,
      createdAt: Date.now(),
    };

    setItems(prev => [...prev, newItem]);
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setItems(prev => prev.filter(item => !item.completed));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const completedCount = items.filter(item => item.completed).length;
  const hasCompletedItems = completedCount > 0;
  const hasItems = items.length > 0;

  return {
    items,
    addItem,
    toggleItem,
    deleteItem,
    clearCompleted,
    clearAll,
    completedCount,
    hasCompletedItems,
    hasItems,
  };
}
