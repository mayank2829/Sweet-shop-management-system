import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, RefreshCw, Search, LayoutDashboard } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockSweets as initialSweets } from '@/data/mockSweets';
import { Sweet, CATEGORIES } from '@/types/sweet';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [restockSweet, setRestockSweet] = useState<Sweet | null>(null);
  const [restockAmount, setRestockAmount] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
  });

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard className="w-12 h-12 text-destructive" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-3">Access Denied</h1>
            <p className="text-muted-foreground mb-8">
              You need admin privileges to access this page
            </p>
            <Button onClick={() => navigate('/login')}>
              Login as Admin
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
      image: '',
    });
  };

  const handleAddSweet = () => {
    const newSweet: Sweet = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    };
    
    setSweets(prev => [...prev, newSweet]);
    toast.success('Sweet added successfully!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditSweet = () => {
    if (!editingSweet) return;
    
    setSweets(prev => prev.map(sweet =>
      sweet.id === editingSweet.id
        ? {
            ...sweet,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            description: formData.description,
            image: formData.image,
          }
        : sweet
    ));
    
    toast.success('Sweet updated successfully!');
    setEditingSweet(null);
    resetForm();
  };

  const handleDeleteSweet = (id: string) => {
    setSweets(prev => prev.filter(sweet => sweet.id !== id));
    toast.success('Sweet deleted successfully!');
  };

  const handleRestock = () => {
    if (!restockSweet) return;
    
    setSweets(prev => prev.map(sweet =>
      sweet.id === restockSweet.id
        ? { ...sweet, quantity: sweet.quantity + restockAmount }
        : sweet
    ));
    
    toast.success(`Restocked ${restockAmount} units of ${restockSweet.name}`);
    setRestockSweet(null);
    setRestockAmount(0);
  };

  const openEditDialog = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      description: sweet.description,
      image: sweet.image,
    });
  };

  const stats = {
    totalProducts: sweets.length,
    outOfStock: sweets.filter(s => s.quantity === 0).length,
    lowStock: sweets.filter(s => s.quantity > 0 && s.quantity <= 10).length,
    totalValue: sweets.reduce((sum, s) => sum + s.price * s.quantity, 0),
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your sweet inventory</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="candy" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Sweet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display">Add New Sweet</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddSweet();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.emoji} {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Sweet</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Products</span>
              </div>
              <p className="text-3xl font-display font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <span className="text-lg">⚠️</span>
                </div>
                <span className="text-sm text-muted-foreground">Out of Stock</span>
              </div>
              <p className="text-3xl font-display font-bold text-destructive">{stats.outOfStock}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-candy-yellow/20 flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
                <span className="text-sm text-muted-foreground">Low Stock</span>
              </div>
              <p className="text-3xl font-display font-bold text-candy-orange">{stats.lowStock}</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-candy-mint/20 flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <span className="text-sm text-muted-foreground">Inventory Value</span>
              </div>
              <p className="text-3xl font-display font-bold text-candy-mint">${stats.totalValue.toFixed(0)}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 max-w-md"
            />
          </div>

          {/* Products Table */}
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 font-display font-semibold">Product</th>
                    <th className="text-left p-4 font-display font-semibold">Category</th>
                    <th className="text-left p-4 font-display font-semibold">Price</th>
                    <th className="text-left p-4 font-display font-semibold">Stock</th>
                    <th className="text-right p-4 font-display font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSweets.map(sweet => (
                    <tr key={sweet.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={sweet.image}
                            alt={sweet.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-semibold">{sweet.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                              {sweet.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">
                          {CATEGORIES.find(c => c.value === sweet.category)?.emoji}{' '}
                          {CATEGORIES.find(c => c.value === sweet.category)?.label}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold">${sweet.price.toFixed(2)}</td>
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className={cn(
                            sweet.quantity === 0 && "bg-destructive/10 text-destructive",
                            sweet.quantity > 0 && sweet.quantity <= 10 && "bg-candy-yellow/20 text-candy-orange",
                            sweet.quantity > 10 && "bg-candy-mint/20 text-candy-mint"
                          )}
                        >
                          {sweet.quantity} units
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setRestockSweet(sweet)}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(sweet)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteSweet(sweet.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingSweet} onOpenChange={(open) => !open && setEditingSweet(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Sweet</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSweet();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={!!restockSweet} onOpenChange={(open) => !open && setRestockSweet(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Restock {restockSweet?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Current stock: <span className="font-semibold">{restockSweet?.quantity} units</span>
            </p>
            <div className="space-y-2">
              <Label htmlFor="restock-amount">Add Quantity</Label>
              <Input
                id="restock-amount"
                type="number"
                min="1"
                value={restockAmount}
                onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
              />
            </div>
            <Button onClick={handleRestock} className="w-full" disabled={restockAmount <= 0}>
              Restock
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
