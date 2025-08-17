import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Star, TrendingUp, Target, Clock, Shield } from "lucide-react";

interface Fund {
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
}

interface FundComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFund: Fund | null;
  allFunds: Fund[];
}

export function FundComparison({ isOpen, onClose, selectedFund, allFunds }: FundComparisonProps) {
  const [compareWith, setCompareWith] = useState<Fund[]>([]);

  if (!selectedFund) return null;

  const availableFunds = allFunds.filter(fund => 
    fund.name !== selectedFund.name && 
    !compareWith.some(cf => cf.name === fund.name)
  );

  const addToComparison = (fund: Fund) => {
    if (compareWith.length < 2) {
      setCompareWith([...compareWith, fund]);
    }
  };

  const removeFromComparison = (fundToRemove: Fund) => {
    setCompareWith(compareWith.filter(fund => fund.name !== fundToRemove.name));
  };

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

  const fundsToShow = [selectedFund, ...compareWith];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Compare Mutual Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Fund Selection */}
          {compareWith.length < 2 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">
                Select {compareWith.length === 0 ? "up to 2 funds" : "1 more fund"} to compare with {selectedFund.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                {availableFunds.map((fund, index) => (
                  <Card 
                    key={index} 
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToComparison(fund)}
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{fund.name}</h4>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getRiskColor(fund.risk)} text-xs`}>
                          {fund.risk}
                        </Badge>
                        <span className="text-xs text-success font-semibold">
                          {fund.expectedReturn}%
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

            {/* Comparison Table */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Fund Comparison</h3>
              
              {/* Fund Headers - Fixed Height Cards */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${fundsToShow.length}, 1fr)` }}>
                {fundsToShow.map((fund, index) => (
                  <Card key={index} className="p-4 bg-gradient-card min-h-[140px] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2">{fund.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{fund.amc}</p>
                          <p className="text-xs text-muted-foreground font-mono">{fund.tradingsymbol}</p>
                        </div>
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 flex-shrink-0"
                            onClick={() => removeFromComparison(fund)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{fund.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {fund.scheme_type} • {fund.plan}
                        </div>
                      </div>
                    </div>
                    
                    <Badge className={`text-xs w-fit mt-2 ${
                      fund.purchase_allowed === "1" ? "bg-success-light text-success border-success/20" : "bg-destructive-light text-destructive border-destructive/20"
                    }`}>
                      {fund.purchase_allowed === "1" ? "Purchase Open" : "Purchase Closed"}
                    </Badge>
                  </Card>
                ))}
              </div>

            {/* Comparison Metrics - Organized Sections */}
            <div className="space-y-8">
              
              {/* NAV & Performance Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base text-foreground border-b pb-2">NAV & Performance</h4>
                
                {/* Current NAV */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground flex items-center">
                      Current NAV
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-mono text-xl font-bold text-primary">
                          ₹{parseFloat(fund.last_price).toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(fund.last_price_date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Return */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Expected Return
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xl font-bold text-success">
                          {fund.expectedReturn}%
                        </div>
                        <div className="text-xs text-muted-foreground">per annum</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Investment Details Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base text-foreground border-b pb-2">Investment Requirements</h4>
                
                {/* Minimum Investment */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Minimum Investment
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-bold text-foreground">
                          ₹{parseFloat(fund.minimum_purchase_amount).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Multiplier: ₹{parseFloat(fund.purchase_amount_multiplier).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Investment */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">
                      Additional Investment
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-bold text-foreground">
                          ₹{parseFloat(fund.minimum_additional_purchase_amount).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-muted-foreground">minimum</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trading Status Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base text-foreground border-b pb-2">Trading Status</h4>
                
                {/* Purchase Status */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Purchase Status
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index}>
                        <Badge className={`text-sm font-medium ${
                          fund.purchase_allowed === "1" ? "bg-success-light text-success border-success/20" : "bg-destructive-light text-destructive border-destructive/20"
                        }`}>
                          {fund.purchase_allowed === "1" ? "✓ Open" : "✗ Closed"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Redemption Status */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">
                      Redemption Status
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index}>
                        <Badge className={`text-sm font-medium ${
                          fund.redemption_allowed === "1" ? "bg-success-light text-success border-success/20" : "bg-destructive-light text-destructive border-destructive/20"
                        }`}>
                          {fund.redemption_allowed === "1" ? "✓ Open" : "✗ Closed"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fund Details Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base text-foreground border-b pb-2">Fund Information</h4>
                
                {/* Scheme Type & Plan */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">
                      Scheme & Plan
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-semibold text-foreground">{fund.scheme_type}</div>
                        <div className="text-sm text-muted-foreground capitalize">{fund.plan} plan</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dividend Type & Settlement */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">
                      Type & Settlement
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-semibold text-foreground capitalize">{fund.dividend_type}</div>
                        <div className="text-sm text-muted-foreground">{fund.settlement_type} settlement</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Redemption Details */}
                <div className="bg-gradient-subtle p-4 rounded-lg">
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">
                      Redemption Details
                    </div>
                    {fundsToShow.map((fund, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-semibold text-foreground">
                          {fund.minimum_redemption_quantity} units
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Multiplier: {fund.redemption_quantity_multiplier}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features Section */}
              {fundsToShow.some(fund => fund.tags && fund.tags.length > 0) && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-base text-foreground border-b pb-2">Features & Tags</h4>
                  <div className="bg-gradient-subtle p-4 rounded-lg">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${fundsToShow.length}, 1fr)` }}>
                      <div className="font-medium text-muted-foreground">
                        Special Features
                      </div>
                      {fundsToShow.map((fund, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {fund.tags && fund.tags.length > 0 ? (
                              fund.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">No special tags</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}