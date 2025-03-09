
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, Save } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const emptyProduct: Product = {
    id: Date.now(),
    name: '',
    description: '',
    price: 0,
    category: '',
    images: ['https://images.unsplash.com/photo-1573920111312-04f1b25c6b85?q=80&w=2948&auto=format&fit=crop'],
    features: [],
  };
  
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [newFeature, setNewFeature] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  
  useEffect(() => {
    if (isEditing) {
      const product = products.find(p => p.id === Number(id));
      if (product) {
        setFormData(product);
      } else {
        toast({
          title: "Product not found",
          description: "The product you're trying to edit doesn't exist.",
          variant: "destructive"
        });
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature('');
    }
  };
  
  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };
  
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl('');
    }
  };
  
  const handleRemoveImage = (index: number) => {
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      toast({
        title: "Cannot remove all images",
        description: "A product must have at least one image.",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.description || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would send to an API
    // For this demo, we'll just show a success message and navigate back
    toast({
      title: isEditing ? "Product updated" : "Product created",
      description: `Successfully ${isEditing ? 'updated' : 'created'} ${formData.name}`,
    });
    
    navigate('/admin/products');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Enter product name"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input 
                        id="category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        placeholder="e.g. Smartphones, Laptops"
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        min="0.01" 
                        step="0.01" 
                        value={formData.price} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      placeholder="Describe your product..."
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Product Features</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature..."
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {!formData.features?.length && (
                      <div className="text-sm text-gray-500 text-center py-2">
                        No features added yet. Add some features to highlight your product.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Product Images</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Image URL..."
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddImage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="h-24 w-full object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/products')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
