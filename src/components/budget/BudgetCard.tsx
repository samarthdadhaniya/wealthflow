import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit3 } from "lucide-react";

interface BudgetCardProps {
  category: string;
  icon: React.ReactNode;
  spent: number;
  budget: number;
  color: string;
  transactions?: number;
  onAddExpense?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function BudgetCard({
  category,
  icon,
  spent,
  budget,
  color,
  transactions = 0,
  onAddExpense,
  onEdit
}: BudgetCardProps) {
  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = () => {
    if (percentage > 90) return "bg-destructive";
    if (percentage > 75) return "bg-warning";
    return "bg-success";
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 bg-gradient-card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{category}</h3>
              <p className="text-sm text-muted-foreground">
                {transactions} transactions
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">{formatCurrency(spent)} / {formatCurrency(budget)}</span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className="h-2"
          />
          <div className="flex justify-between text-xs">
            <span className={`font-medium ${percentage > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {percentage.toFixed(1)}% used
            </span>
            <span className={`font-medium ${remaining < 0 ? 'text-destructive' : 'text-success'}`}>
              {remaining >= 0 ? 'Remaining: ' : 'Over by: '}{formatCurrency(Math.abs(remaining))}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onAddExpense}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>
    </Card>
  );
}