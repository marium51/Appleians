
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin/login');
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-slate-900 text-white p-4 fixed">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-bold text-xl">Admin Dashboard</span>
        </div>
        
        {user && (
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-slate-400 text-xs">{user.email}</div>
            </div>
          </div>
        )}
        
        <Separator className="my-4 bg-slate-700" />
        <nav className="space-y-2">
          <Link to="/admin">
            <Button 
              variant={isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/orders') ? "default" : "ghost"} 
              className="w-full justify-start"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button 
              variant={isActive('/admin/products') ? "default" : "ghost"} 
              className="w-full justify-start"
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button 
              variant={isActive('/admin/orders') ? "default" : "ghost"} 
              className="w-full justify-start"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Separator className="my-4 bg-slate-700" />
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800/20 mt-2">
              <ChevronRight className="mr-2 h-4 w-4" />
              View Store
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 flex-1 p-6 min-h-screen">
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link to="/admin" className="hover:text-foreground">Admin</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            {location.pathname.includes('/products') && (
              <>
                <Link to="/admin/products" className={location.pathname === '/admin/products' ? 'text-foreground' : 'hover:text-foreground'}>
                  Products
                </Link>
                {location.pathname.includes('/edit/') && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground">Edit Product</span>
                  </>
                )}
                {location.pathname.includes('/new') && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground">New Product</span>
                  </>
                )}
              </>
            )}
            {location.pathname.includes('/orders') && (
              <>
                <Link to="/admin/orders" className={location.pathname === '/admin/orders' ? 'text-foreground' : 'hover:text-foreground'}>
                  Orders
                </Link>
                {location.pathname.includes('/orders/') && location.pathname !== '/admin/orders' && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground">Order Details</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
