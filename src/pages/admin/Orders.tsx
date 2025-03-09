
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  Eye,
  Check,
  X,
  Clock,
  Truck,
  PackageCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    status: 'delivered',
    items: [
      { product: { id: 1, name: 'iPhone 15 Pro', description: '', price: 999, category: 'Smartphones', images: [] }, quantity: 1 }
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
      { product: { id: 2, name: 'MacBook Pro 16"', description: '', price: 1999, category: 'Laptops', images: [] }, quantity: 1 }
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
      { product: { id: 3, name: 'iPad Pro', description: '', price: 799, category: 'Tablets', images: [] }, quantity: 1 },
      { product: { id: 4, name: 'AirPods Pro', description: '', price: 249, category: 'Accessories', images: [] }, quantity: 1 }
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
      { product: { id: 5, name: 'Apple Watch Series 9', description: '', price: 399, category: 'Accessories', images: [] }, quantity: 1 }
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
      { product: { id: 6, name: 'HomePod mini', description: '', price: 99, category: 'Accessories', images: [] }, quantity: 2 }
    ],
    totalAmount: 198,
    shippingAddress: '202 Maple St, Boston, MA 02108',
    orderDate: '2023-06-11',
    paymentMethod: 'Credit Card'
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order status updated",
      description: `Order #${orderId} has been marked as ${newStatus}.`,
    });
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toString().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by order ID, customer name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={statusFilter === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === 'pending' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                <Clock className="h-4 w-4 mr-1" />
                Pending
              </Button>
              <Button 
                variant={statusFilter === 'processing' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('processing')}
              >
                <PackageCheck className="h-4 w-4 mr-1" />
                Processing
              </Button>
              <Button 
                variant={statusFilter === 'shipped' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('shipped')}
              >
                <Truck className="h-4 w-4 mr-1" />
                Shipped
              </Button>
              <Button 
                variant={statusFilter === 'delivered' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('delivered')}
              >
                <Check className="h-4 w-4 mr-1" />
                Delivered
              </Button>
              <Button 
                variant={statusFilter === 'cancelled' ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter('cancelled')}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelled
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link to={`/admin/orders/${order.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      
                      {order.status !== 'cancelled' && (
                        <div className="flex space-x-1">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleStatusChange(order.id, 'processing')}
                            >
                              <PackageCheck className="h-4 w-4" />
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-purple-600 hover:text-purple-800"
                              onClick={() => handleStatusChange(order.id, 'shipped')}
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          )}
                          {order.status === 'shipped' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleStatusChange(order.id, 'delivered')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No orders found. Try a different search filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
