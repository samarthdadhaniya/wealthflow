import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BudgetCard } from "@/components/budget/BudgetCard";
import { Progress } from "@/components/ui/progress";
import { Calculator } from "@/components/budget/Calculator";
import { AddExpense } from "@/components/budget/AddExpense";
import { AddIncome } from "@/components/budget/AddIncome";
import { SplitBillsModal } from "@/components/budget/SplitBillsModal";
import { 
  Utensils, 
  Home, 
  Car, 
  ShoppingBag, 
  Gamepad2, 
  Heart, 
  Plus,
  TrendingDown,
  TrendingUp,
  PieChart,
  Target,
  Users,
  Calculator as CalculatorIcon,
  Edit,
  Trash2
} from "lucide-react";

const budgetCategories = [
  {
    category: "Food & Dining",
    icon: <Utensils className="w-5 h-5 text-white" />,
    spent: 8500,
    budget: 10000,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    transactions: 23
  },
  {
    category: "Housing",
    icon: <Home className="w-5 h-5 text-white" />,
    spent: 25000,
    budget: 25000,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    transactions: 3
  },
  {
    category: "Transportation",
    icon: <Car className="w-5 h-5 text-white" />,
    spent: 4200,
    budget: 5000,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    transactions: 12
  },
  {
    category: "Shopping",
    icon: <ShoppingBag className="w-5 h-5 text-white" />,
    spent: 6800,
    budget: 8000,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    transactions: 18
  },
  {
    category: "Entertainment",
    icon: <Gamepad2 className="w-5 h-5 text-white" />,
    spent: 3200,
    budget: 4000,
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    transactions: 8
  },
  {
    category: "Healthcare",
    icon: <Heart className="w-5 h-5 text-white" />,
    spent: 1500,
    budget: 3000,
    color: "bg-gradient-to-br from-red-500 to-red-600",
    transactions: 4
  }
];

const monthlyOverview = {
  totalIncome: 75000,
  totalExpenses: 49200,
  totalBudget: 55000,
  savingsGoal: 20000,
  actualSavings: 25800
};

const recentTransactions = [
  { description: "Grocery Shopping", amount: -1200, category: "Food", date: "Today", icon: <Utensils className="w-4 h-4" /> },
  { description: "Salary Credit", amount: 75000, category: "Income", date: "2 days ago", icon: <TrendingUp className="w-4 h-4" /> },
  { description: "Uber Ride", amount: -250, category: "Transport", date: "2 days ago", icon: <Car className="w-4 h-4" /> },
  { description: "Netflix Subscription", amount: -199, category: "Entertainment", date: "3 days ago", icon: <Gamepad2 className="w-4 h-4" /> },
  { description: "Electricity Bill", amount: -2500, category: "Housing", date: "5 days ago", icon: <Home className="w-4 h-4" /> }
];

export default function Budget() {
  const [selectedMonth, setSelectedMonth] = useState("Current Month");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isSplitBillsOpen, setIsSplitBillsOpen] = useState(false);
  const [budgetData, setBudgetData] = useState(budgetCategories);
  const [transactions, setTransactions] = useState(recentTransactions);
  const [splitBills, setSplitBills] = useState([
    { description: "Dinner at Restaurant", totalAmount: 2400, participants: [{ name: "You", amount: 600, settled: true }, { name: "John", amount: 600, settled: false }, { name: "Alice", amount: 600, settled: true }, { name: "Bob", amount: 600, settled: false }], date: "2024-08-06" },
    { description: "Movie Night", totalAmount: 1200, participants: [{ name: "You", amount: 400, settled: true }, { name: "Sarah", amount: 400, settled: false }, { name: "Mike", amount: 400, settled: true }], date: "2024-08-05" }
  ]);
  
  
  const totalSpent = budgetData.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = budgetData.reduce((sum, cat) => sum + cat.budget, 0);
  const savingsRate = ((monthlyOverview.actualSavings / monthlyOverview.totalIncome) * 100).toFixed(1);
  const expenseRatio = ((totalSpent / monthlyOverview.totalIncome) * 100).toFixed(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddExpense = (expense: {
    category: string;
    amount: number;
    description: string;
    date: string;
  }) => {
    // Update budget categories
    setBudgetData(prev => prev.map(cat => 
      cat.category === expense.category 
        ? { ...cat, spent: cat.spent + expense.amount, transactions: cat.transactions + 1 }
        : cat
    ));

    // Add to transactions
    const categoryIcons: Record<string, JSX.Element> = {
      'Food & Dining': <Utensils className="w-4 h-4" />,
      'Housing': <Home className="w-4 h-4" />,
      'Transportation': <Car className="w-4 h-4" />,
      'Shopping': <ShoppingBag className="w-4 h-4" />,
      'Entertainment': <Gamepad2 className="w-4 h-4" />,
      'Healthcare': <Heart className="w-4 h-4" />
    };

    const newTransaction = {
      description: expense.description,
      amount: -expense.amount,
      category: expense.category,
      date: expense.date === new Date().toISOString().split('T')[0] ? 'Today' : expense.date,
      icon: categoryIcons[expense.category] || <ShoppingBag className="w-4 h-4" />
    };

    setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
  };

  const handleAddIncome = (income: {
    source: string;
    amount: number;
    description: string;
    date: string;
  }) => {
    const newTransaction = {
      description: income.description,
      amount: income.amount,
      category: income.source,
      date: income.date === new Date().toISOString().split('T')[0] ? 'Today' : income.date,
      icon: <TrendingUp className="w-4 h-4" />
    };

    setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
  };

  const handleAddSplitBill = (bill: {
    description: string;
    totalAmount: number;
    participants: { name: string; amount: number; settled: boolean }[];
    date: string;
  }) => {
    setSplitBills(prev => [bill, ...prev]);
  };

  const deleteBudgetCategory = (categoryName: string) => {
    setBudgetData(prev => prev.filter(cat => cat.category !== categoryName));
  };

  const calculateOwedAmount = () => {
    return splitBills.reduce((total, bill) => {
      const userParticipant = bill.participants.find(p => p.name === "You");
      const unsettledAmount = bill.participants
        .filter(p => p.name !== "You" && !p.settled)
        .reduce((sum, p) => sum + p.amount, 0);
      return total + (userParticipant ? unsettledAmount : 0);
    }, 0);
  };

  const calculateOwingAmount = () => {
    return splitBills.reduce((total, bill) => {
      const userParticipant = bill.participants.find(p => p.name === "You");
      if (!userParticipant || userParticipant.settled) return total;
      return total + userParticipant.amount;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Budget Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Track expenses and manage your monthly budget
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setIsCalculatorOpen(true)}>
                <CalculatorIcon className="w-4 h-4 mr-2" />
                Calculator
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsAddIncomeOpen(true)}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Add Income
              </Button>
              <Button size="sm" className="bg-gradient-primary text-white shadow-soft" onClick={() => setIsAddExpenseOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-success-light rounded-lg">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(monthlyOverview.totalIncome)}
                </p>
                <p className="text-xs text-success">+12% from last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-destructive-light rounded-lg">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(totalSpent)}
                </p>
                <p className="text-xs text-muted-foreground">{expenseRatio}% of income</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-light rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Savings</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(monthlyOverview.actualSavings)}
                </p>
                <p className="text-xs text-success">{savingsRate}% savings rate</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-warning-light rounded-lg">
                <PieChart className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <p className="text-xl font-bold text-foreground">
                  {((totalSpent / totalBudget) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(totalBudget - totalSpent)} remaining
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Categories */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Budget Categories
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgetData.map((category, index) => (
                <BudgetCard
                  key={index}
                  {...category}
                  onAddExpense={() => setIsAddExpenseOpen(true)}
                  onEdit={() => console.log("Edit", category.category)}
                  onDelete={() => deleteBudgetCategory(category.category)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${transaction.amount > 0 ? 'bg-success-light text-success' : 'bg-destructive-light text-destructive'}`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Savings Goal Progress */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4">Monthly Savings Goal</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">{formatCurrency(monthlyOverview.savingsGoal)}</span>
                </div>
                <Progress 
                  value={(monthlyOverview.actualSavings / monthlyOverview.savingsGoal) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-success font-medium">
                    {formatCurrency(monthlyOverview.actualSavings)} saved
                  </span>
                  <span className="text-muted-foreground">
                    {((monthlyOverview.actualSavings / monthlyOverview.savingsGoal) * 100).toFixed(0)}% achieved
                  </span>
                </div>
              </div>
            </Card>

            {/* Split Bills */}
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Split Bills</h3>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {calculateOwedAmount() > 0 && (
                  <div className="flex justify-between items-center p-3 bg-success-light rounded-lg">
                    <div>
                      <p className="font-medium text-success text-sm">You're owed</p>
                      <p className="text-xs text-success/70">From {splitBills.length} bill(s)</p>
                    </div>
                    <span className="font-bold text-success">+{formatCurrency(calculateOwedAmount())}</span>
                  </div>
                )}
                {calculateOwingAmount() > 0 && (
                  <div className="flex justify-between items-center p-3 bg-destructive-light rounded-lg">
                    <div>
                      <p className="font-medium text-destructive text-sm">You owe</p>
                      <p className="text-xs text-destructive/70">Pending settlements</p>
                    </div>
                    <span className="font-bold text-destructive">-{formatCurrency(calculateOwingAmount())}</span>
                  </div>
                )}
                {splitBills.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <p className="text-sm">No split bills yet</p>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setIsSplitBillsOpen(true)}>
                <Users className="w-4 h-4 mr-2" />
                Manage Split Bills
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Calculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <AddExpense 
        isOpen={isAddExpenseOpen} 
        onClose={() => setIsAddExpenseOpen(false)}
        onAddExpense={handleAddExpense}
      />
      <AddIncome 
        isOpen={isAddIncomeOpen} 
        onClose={() => setIsAddIncomeOpen(false)}
        onAddIncome={handleAddIncome}
      />
      <SplitBillsModal 
        isOpen={isSplitBillsOpen} 
        onClose={() => setIsSplitBillsOpen(false)}
        onAddSplitBill={handleAddSplitBill}
      />
    </div>
  );
}