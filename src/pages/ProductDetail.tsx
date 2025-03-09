
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Minus, Plus, ShoppingCart, Check, GitCompare, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/ui/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  
  const product = products.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (product) {
      setIsInCart(cartItems.some(item => item.product.id === product.id));
    }
  }, [cartItems, product]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} x${quantity} added to your cart.`,
    });
  };
  
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCompare = () => {
    addToCompare(product);
    toast({
      title: "Added to compare",
      description: `${product.name} added to compare list.`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden aspect-square flex items-center justify-center p-4 border">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="max-h-full object-contain"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 rounded-md overflow-hidden h-24 w-24 flex-shrink-0 ${
                  index === currentImageIndex ? 'border-primary' : 'border-border'
                }`}
                onClick={() => handleImageChange(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "flex-1",
                isInCompare(product.id) && "bg-primary text-white"
              )}
              onClick={handleAddToCompare}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{product.category}</Badge>
            <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="text-green-600 text-sm flex items-center">
                <span className="bg-green-100 px-2 py-0.5 rounded">In Stock</span>
              </div>
              <div className="text-sm text-gray-500">Cash Available: Price Fixed</div>
            </div>
            
            <div className="text-2xl font-bold text-primary mt-4">${product.price.toFixed(2)}</div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                
                <span className="w-12 text-center">{quantity}</span>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  if (!isInCart) {
                    handleAddToCart();
                  }
                  navigate('/cart');
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck className="text-primary h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-gray-500">On orders over $50</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              <div>
                <div className="text-sm font-medium">1 Year Warranty</div>
                <div className="text-xs text-gray-500">Official warranty</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <RefreshCw className="text-primary h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Exchange Policy</div>
                <div className="text-xs text-gray-500">7 day exchange</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Check className="text-primary h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Secure Payment</div>
                <div className="text-xs text-gray-500">Safe & protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent">
            <TabsTrigger 
              value="description"
              className="rounded-t-lg rounded-b-none border border-b-0 data-[state=active]:bg-white data-[state=active]:border-gray-200"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specification"
              className="rounded-t-lg rounded-b-none border border-b-0 data-[state=active]:bg-white data-[state=active]:border-gray-200"
            >
              Specification
            </TabsTrigger>
            <TabsTrigger 
              value="warranty"
              className="rounded-t-lg rounded-b-none border border-b-0 data-[state=active]:bg-white data-[state=active]:border-gray-200"
            >
              Warranty
            </TabsTrigger>
          </TabsList>
          
          <div className="border rounded-b-lg rounded-tr-lg p-6 bg-white">
            <TabsContent value="description" className="mt-0">
              <h3 className="text-lg font-medium mb-4">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="specification" className="mt-0">
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Brand</span>
                    <span className="w-2/3">{product.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Model</span>
                    <span className="w-2/3">{product.name}</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Category</span>
                    <span className="w-2/3">{product.category}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Price</span>
                    <span className="w-2/3">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Availability</span>
                    <span className="w-2/3 text-green-600">In Stock</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="font-medium w-1/3">Warranty</span>
                    <span className="w-2/3">1 Year</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="warranty" className="mt-0">
              <h3 className="text-lg font-medium mb-4">Warranty Information</h3>
              <p className="text-gray-700 mb-4">
                This product comes with a standard 1-year manufacturer warranty that covers defects in materials and workmanship.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Warranty Coverage:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Manufacturing defects</li>
                  <li>Hardware failures under normal use</li>
                  <li>Battery defects (6 months coverage)</li>
                </ul>
                
                <h4 className="font-medium mt-4">Not Covered:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Physical damage</li>
                  <li>Water damage</li>
                  <li>Unauthorized repairs</li>
                  <li>Normal wear and tear</li>
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map(relatedProduct => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              onClick={() => navigate(`/products/${relatedProduct.id}`)}
            />
          ))}
        </div>
      </div>
      
      {/* Recently Viewed */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
        <div className="border rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 p-4">
              <div className="aspect-square flex items-center justify-center bg-white border rounded-md p-2">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="max-h-full object-contain"
                />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <div className="text-primary font-bold mt-2">${product.price.toFixed(2)}</div>
              <div className="mt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addToCompare(product)}
                >
                  <span className="text-xs">Add to compare</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
