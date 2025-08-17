import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { SmartGoals } from "@/components/dashboard/SmartGoals";
import { FundCard } from "@/components/funds/FundCard";
import { useAuth } from "@/hooks/useAuth";
import { useGoals } from "@/hooks/useGoals";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Target,
  ArrowRight,
  Calendar,
  Bell,
  BarChart3
} from "lucide-react";

const stats = [
  {
    title: "Total Investment",
    value: "₹2,45,000",
    change: 12.5,
    changeType: "positive" as const,
    icon: <DollarSign className="w-5 h-5" />,
    subtitle: "Across 8 mutual funds"
  },
  {
    title: "Current Value",
    value: "₹2,78,650",
    change: 8.2,
    changeType: "positive" as const,
    icon: <TrendingUp className="w-5 h-5" />,
    subtitle: "Total portfolio value"
  },
  {
    title: "Monthly SIP",
    value: "₹15,000",
    change: 0,
    changeType: "neutral" as const,
    icon: <Target className="w-5 h-5" />,
    subtitle: "Active investments"
  },
  {
    title: "Goals Progress",
    value: "67%",
    change: 15.3,
    changeType: "positive" as const,
    icon: <PieChart className="w-5 h-5" />,
    subtitle: "3 of 5 goals on track"
  }
];

const topFunds = [
  {
    tradingsymbol: "INF077A01024",
    amc: "AXIS MUTUAL FUND",
    name: "Axis Bluechip Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "500.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "500.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "54.2314",
    last_price_date: "2025-08-05",
    type: "Large Cap Equity",
    risk: "Medium" as const,
    duration: "3+ years",
    expectedReturn: 12.8,
    minInvestment: 500,
    tags: ["Top Performing", "Tax Saver"],
    rating: 4.5,
    nav: 54.23
  },
  {
    tradingsymbol: "INF179K01158",
    amc: "HDFC MUTUAL FUND",
    name: "HDFC Small Cap Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "1000.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "1000.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "89.6789",
    last_price_date: "2025-08-05",
    type: "Small Cap Equity", 
    risk: "High" as const,
    duration: "5+ years",
    expectedReturn: 15.2,
    minInvestment: 1000,
    tags: ["High Growth", "Trending Now"],
    rating: 4.2,
    nav: 89.67
  },
  {
    tradingsymbol: "INF200K01212",
    amc: "SBI MUTUAL FUND",
    name: "SBI Liquid Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "100.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "100.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Debt",
    plan: "regular",
    settlement_type: "T1",
    last_price: "4567.8912",
    last_price_date: "2025-08-05",
    type: "Liquid Fund",
    risk: "Low" as const,
    duration: "1+ month",
    expectedReturn: 6.5,
    minInvestment: 100,
    tags: ["Low Risk", "Emergency Fund"],
    rating: 4.0,
    nav: 4567.89
  }
];

const recentAlerts = [
  {
    title: "SIP Due Tomorrow",
    description: "Axis Bluechip Fund - ₹5,000",
    time: "2 hours ago",
    type: "reminder"
  },
  {
    title: "Goal Achievement",
    description: "Emergency Fund: 85% completed",
    time: "1 day ago", 
    type: "success"
  },
  {
    title: "Market Update",
    description: "Large cap funds showing strong performance",
    time: "2 days ago",
    type: "info"
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const { user, demoMode } = useAuth();
  const { goals, addGoal } = useGoals();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateGoal = () => {
    navigate('/goals');
    toast({
      title: "Goal Creation",
      description: "Redirecting to goal creation page...",
    });
  };

  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  const handleManageBudget = () => {
    navigate('/budget');
  };

  const handleFundCompare = (fundName: string) => {
    toast({
      title: "Fund Comparison",
      description: `Added ${fundName} to comparison list`,
    });
  };

  const handleFundInvest = (fundName: string) => {
    toast({
      title: "Investment Started",
      description: `Setting up investment in ${fundName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Investor'}
                {demoMode && <span className="text-accent ml-2">(Demo)</span>}
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your investment overview for today
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {["1W", "1M", "3M", "1Y"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Chart */}
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>

          {/* Smart Goals */}
          <div>
            <SmartGoals />
          </div>
        </div>

        {/* Top Recommended Funds */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Recommended for You
            </h2>
            <Button variant="outline">
              View All Funds
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFunds.map((fund, index) => (
              <FundCard
                key={index}
                {...fund}
                onCompare={() => handleFundCompare(fund.name)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-primary text-white hover:shadow-glow transition-all duration-300">
            <Target className="w-8 h-8 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Set New Goal</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Create investment goals and track progress
            </p>
            <Button variant="secondary" size="sm" onClick={handleCreateGoal}>
              Create Goal
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-success text-white hover:shadow-glow transition-all duration-300">
            <Calendar className="w-8 h-8 mb-4" />
            <h3 className="font-semibold text-lg mb-2">SIP Calendar</h3>
            <p className="text-success-foreground/80 text-sm mb-4">
              View upcoming SIP dates and manage investments
            </p>
            <Button variant="secondary" size="sm" onClick={handleViewCalendar}>
              View Calendar
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-medium transition-all duration-300">
            <PieChart className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-foreground">Budget Tracker</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Track expenses and manage your budget
            </p>
            <Button size="sm" className="bg-gradient-primary text-white" onClick={handleManageBudget}>
              Manage Budget
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}