import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Briefcase, DollarSign, Gift, TrendingUp } from "lucide-react";

interface AddIncomeProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncome: (income: {
    source: string;
    amount: number;
    description: string;
    date: string;
  }) => void;
}

const incomeSources = [
  { value: "salary", label: "Salary", icon: <Briefcase className="w-4 h-4" />, color: "text-blue-600" },
  { value: "freelance", label: "Freelance", icon: <DollarSign className="w-4 h-4" />, color: "text-green-600" },
  { value: "investment", label: "Investment Returns", icon: <TrendingUp className="w-4 h-4" />, color: "text-purple-600" },
  { value: "bonus", label: "Bonus", icon: <Gift className="w-4 h-4" />, color: "text-orange-600" },
  { value: "other", label: "Other", icon: <DollarSign className="w-4 h-4" />, color: "text-gray-600" }
];

export function AddIncome({ isOpen, onClose, onAddIncome }: AddIncomeProps) {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.source) newErrors.source = "Income source is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Valid amount is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddIncome({
        source: formData.source,
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date
      });
      
      setFormData({
        source: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const selectedSource = incomeSources.find(source => source.value === formData.source);
  const isFormValid = formData.source && formData.amount && formData.description && formData.date;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span>Add Income</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Income Source</Label>
            <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
              <SelectTrigger className={errors.source ? "border-destructive" : ""}>
                <SelectValue placeholder="Select income source" />
              </SelectTrigger>
              <SelectContent>
                {incomeSources.map((source) => (
                  <SelectItem key={source.value} value={source.value}>
                    <div className="flex items-center space-x-2">
                      <span className={source.color}>{source.icon}</span>
                      <span>{source.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.source && <p className="text-sm text-destructive">{errors.source}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={errors.amount ? "border-destructive" : ""}
              />
              {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "border-destructive" : ""}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of income..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          {isFormValid && (
            <Card className="p-4 bg-success-light border-success">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedSource && (
                    <div className={`p-2 rounded-lg bg-background ${selectedSource.color}`}>
                      {selectedSource.icon}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-success">
                      {selectedSource?.label}
                    </p>
                    <p className="text-sm text-success/70">
                      {formData.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">+₹{formData.amount}</p>
                  <p className="text-xs text-success/70">{formData.date}</p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
              Add Income
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}