
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  Check,
  X,
  Clock,
  PackageCheck,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock orders data (same as in Orders.tsx)
const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    status: 'delivered',
    items: [
      { product: { id: 1, name: 'iPhone 15 Pro', description: '', price: 999, category: 'Smartphones', images: ['https://images.unsplash.com/photo-1694588708141-0071d3fca40d?q=80&w=2940&auto=format&fit=crop'] }, quantity: 1 }
    ],
    totalAmount: 999,
    shippingAddress: '123 Main St, New York, NY 10001',
    orderDate: '2023-06-15',
    paymentMethod: 'Credit Card'
  },
  {
    id: 1002,
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    status: 'shipped',
    items: [
      { product: { id: 2, name: 'MacBook Pro 16"', description: '', price: 1999, category: 'Laptops', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2952&auto=format&fit=crop'] }, quantity: 1 }
    ],
    totalAmount: 1999,
    shippingAddress: '456 Elm St, Los Angeles, CA 90001',
    orderDate: '2023-06-14',
    paymentMethod: 'PayPal'
  },
  {
    id: 1003,
    customerName: 'Bob Johnson',
    customerEmail: 'bob.johnson@example.com',
    status: 'processing',
    items: [
      { product: { id: 3, name: 'iPad Pro', description: '', price: 799, category: 'Tablets', images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2944&auto=format&fit=crop'] }, quantity: 1 },
      { product: { id: 4, name: 'AirPods Pro', description: '', price: 249, category: 'Accessories', images: ['https://images.unsplash.com/photo-1588156979401-db3dc31817cb?q=80&w=2942&auto=format&fit=crop'] }, quantity: 1 }
    ],
    totalAmount: 1048,
    shippingAddress: '789 Oak St, Chicago, IL 60007',
    orderDate: '2023-06-13',
    paymentMethod: 'Credit Card'
  },
  {
    id: 1004,
    customerName: 'Alice Brown',
    customerEmail: 'alice.brown@example.com',
    status: 'pending',
    items: [
      { product: { id: 5, name: 'Apple Watch Series 9', description: '', price: 399, category: 'Accessories', images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2864&auto=format&fit=crop'] }, quantity: 1 }
    ],
    totalAmount: 399,
    shippingAddress: '101 Pine St, Seattle, WA 98101',
    orderDate: '2023-06-12',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 1005,
    customerName: 'Michael Wilson',
    customerEmail: 'michael.wilson@example.com',
    status: 'cancelled',
    items: [
      { product: { id: 6, name: 'HomePod mini', description: '', price: 99, category: 'Accessories', images: ['https://images.unsplash.com/photo-1614111345871-88c460899dc7?q=80&w=2829&auto=format&fit=crop'] }, quantity: 2 }
    ],
    totalAmount: 198,
    shippingAddress: '202 Maple St, Boston, MA 02108',
    orderDate: '2023-06-11',
    paymentMethod: 'Credit Card'
  }
];

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === Number(id));
  
  if (!order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">The order you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/orders')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </div>
    );
  }
  
  const handleStatusChange = (newStatus: Order['status']) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Order status updated",
      description: `Order #${order.id} has been marked as ${newStatus}.`,
    });
  };
  
  const getStatusBadge = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <PackageCheck className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate('/admin/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print Invoice
          </Button>
          
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => handleStatusChange('processing')}
                >
                  <PackageCheck className="h-4 w-4 mr-1" />
                  Mark as Processing
                </Button>
              )}
              {order.status === 'processing' && (
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                  onClick={() => handleStatusChange('shipped')}
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Mark as Shipped
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50"
                  onClick={() => handleStatusChange('delivered')}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark as Delivered
                </Button>
              )}
              <Button 
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                onClick={() => handleStatusChange('cancelled')}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main order information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Order Summary</h2>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{getStatusBadge(order.status)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">Order Date</div>
                    <div className="text-gray-500">{order.orderDate}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">Customer</div>
                    <div className="text-gray-500">{order.customerName}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-500">{order.customerEmail}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">Shipping Address</div>
                    <div className="text-gray-500">{order.shippingAddress}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">Payment Method</div>
                    <div className="text-gray-500">{order.paymentMethod}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border-b last:border-0">
                    <div className="h-16 w-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.product.images.length > 0 && (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        <Link to={`/products/${item.product.id}`} className="hover:text-primary">
                          {item.product.name}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.product.category}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </div>
                    <div className="text-right font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order summary sidebar */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Payment Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${(order.totalAmount * 0.85).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span>${(order.totalAmount * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
