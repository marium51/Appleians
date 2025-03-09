
import React from 'react';
import { useCompare } from '@/context/CompareContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };
  
  const handleAddToCart = (productId: number) => {
    const product = compareItems.find(item => item.product.id === productId)?.product;
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart.`,
      });
    }
  };

  if (compareItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No products to compare</h2>
        <p className="text-muted-foreground mb-6">Add some products to compare them.</p>
        <Button onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }

  // Get all unique feature keys across all products
  const allFeatures = new Set<string>();
  compareItems.forEach(item => {
    item.product.features?.forEach(feature => {
      allFeatures.add(feature);
    });
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Compare Products</h1>
          {compareItems.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left min-w-[200px]">Product</th>
              {compareItems.map((item) => (
                <th key={item.product.id} className="p-4 text-center min-w-[250px] relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFromCompare(item.product.id)}
                  >
                    <X size={16} />
                  </Button>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mb-2">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-lg font-bold my-2">${item.product.price}</p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        variant={isInCart(item.product.id) ? "secondary" : "default"} 
                        size="sm"
                        onClick={() => handleAddToCart(item.product.id)}
                        disabled={isInCart(item.product.id)}
                        className="w-full"
                      >
                        {isInCart(item.product.id) ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-1 h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 font-medium bg-muted/50">Category</td>
              {compareItems.map((item) => (
                <td key={item.product.id} className="p-4 text-center">
                  {item.product.category}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium bg-muted/50">Description</td>
              {compareItems.map((item) => (
                <td key={item.product.id} className="p-4 text-center">
                  <p className="text-sm line-clamp-3">{item.product.description}</p>
                </td>
              ))}
            </tr>
            
            <tr>
              <td colSpan={compareItems.length + 1} className="p-4 bg-muted/30">
                <h3 className="font-bold">Features</h3>
              </td>
            </tr>
            
            {Array.from(allFeatures).map((feature, index) => (
              <tr key={index}>
                <td className="p-4 font-medium bg-muted/50">{feature}</td>
                {compareItems.map((item) => (
                  <td key={item.product.id} className="p-4 text-center">
                    {item.product.features?.includes(feature) ? (
                      <Check className="text-green-500 mx-auto" />
                    ) : (
                      <X className="text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
