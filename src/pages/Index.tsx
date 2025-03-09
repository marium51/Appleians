
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ArrowRight, ArrowLeft, ShoppingBag, Shield, TruckIcon, RefreshCw, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Get featured products
  const featuredProducts = products.slice(0, 6);
  const newArrivals = products.slice(2, 8);
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Slider */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-3/4 relative overflow-hidden rounded-lg">
              <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 h-[300px] md:h-[400px] flex items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <button className="bg-black/30 text-white p-2 rounded-full">
                    <ArrowLeft size={20} />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <button className="bg-black/30 text-white p-2 rounded-full">
                    <ArrowRight size={20} />
                  </button>
                </div>
                <div className="container mx-auto px-8 md:px-16 flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Galaxy S25 Ultra</h1>
                  <p className="text-xl mb-6 text-gray-700">Galaxy AI is here</p>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/products')}
                    className="bg-orange-500 text-white hover:bg-orange-600 w-fit"
                  >
                    Buy Now
                  </Button>
                </div>
              
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/4 flex flex-col gap-4">
              <div className="bg-blue-600 text-white p-4 rounded-lg h-[192px] md:h-[195px] flex flex-col justify-center">
                <h3 className="text-lg font-bold mb-2">New Airpods Pro</h3>
                <p className="text-sm mb-4">Experience next-level sound</p>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 w-fit">
                  Shop Now
                </Button>
              </div>
              <div className="bg-orange-500 text-white p-4 rounded-lg h-[192px] md:h-[195px] flex flex-col justify-center">
                <h3 className="text-lg font-bold mb-2">Galaxy Watch</h3>
                <p className="text-sm mb-4">Track your health 24/7</p>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 w-fit">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 text-orange-500">
                <TruckIcon size={24} />
              </div>
              <h3 className="text-sm font-medium">Fast Delivery</h3>
              <p className="text-xs text-gray-500">All Over Bangladesh</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 text-orange-500">
                <Shield size={24} />
              </div>
              <h3 className="text-sm font-medium">Secure Payment</h3>
              <p className="text-xs text-gray-500">100% Secure</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 text-orange-500">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-sm font-medium">Online Support</h3>
              <p className="text-xs text-gray-500">Technical Support 24/7</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 text-orange-500">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-sm font-medium">Big Savings</h3>
              <p className="text-xs text-gray-500">Save More Money</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              FEATURED CATEGORIES
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></div>
            </h2>
            <p className="text-sm text-gray-500 mt-2">Let your device get glory from featured categories</p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {["Phones", "Tablets", "Laptops", "Audio", "Wearables", "Cameras", "Accessories", "Gaming"].map((category) => (
              <CategoryIconCard 
                key={category} 
                category={category} 
                onClick={() => navigate(`/products?category=${category}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Ready For Order */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              Ready for Order 
              <span className="ml-2 text-orange-500">🔥</span>
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id.toString()} 
                product={product} 
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              Featured Products
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></div>
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="outline" className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600">All</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">New</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">Featured</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id.toString()} 
                product={product} 
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrival */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              New Arrival
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {newArrivals.map((product) => (
              <ProductCard 
                key={product.id.toString()} 
                product={product} 
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Brand Products */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              Top Brand Products
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></div>
            </h2>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <Badge variant="outline" className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600">All</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">Apple</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">Samsung</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">Xiaomi</Badge>
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">Sony</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id.toString()} 
                product={product} 
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Shop By Brands */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold uppercase relative inline-block">
              Shop By Brands
              <div className="absolute w-16 h-0.5 bg-orange-500 bottom-0 left-0 mt-1"></div>
            </h2>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
              See All Brands <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {["Apple", "Samsung", "Xiaomi", "Sony", "Realme", "OnePlus"].map((brand) => (
              <div key={brand} className="border p-4 rounded-lg flex items-center justify-center h-20">
                <p className="font-medium">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Shop Info */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Top Gadget Shop in Bangladesh</h2>
          <p className="text-sm text-gray-600 mb-4">
            Welcome to Gadget Store, your premier destination for all your technology needs in Bangladesh. We offer a wide range of the latest smartphones, laptops, tablets, and accessories from top brands at competitive prices.
          </p>
          <p className="text-sm text-gray-600">
            With fast delivery across Bangladesh and excellent customer support, we ensure a seamless shopping experience. Browse our extensive collection and find the perfect tech gadget for your lifestyle.
          </p>
        </div>
      </section>
    </div>
  );
};

interface CategoryIconCardProps {
  category: string;
  onClick: () => void;
}

const CategoryIconCard = ({ category, onClick }: CategoryIconCardProps) => {
  const getCategoryIcon = (category: string) => {
    // This is a simplified approach - in a real application, you might want to use actual icon components
    switch (category.toLowerCase()) {
      case 'phones':
        return '📱';
      case 'tablets':
        return '📟';
      case 'laptops':
        return '💻';
      case 'audio':
        return '🎧';
      case 'wearables':
        return '⌚';
      case 'cameras':
        return '📷';
      case 'accessories':
        return '🔌';
      case 'gaming':
        return '🎮';
      default:
        return '📦';
    }
  };

  return (
    <div 
      className="flex flex-col items-center p-3 cursor-pointer hover:shadow-md transition-shadow bg-white rounded-lg border border-gray-200"
      onClick={onClick}
    >
      <div className="text-xl mb-2">{getCategoryIcon(category)}</div>
      <p className="text-xs text-center font-medium">{category}</p>
    </div>
  );
};

export default Index;
