
import React from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, GitCompare, Heart } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { addToCompare, isInCompare } = useCompare();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const isInCart = cartItems.some(item => item.product.id === product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCompare(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col border border-gray-200">
      {product.isNew && (
        <Badge className="absolute top-2 left-2 z-10 bg-orange-500">New</Badge>
      )}
      <div 
        className="aspect-square relative overflow-hidden cursor-pointer bg-white p-4 flex items-center justify-center"
        onClick={onClick}
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="object-contain w-full max-h-40 transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "bg-white hover:bg-primary hover:text-white rounded-full w-8 h-8", 
              isInCompare(product.id) && "bg-primary text-white"
            )}
            onClick={handleCompareClick}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-primary hover:text-white rounded-full w-8 h-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="pt-4 flex-1">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 
            className="font-medium text-sm truncate cursor-pointer hover:text-primary"
            onClick={onClick}
          >
            {product.name}
          </h3>
        </div>
        <div className="font-bold text-primary">${product.price.toFixed(2)}</div>
        <div className="text-xs text-gray-400">Cash Available: Price Fixed</div>
        <div className="text-xs bg-green-100 text-green-700 inline-block px-2 py-0.5 rounded mt-1">In Stock</div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant={isInCart ? "secondary" : "default"}
          className="w-full text-xs"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="hover:bg-primary hover:text-white"
          onClick={onClick}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
