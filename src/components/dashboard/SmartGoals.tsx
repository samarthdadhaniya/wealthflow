import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  TrendingUp,
  Calendar,
  DollarSign,
  Home,
  GraduationCap,
  Car,
  Plane
} from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "6 months of expenses",
    target: 500000,
    current: 425000,
    progress: 85,
    deadline: "Dec 2024",
    icon: Target,
    color: "success",
    priority: "high"
  },
  {
    id: 2,
    title: "House Down Payment",
    description: "20% down payment for dream home",
    target: 2000000,
    current: 1340000,
    progress: 67,
    deadline: "Jun 2025",
    icon: Home,
    color: "primary",
    priority: "high"
  },
  {
    id: 3,
    title: "Child's Education",
    description: "Higher education fund",
    target: 1500000,
    current: 450000,
    progress: 30,
    deadline: "Aug 2030",
    icon: GraduationCap,
    color: "accent",
    priority: "medium"
  },
  {
    id: 4,
    title: "Dream Car",
    description: "Luxury car purchase",
    target: 800000,
    current: 120000,
    progress: 15,
    deadline: "Mar 2025",
    icon: Car,
    color: "warning",
    priority: "low"
  }
];

export function SmartGoals() {
  const [activeGoal, setActiveGoal] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-success-light text-success border-success/20";
      case "primary":
        return "bg-primary-light text-primary border-primary/20";
      case "accent":
        return "bg-accent-light text-accent border-accent/20";
      case "warning":
        return "bg-warning-light text-warning border-warning/20";
      default:
        return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-headline text-foreground">Smart Goals</h2>
            <p className="text-caption mt-1">AI-powered goal tracking and recommendations</p>
          </div>
          <Button variant="default" size="sm" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Goal</span>
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isActive = activeGoal === goal.id;
            
            return (
              <div
                key={goal.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-300 cursor-pointer",
                  isActive 
                    ? "border-primary bg-primary-light/50 shadow-lg" 
                    : "border-border hover:border-primary/50 hover:bg-card-hover"
                )}
                onClick={() => setActiveGoal(isActive ? null : goal.id)}
              >
                <div className="space-y-4">
                  {/* Goal Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg border",
                        getColorClasses(goal.color)
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{goal.title}</h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            getPriorityColor(goal.priority)
                          )}>
                            {goal.priority}
                          </span>
                        </div>
                        <p className="text-caption mt-1">{goal.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {goal.progress}%
                      </p>
                      <p className="text-caption">{goal.deadline}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress 
                      value={goal.progress} 
                      className="h-2 bg-secondary"
                    />
                    <div className="flex justify-between text-caption">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isActive && (
                    <div className="mt-4 p-4 bg-background rounded-lg border border-border animate-fade-in">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-caption">Monthly Required</p>
                          <p className="text-sm font-semibold text-foreground">
                            ₹{Math.ceil((goal.target - goal.current) / 12).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-caption">Time Remaining</p>
                          <p className="text-sm font-semibold text-foreground">
                            {Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" className="flex-1">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Increase SIP
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          View Plan
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Insights */}
        <div className="p-4 bg-gradient-to-r from-accent-light to-primary-light rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground">Smart Insight</h4>
              <p className="text-caption mt-1">
                You're on track to achieve 3 out of 4 goals! Consider increasing your 
                Dream Car SIP by ₹8,000/month to stay on schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}