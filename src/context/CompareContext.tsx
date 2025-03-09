
import React, { createContext, useContext, useState } from 'react';
import { Product, CompareItem } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CompareContextType {
  compareItems: CompareItem[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isInCompare: (productId: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const addToCompare = (product: Product) => {
    if (compareItems.length >= 4) {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 4 products at a time. Please remove a product before adding another.",
        variant: "destructive"
      });
      return;
    }
    
    if (isInCompare(product.id)) {
      toast({
        title: "Already in compare",
        description: `${product.name} is already in your compare list.`,
      });
      return;
    }
    
    setCompareItems((prevItems) => [...prevItems, { product }]);
    toast({
      title: "Added to compare",
      description: `${product.name} added to your compare list.`,
    });
  };

  const removeFromCompare = (productId: number) => {
    setCompareItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (productId: number) => {
    return compareItems.some((item) => item.product.id === productId);
  };

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};
