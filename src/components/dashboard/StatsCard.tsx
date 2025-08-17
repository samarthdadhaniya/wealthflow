import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
  subtitle?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  subtitle,
  className = ""
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return <TrendingUp className="w-3 h-3" />;
    if (changeType === "negative") return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  return (
    <Card className={`p-6 bg-gradient-card hover:shadow-medium transition-all duration-300 group ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2 mt-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="text-sm font-medium">
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-primary-light rounded-lg group-hover:bg-primary-glow transition-all duration-300">
          <div className="text-primary">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}