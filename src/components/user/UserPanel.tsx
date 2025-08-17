import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  TrendingUp, 
  PieChart, 
  Heart, 
  Users, 
  Calendar,
  Target,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Download
} from "lucide-react";

interface UserPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

// Mock user data
const userData = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  joinDate: "Jan 2024",
  riskProfile: "Moderate",
  totalInvestment: 485000,
  totalReturns: 65000,
  savingsGoal: 1000000,
  currentSavings: 485000
};

const budgetOverview = {
  monthlyIncome: 75000,
  monthlyExpenses: 45000,
  monthlySavings: 30000,
  categories: [
    { name: "Food & Dining", spent: 8500, budget: 10000 },
    { name: "Transportation", spent: 4200, budget: 5000 },
    { name: "Shopping", spent: 6800, budget: 8000 },
    { name: "Entertainment", spent: 3200, budget: 4000 }
  ]
};

const watchlistedFunds = [
  { name: "HDFC Top 100 Fund", returns: "15.2%", risk: "Medium", amount: 125000 },
  { name: "SBI Small Cap Fund", returns: "22.8%", risk: "High", amount: 85000 },
  { name: "ICICI Prudential Bluechip Fund", returns: "14.5%", risk: "Medium", amount: 150000 },
  { name: "Axis Long Term Equity Fund", returns: "18.1%", risk: "Medium-High", amount: 95000 }
];

const splitBills = [
  { description: "Dinner at Taj", amount: 2400, owed: 600, participants: 4 },
  { description: "Movie Night", amount: 1200, owed: -400, participants: 3 },
  { description: "Trip to Goa", amount: 15000, owed: 3750, participants: 4 }
];

const recentActivity = [
  { type: "investment", description: "SIP payment - HDFC Top 100", amount: 5000, date: "Today" },
  { type: "expense", description: "Grocery shopping", amount: -1200, date: "Yesterday" },
  { type: "income", description: "Salary credited", amount: 75000, date: "2 days ago" },
  { type: "split", description: "Dinner bill settled", amount: 600, date: "3 days ago" }
];

export function UserPanel({ isOpen, onClose, user }: UserPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Medium-High": return "bg-orange-100 text-orange-700";
      case "High": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="bills">Split Bills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Portfolio</p>
                    <p className="text-lg font-bold">{formatCurrency(userData.totalInvestment)}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success-light rounded-lg">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Returns</p>
                    <p className="text-lg font-bold text-success">{formatCurrency(userData.totalReturns)}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning-light rounded-lg">
                    <Shield className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Profile</p>
                    <Badge className={getRiskColor(userData.riskProfile)}>{userData.riskProfile}</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Savings Goal Progress */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Savings Goal Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Current Savings</span>
                  <span className="font-medium">{formatCurrency(userData.currentSavings)}</span>
                </div>
                <Progress 
                  value={(userData.currentSavings / userData.savingsGoal) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target: {formatCurrency(userData.savingsGoal)}</span>
                  <span className="font-medium">
                    {((userData.currentSavings / userData.savingsGoal) * 100).toFixed(0)}% achieved
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'investment' ? 'bg-primary-light text-primary' :
                        activity.type === 'income' ? 'bg-success-light text-success' :
                        activity.type === 'expense' ? 'bg-destructive-light text-destructive' :
                        'bg-accent-light text-accent'
                      }`}>
                        {activity.type === 'investment' && <TrendingUp className="w-4 h-4" />}
                        {activity.type === 'income' && <DollarSign className="w-4 h-4" />}
                        {activity.type === 'expense' && <CreditCard className="w-4 h-4" />}
                        {activity.type === 'split' && <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${activity.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                      {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Watchlisted Funds
              </h3>
              <div className="space-y-4">
                {watchlistedFunds.map((fund, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{fund.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRiskColor(fund.risk)} variant="outline">
                          {fund.risk}
                        </Badge>
                        <span className="text-sm text-success font-medium">+{fund.returns}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(fund.amount)}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-xl font-bold text-success">{formatCurrency(budgetOverview.monthlyIncome)}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-xl font-bold text-destructive">{formatCurrency(budgetOverview.monthlyExpenses)}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Monthly Savings</p>
                <p className="text-xl font-bold text-primary">{formatCurrency(budgetOverview.monthlySavings)}</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Budget Categories</h3>
              <div className="space-y-4">
                {budgetOverview.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm">
                        {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                      </span>
                    </div>
                    <Progress value={(category.spent / category.budget) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bills" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Active Split Bills
              </h3>
              <div className="space-y-4">
                {splitBills.map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{bill.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {bill.participants} participants • Total: {formatCurrency(bill.amount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${bill.owed > 0 ? 'text-success' : 'text-destructive'}`}>
                        {bill.owed > 0 ? 'You get: ' : 'You owe: '}
                        {formatCurrency(Math.abs(bill.owed))}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {bill.owed > 0 ? 'Request' : 'Pay'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>SIP Reminders</span>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Price Alerts</span>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Market News</span>
                    <Button variant="outline" size="sm">Off</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-primary" />
                  Export Data
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Portfolio Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="w-4 h-4 mr-2" />
                    Budget Summary
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Split Bills History
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}