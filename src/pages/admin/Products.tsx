
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  PenSquare, 
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState(products);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsList(productsList.filter(product => product.id !== id));
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Apply filters and sorting
  const filteredProducts = productsList
    .filter(product => 
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterCategory === null || product.category === filterCategory)
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'id') {
        comparison = a.id - b.id;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link to="/admin/products/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by name or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterCategory || ''} onValueChange={(value) => setFilterCategory(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                  <Filter className="h-4 w-4" />
                  Sort
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSort('id')}>
                  ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('name')}>
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('category')}>
                  Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price')}>
                  Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {filterCategory && (
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filterCategory}
              <button onClick={() => setFilterCategory(null)} className="ml-1">×</button>
            </Badge>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-2">
                    ID
                    {sortField === 'id' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {sortField === 'name' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    {sortField === 'category' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Price
                    {sortField === 'price' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.id % 5 === 0 ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <XCircle className="h-3 w-3 mr-1" />
                        Out of Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        In Stock
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <Button size="sm" variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
                          <PenSquare className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200" 
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No products found. Try a different search or add a new product.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {productsList.length} products
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-orange-500 text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
