import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Activity,
  Zap,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const portfolioData = [
  { month: 'Jan', value: 245000, growth: 2.3 },
  { month: 'Feb', value: 251000, growth: 2.4 },
  { month: 'Mar', value: 258000, growth: 2.8 },
  { month: 'Apr', value: 267000, growth: 3.5 },
  { month: 'May', value: 274000, growth: 2.6 },
  { month: 'Jun', value: 285000, growth: 4.0 },
  { month: 'Jul', value: 295000, growth: 3.5 },
  { month: 'Aug', value: 302000, growth: 2.4 },
  { month: 'Sep', value: 315000, growth: 4.3 },
  { month: 'Oct', value: 328000, growth: 4.1 },
  { month: 'Nov', value: 342000, growth: 4.3 },
  { month: 'Dec', value: 358000, growth: 4.7 },
];

const performanceMetrics = [
  { 
    label: "Total Returns", 
    value: "+46.1%", 
    change: "+2.4%",
    changeType: "positive",
    icon: TrendingUp 
  },
  { 
    label: "Monthly Growth", 
    value: "+4.7%", 
    change: "+0.4%",
    changeType: "positive",
    icon: Activity 
  },
  { 
    label: "Risk Score", 
    value: "7.2/10", 
    change: "-0.2",
    changeType: "negative",
    icon: Zap 
  },
];

export function PortfolioChart() {
  const [activeTab, setActiveTab] = useState("6M");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground">{`${label} 2024`}</p>
          <p className="text-sm text-primary">
            {`Value: ₹${payload[0].value.toLocaleString('en-IN')}`}
          </p>
          <p className="text-sm text-accent">
            {`Growth: +${payload[0].payload.growth}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gradient-card card-interactive">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-headline text-foreground">
              Portfolio Performance
            </h2>
            <p className="text-caption mt-1">
              Real-time portfolio analytics and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {["1M", "3M", "6M", "1Y", "ALL"].map((period) => (
              <Button
                key={period}
                variant={activeTab === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(period)}
                className="text-xs px-3 py-1.5"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label}
                className={cn(
                  "p-4 rounded-lg border border-border bg-secondary/50 transition-all duration-300",
                  isAnimated ? "animate-fade-in" : "opacity-0"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption">{metric.label}</p>
                    <p className="text-title font-bold mt-1">{metric.value}</p>
                  </div>
                  <div className={cn(
                    "p-2 rounded-lg",
                    metric.changeType === "positive" 
                      ? "bg-success-light" 
                      : "bg-destructive-light"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      metric.changeType === "positive" 
                        ? "text-success" 
                        : "text-destructive"
                    )} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className={cn(
                    "text-xs font-medium",
                    metric.changeType === "positive" 
                      ? "text-success" 
                      : "text-destructive"
                  )}>
                    {metric.change}
                  </span>
                  <span className="text-caption ml-1">vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Chart */}
        <div className="relative">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(214 100% 59%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(214 100% 59%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(220 9% 46%)" }}
                />
                <YAxis 
                  hide
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(214 100% 59%)"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={{ fill: "hsl(214 100% 59%)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(214 100% 59%)", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Overlay Controls */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <Button variant="glass" size="icon-sm">
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button variant="glass" size="icon-sm">
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4"
          >
            <div className="text-left">
              <p className="font-medium text-sm">Rebalance Portfolio</p>
              <p className="text-caption">Optimize your investments</p>
            </div>
          </Button>
          <Button 
            variant="accent" 
            className="justify-start h-auto p-4"
          >
            <div className="text-left">
              <p className="font-medium text-sm">Add Investment</p>
              <p className="text-caption text-accent-foreground/80">Increase SIP amount</p>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}