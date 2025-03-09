
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Compare = lazy(() => import("./pages/Compare"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));

// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminProductForm = lazy(() => import("./pages/admin/ProductForm"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminOrderDetail = lazy(() => import("./pages/admin/OrderDetail"));

// Auth Guards
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/edit/:id" element={<AdminProductForm />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:id" element={<AdminOrderDetail />} />
                </Route>
                
                {/* Customer Routes with Layout */}
                <Route path="/" element={
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">
                      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                        <Index />
                      </Suspense>
                    </main>
                    <Footer />
                  </div>
                } />
                
                <Route path="/*" element={
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">
                      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                        <Routes>
                          <Route path="products" element={<Products />} />
                          <Route path="products/:id" element={<ProductDetail />} />
                          <Route path="compare" element={<Compare />} />
                          <Route path="cart" element={<Cart />} />
                          <Route 
                            path="checkout" 
                            element={
                              <ProtectedRoute>
                                <Checkout />
                              </ProtectedRoute>
                            } 
                          />
                          <Route path="order-tracking" element={<OrderTracking />} />
                          <Route path="order-tracking/:orderId" element={<OrderTracking />} />
                          <Route path="login" element={<Login />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                  </div>
                } />
              </Routes>
            </BrowserRouter>
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
