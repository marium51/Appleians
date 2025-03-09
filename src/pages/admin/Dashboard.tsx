
import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';

const Dashboard = () => {
  // Mocked data
  const totalProducts = products.length;
  const totalOrders = 42;
  const totalRevenue = 15698.75;
  const recentOrders = [
    { id: 1001, customer: 'John Doe', date: '2023-06-12', total: 259.99, status: 'delivered' },
    { id: 1002, customer: 'Jane Smith', date: '2023-06-11', total: 189.50, status: 'shipped' },
    { id: 1003, customer: 'Bob Johnson', date: '2023-06-10', total: 345.00, status: 'processing' },
    { id: 1004, customer: 'Alice Brown', date: '2023-06-09', total: 129.99, status: 'pending' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <h3 className="text-2xl font-bold mt-1">{totalProducts}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full text-green-500">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-bold mt-1">24.8%</h3>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-full text-yellow-500">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
