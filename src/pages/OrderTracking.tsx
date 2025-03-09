
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, Package, Truck, Home } from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [trackingEmail, setTrackingEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderStatus, setOrderStatus] = useState<number | null>(null);
  
  // If we have an orderId from the URL, we simulate that the order exists
  useEffect(() => {
    if (orderId) {
      // Simulate fetching order status
      setOrderStatus(Math.floor(Math.random() * 4)); // 0-3 for different stages
      setIsTracking(true);
    }
  }, [orderId]);
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingEmail) return;
    
    // Simulate tracking order
    setOrderStatus(Math.floor(Math.random() * 4)); // 0-3 for different stages
    setIsTracking(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Button>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Order Tracking</h1>
        
        {!isTracking ? (
          <div className="bg-card p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4">Track Your Order</h2>
            <p className="text-muted-foreground mb-6">
              Enter your order number and email address to track your order status.
            </p>
            
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order Number</Label>
                <Input
                  id="orderId"
                  value={orderId || ''}
                  placeholder="e.g., 12345678"
                  readOnly={!!orderId}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={trackingEmail}
                  onChange={(e) => setTrackingEmail(e.target.value)}
                  placeholder="Enter the email used for your order"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-2"
              >
                Track Order
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-card p-8 rounded-lg shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium">Order #{orderId || '12345678'}</h2>
              <p className="text-muted-foreground mt-1">
                Placed on {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="mb-8">
              <Progress value={((orderStatus || 0) + 1) * 25} className="h-2" />
              
              <div className="grid grid-cols-4 mt-4">
                <OrderStatusStep 
                  icon={<Check />} 
                  label="Confirmed" 
                  isActive={orderStatus !== null && orderStatus >= 0}
                  isCompleted={orderStatus !== null && orderStatus > 0}
                />
                <OrderStatusStep 
                  icon={<Package />} 
                  label="Processing" 
                  isActive={orderStatus !== null && orderStatus >= 1}
                  isCompleted={orderStatus !== null && orderStatus > 1}
                />
                <OrderStatusStep 
                  icon={<Truck />} 
                  label="Shipping" 
                  isActive={orderStatus !== null && orderStatus >= 2}
                  isCompleted={orderStatus !== null && orderStatus > 2}
                />
                <OrderStatusStep 
                  icon={<Home />} 
                  label="Delivered" 
                  isActive={orderStatus !== null && orderStatus >= 3}
                  isCompleted={false}
                />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="font-medium mb-4">Delivery Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span>{getEstimatedDelivery(orderStatus || 0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Method</span>
                <span>Standard Shipping</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Status</span>
                <span className="font-medium">
                  {getOrderStatusText(orderStatus || 0)}
                </span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/products')} 
                className="w-full"
              >
                Continue Shopping
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setIsTracking(false)} 
                className="w-full"
              >
                Track Another Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface OrderStatusStepProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const OrderStatusStep = ({ icon, label, isActive, isCompleted }: OrderStatusStepProps) => {
  let iconClassName = "h-10 w-10 mx-auto";
  let labelClassName = "text-sm mt-2 text-center";
  
  if (isActive) {
    iconClassName += " text-primary";
    labelClassName += " font-medium";
  } else {
    iconClassName += " text-muted-foreground";
    labelClassName += " text-muted-foreground";
  }
  
  return (
    <div>
      <div className={`${iconClassName} ${isCompleted ? 'text-green-500' : ''}`}>
        {icon}
      </div>
      <div className={labelClassName}>
        {label}
      </div>
    </div>
  );
};

function getEstimatedDelivery(status: number): string {
  const today = new Date();
  let daysToAdd = 0;
  
  switch (status) {
    case 0: // Confirmed
      daysToAdd = 7;
      break;
    case 1: // Processing
      daysToAdd = 5;
      break;
    case 2: // Shipping
      daysToAdd = 2;
      break;
    case 3: // Delivered
      return 'Delivered';
  }
  
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + daysToAdd);
  
  return deliveryDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
}

function getOrderStatusText(status: number): string {
  switch (status) {
    case 0:
      return 'Order Confirmed';
    case 1:
      return 'Order Processing';
    case 2:
      return 'Order Shipped';
    case 3:
      return 'Order Delivered';
    default:
      return 'Unknown';
  }
}

export default OrderTracking;
