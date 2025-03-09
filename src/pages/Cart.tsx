
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shippingCost + tax;
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold mt-6">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-24 w-24 bg-white rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="h-full w-full object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    </div>
                    <div className="font-medium mt-2 sm:mt-0">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateCartItemQuantity(item.product.id, item.quantity - 1);
                          } else {
                            removeFromCart(item.product.id);
                          }
                        }}
                      >
                        <Minus size={16} />
                      </Button>
                      
                      <span className="w-10 text-center">{item.quantity}</span>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
            
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              size="lg"
              onClick={handleCheckout}
            >
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              Secure checkout powered by Stripe. Your payment information is encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
