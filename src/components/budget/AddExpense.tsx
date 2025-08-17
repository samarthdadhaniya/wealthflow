import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { 
  Utensils, 
  Home, 
  Car, 
  ShoppingBag, 
  Gamepad2, 
  Heart,
  X,
  Plus
} from 'lucide-react';

interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    category: string;
    amount: number;
    description: string;
    date: string;
  }) => void;
}

const categories = [
  { value: 'Food & Dining', label: 'Food & Dining', icon: <Utensils className="w-4 h-4" />, color: 'text-orange-500' },
  { value: 'Housing', label: 'Housing', icon: <Home className="w-4 h-4" />, color: 'text-blue-500' },
  { value: 'Transportation', label: 'Transportation', icon: <Car className="w-4 h-4" />, color: 'text-green-500' },
  { value: 'Shopping', label: 'Shopping', icon: <ShoppingBag className="w-4 h-4" />, color: 'text-purple-500' },
  { value: 'Entertainment', label: 'Entertainment', icon: <Gamepad2 className="w-4 h-4" />, color: 'text-pink-500' },
  { value: 'Healthcare', label: 'Healthcare', icon: <Heart className="w-4 h-4" />, color: 'text-red-500' },
];

export function AddExpense({ isOpen, onClose, onAddExpense }: AddExpenseProps) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddExpense({
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date
      });
      
      // Reset form
      setFormData({
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Add New Expense
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a category">
                  {selectedCategory && (
                    <div className="flex items-center space-x-2">
                      <span className={selectedCategory.color}>{selectedCategory.icon}</span>
                      <span>{selectedCategory.label}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center space-x-2">
                      <span className={category.color}>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={errors.amount ? 'border-destructive' : ''}
              min="0"
              step="0.01"
            />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-destructive' : ''}
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          </div>

          {/* Preview Card */}
          {formData.amount && formData.category && formData.description && (
            <Card className="p-3 bg-muted">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive-light rounded-lg">
                    {selectedCategory && <span className="text-destructive">{selectedCategory.icon}</span>}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{formData.description}</p>
                    <p className="text-xs text-muted-foreground">{formData.category}</p>
                  </div>
                </div>
                <span className="font-semibold text-destructive">
                  -₹{parseFloat(formData.amount || '0').toLocaleString('en-IN')}
                </span>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}