import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Info, Calendar, Shield, Building2 } from "lucide-react";

interface FundCardProps {
  tradingsymbol: string;
  amc: string;
  name: string;
  purchase_allowed: string;
  redemption_allowed: string;
  minimum_purchase_amount: string;
  purchase_amount_multiplier: string;
  minimum_additional_purchase_amount: string;
  minimum_redemption_quantity: string;
  redemption_quantity_multiplier: string;
  dividend_type: string;
  scheme_type: string;
  plan: string;
  settlement_type: string;
  last_price: string;
  last_price_date: string;
  // Legacy fields for compatibility
  type: string;
  risk: "Low" | "Medium" | "High";
  duration: string;
  expectedReturn: number;
  minInvestment: number;
  tags?: string[];
  rating: number;
  nav: number;
  onCompare?: () => void;
  onShowDetails?: (tradingsymbol: string) => void;
}

export function FundCard({
  tradingsymbol,
  amc,
  name,
  purchase_allowed,
  redemption_allowed,
  minimum_purchase_amount,
  minimum_additional_purchase_amount,
  minimum_redemption_quantity,
  dividend_type,
  scheme_type,
  plan,
  settlement_type,
  last_price,
  last_price_date,
  risk,
  expectedReturn,
  tags = [],
  rating,
  onCompare,
  onShowDetails
}: FundCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-success-light text-success border-success/20";
      case "Medium":
        return "bg-warning-light text-warning border-warning/20";
      case "High":
        return "bg-destructive-light text-destructive border-destructive/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatNumber = (value: string) => {
    return parseFloat(value).toLocaleString('en-IN');
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 bg-gradient-card group">
      <div className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{amc}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-mono">{tradingsymbol}</span>
            <span>•</span>
            <span>{scheme_type}</span>
            <span>•</span>
            <span className="capitalize">{plan}</span>
          </div>
        </div>

        {/* Current NAV */}
        <div className="p-4 bg-gradient-subtle rounded-lg border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Current NAV</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  As of {formatDate(last_price_date)}
                </span>
              </div>
            </div>
            <span className="font-mono text-xl font-bold text-primary">
              ₹{parseFloat(last_price).toFixed(4)}
            </span>
          </div>
        </div>

        {/* Trading Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">Purchase</p>
            <Badge className={`text-xs ${
              purchase_allowed === "1" ? "bg-success-light text-success border-success/20" : "bg-destructive-light text-destructive border-destructive/20"
            }`}>
              {purchase_allowed === "1" ? "Open" : "Closed"}
            </Badge>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">Redemption</p>
            <Badge className={`text-xs ${
              redemption_allowed === "1" ? "bg-success-light text-success border-success/20" : "bg-destructive-light text-destructive border-destructive/20"
            }`}>
              {redemption_allowed === "1" ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        {/* Investment Details */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Min Investment</p>
              <span className="text-sm font-semibold">₹{formatNumber(minimum_purchase_amount)}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Additional Min</p>
              <span className="text-sm font-semibold">₹{formatNumber(minimum_additional_purchase_amount)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Expected Return</p>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-success">{expectedReturn}%</span>
                <TrendingUp className="w-3 h-3 text-success" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Settlement</p>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-semibold">{settlement_type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Details */}
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Plan:</span>
              <span className="ml-1 capitalize font-medium">{plan}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="ml-1 capitalize font-medium">{dividend_type}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onCompare}
          >
            <Info className="w-4 h-4 mr-2" />
            Compare Funds
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onShowDetails?.(tradingsymbol)}
          >
            <Info className="w-4 h-4 mr-2" />
            Show Details
          </Button>
        </div>
      </div>
    </Card>
  );
}