
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit-card',
    saveInfo: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shippingCost + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      navigate('/products');
      return;
    }
    
    // Validate form
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderId = Math.floor(10000000 + Math.random() * 90000000);
      
      clearCart();
      setIsSubmitting(false);
      
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${orderId} has been placed.`,
      });
      
      navigate(`/order-tracking/${orderId}`);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={handleRadioChange}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                    Credit / Debit Card
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                    PayPal
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="mt-6 flex items-center space-x-2">
                <Checkbox 
                  id="saveInfo" 
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, saveInfo: checked === true }))
                  }
                />
                <Label htmlFor="saveInfo" className="text-sm cursor-pointer">
                  Save this information for next time
                </Label>
              </div>
            </div>
            
            <div className="lg:hidden">
              <OrderSummary 
                cartItems={cartItems} 
                subtotal={subtotal} 
                shippingCost={shippingCost} 
                tax={tax} 
                total={total} 
                isSubmitting={isSubmitting}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </Button>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:block">
          <OrderSummary 
            cartItems={cartItems} 
            subtotal={subtotal} 
            shippingCost={shippingCost} 
            tax={tax} 
            total={total} 
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  cartItems: Array<{ product: any, quantity: number }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isSubmitting: boolean;
}

const OrderSummary = ({ 
  cartItems, 
  subtotal, 
  shippingCost, 
  tax, 
  total,
  isSubmitting 
}: OrderSummaryProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm sticky top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.product.id} className="py-3 flex items-center">
            <div className="h-12 w-12 bg-white rounded-md overflow-hidden flex-shrink-0 relative">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name} 
                className="h-full w-full object-contain"
              />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)}</p>
            </div>
            
            <div className="text-sm font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
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
        type="submit" 
        form="checkout-form" 
        className="w-full mt-6" 
        size="lg" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </div>
  );
};

export default Checkout;
