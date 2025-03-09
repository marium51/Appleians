
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Menu, X, Heart, Phone, Repeat2, User, LogIn, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CompareButton } from '@/components/ui/CompareButton';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Order Tracking', path: '/order-tracking' }
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span className="text-xs">+88 01841-802478</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">support@appleians.com</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/compare" className="text-xs flex items-center gap-1 hover:underline">
              <Repeat2 size={14} />
              <span>Compare</span>
            </Link>
            <Link to="/wishlist" className="text-xs flex items-center gap-1 hover:underline">
              <Heart size={14} />
              <span>Wishlist</span>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="text-xs flex items-center gap-1 hover:underline text-white p-0 h-auto">
                    <User size={14} />
                    <span>My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="text-xs">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/order-tracking" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="text-xs flex items-center gap-1 hover:underline">
                <LogIn size={14} />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className={`bg-white shadow-sm transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold mr-8 text-orange-500">
                Appleians
              </Link>
              
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] lg:w-[300px] pl-8 border-orange-200 focus-visible:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`text-sm hover:text-orange-500 transition-colors ${
                      location.pathname === link.path ? 'font-medium text-orange-500' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <CompareButton />
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-orange-500 hover:bg-transparent">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-orange-500"
                      variant="default"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              {/* Mobile login button */}
              <div className="md:hidden">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-orange-500 text-white">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div>{user?.name}</div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/order-tracking" className="cursor-pointer">My Orders</Link>
                      </DropdownMenuItem>
                      {user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
                    <LogIn className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center py-4">
                      <span className="font-bold text-lg">Menu</span>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </div>
                    
                    <form onSubmit={handleSearch} className="mb-6">
                      <div className="relative">
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="w-full pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                    
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path}
                          to={link.path}
                          className={`hover:text-orange-500 transition-colors py-2 ${
                            location.pathname === link.path ? 'font-medium text-orange-500' : 'text-gray-700'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <Link to="/compare" className="py-2 hover:text-orange-500">Compare</Link>
                      <Link to="/wishlist" className="py-2 hover:text-orange-500">Wishlist</Link>
                      
                      {isAuthenticated ? (
                        <>
                          <Link to="/profile" className="py-2 hover:text-orange-500">My Profile</Link>
                          <Link to="/order-tracking" className="py-2 hover:text-orange-500">My Orders</Link>
                          {user?.role === 'admin' && (
                            <Link to="/admin" className="py-2 hover:text-orange-500">Admin Dashboard</Link>
                          )}
                          <button 
                            onClick={handleLogout}
                            className="py-2 text-left hover:text-red-500 flex items-center"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link to="/login" className="py-2 hover:text-orange-500 flex items-center">
                          <LogIn className="mr-2 h-4 w-4" />
                          Login / Register
                        </Link>
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
