
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, SlidersHorizontal, ArrowUpDown, Grid3X3, List } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Extract unique categories and brands
  const categories = Array.from(new Set(products.map(product => product.category)));
  const brands = Array.from(new Set(products.map(product => product.name.split(' ')[0])));

  // Parse search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesBrand = selectedBrands.length === 0 || 
                         selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()));
    
    return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
  });

  // Sort products
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  // Add "isNew" property to some products for the badge
  const productsWithBadges = filteredProducts.map((product, index) => ({
    ...product,
    isNew: index % 5 === 0 // Every 5th product is "new" for demonstration
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          {selectedCategory ? (
            <>
              <span className="hover:text-primary cursor-pointer" onClick={() => setSelectedCategory(null)}>Products</span>
              <span className="mx-2">/</span>
              <span>{selectedCategory}</span>
            </>
          ) : (
            <span>Products</span>
          )}
        </div>

        {/* Title and filters bar */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">{selectedCategory || 'All Products'}</h1>
          
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <form onSubmit={handleSearch} className="flex w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={viewMode === 'grid' ? 'bg-primary text-white' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className={viewMode === 'list' ? 'bg-primary text-white' : ''}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product selection
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Slider 
                            defaultValue={[0, 2000]} 
                            max={2000} 
                            step={50}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Button 
                              variant={selectedCategory === null ? "default" : "outline"}
                              onClick={() => setSelectedCategory(null)}
                              className="mr-2"
                              size="sm"
                            >
                              All
                            </Button>
                          </div>
                          
                          {categories.map((category) => (
                            <div key={category.toString()} className="flex items-center">
                              <Button 
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category as string)}
                                className="mr-2"
                                size="sm"
                              >
                                {category}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="brands">
                      <AccordionTrigger>Brands</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center gap-2">
                              <Checkbox 
                                id={`brand-${brand}`} 
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                              />
                              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedBrands([]);
                        setPriceRange([0, 2000]);
                        setSelectedCategory(null);
                      }}
                    >
                      Reset
                    </Button>
                    <Button className="flex-1">Apply</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active filters */}
        {(selectedCategory || selectedBrands.length > 0 || (priceRange[0] > 0 || priceRange[1] < 2000)) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="ml-1">×</button>
              </Badge>
            )}
            {selectedBrands.map(brand => (
              <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                Brand: {brand}
                <button onClick={() => toggleBrand(brand)} className="ml-1">×</button>
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 2000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 2000])} className="ml-1">×</button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedBrands([]);
                setPriceRange([0, 2000]);
                setSelectedCategory(null);
              }}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Product display */}
        {productsWithBadges.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' ? 
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : 
              "flex flex-col gap-4"
            }>
              {productsWithBadges.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard 
                    key={product.id.toString()} 
                    product={product} 
                    onClick={() => handleProductClick(product)}
                  />
                ) : (
                  <div key={product.id.toString()} className="flex border rounded-lg overflow-hidden">
                    <div className="w-40 h-40 p-4 flex items-center justify-center bg-white">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="max-h-full object-contain"
                        onClick={() => handleProductClick(product)}
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-xs text-gray-500">{product.category}</div>
                      <h3 
                        className="font-medium hover:text-primary cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </h3>
                      <div className="text-sm text-gray-600 my-2 line-clamp-2">{product.description}</div>
                      <div className="font-bold text-primary">${product.price.toFixed(2)}</div>
                      <div className="mt-4 flex gap-2">
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleProductClick(product)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span>...</span>
                <Button variant="outline" size="sm">10</Button>
                <Button variant="outline" size="sm">Next</Button>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
