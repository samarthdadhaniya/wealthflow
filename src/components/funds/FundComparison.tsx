import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Star, TrendingUp, Target, Clock, Shield, AlertCircle, CheckCircle, Info, Brain } from "lucide-react";

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

  // AI-powered comparison insights
  const generateComparisonInsights = () => {
    if (fundsToShow.length < 2) return null;
    
    const insights = [];
    
    // Risk comparison
    const riskLevels = fundsToShow.map(fund => {
      if (fund.scheme_type.toLowerCase().includes('equity')) return 3;
      if (fund.scheme_type.toLowerCase().includes('debt')) return 1;
      return 2;
    });
    
    const maxRiskIdx = riskLevels.indexOf(Math.max(...riskLevels));
    const minRiskIdx = riskLevels.indexOf(Math.min(...riskLevels));
    
    if (maxRiskIdx !== minRiskIdx) {
      insights.push({
        type: 'risk',
        message: `${fundsToShow[maxRiskIdx].name} has the highest risk profile, while ${fundsToShow[minRiskIdx].name} is more conservative.`,
        icon: AlertCircle,
        color: 'text-orange-600'
      });
    }
    
    // NAV comparison
    const navs = fundsToShow.map(fund => parseFloat(fund.last_price));
    const maxNavIdx = navs.indexOf(Math.max(...navs));
    const minNavIdx = navs.indexOf(Math.min(...navs));
    
    insights.push({
      type: 'nav',
      message: `${fundsToShow[maxNavIdx].name} has the highest current NAV at ₹${navs[maxNavIdx].toFixed(4)}, while ${fundsToShow[minNavIdx].name} has the lowest at ₹${navs[minNavIdx].toFixed(4)}.`,
      icon: TrendingUp,
      color: 'text-green-600'
    });
    
    // Investment amount comparison
    const minInvestments = fundsToShow.map(fund => parseFloat(fund.minimum_purchase_amount));
    const lowestMinIdx = minInvestments.indexOf(Math.min(...minInvestments));
    
    if (Math.max(...minInvestments) > Math.min(...minInvestments)) {
      insights.push({
        type: 'investment',
        message: `${fundsToShow[lowestMinIdx].name} has the lowest minimum investment requirement at ₹${minInvestments[lowestMinIdx].toLocaleString('en-IN')}.`,
        icon: Target,
        color: 'text-blue-600'
      });
    }
    
    // Scheme type recommendation
    const schemeTypes = [...new Set(fundsToShow.map(fund => fund.scheme_type))];
    if (schemeTypes.length > 1) {
      insights.push({
        type: 'diversification',
        message: `You're comparing different investment strategies: ${schemeTypes.join(', ')}. Consider your risk tolerance and investment horizon.`,
        icon: Shield,
        color: 'text-purple-600'
      });
    }
    
    return insights;
  };

  const comparisonInsights = generateComparisonInsights();

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

          {/* AI Comparison Insights */}
          {comparisonInsights && comparisonInsights.length > 0 && (
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">AI Comparison Insights</h3>
              </div>
              <div className="space-y-3">
                {comparisonInsights.map((insight, idx) => {
                  const Icon = insight.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <Icon className={`w-5 h-5 ${insight.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  );
                })}
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

              {/* Investment Recommendation Summary */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base text-foreground border-b pb-2">Investment Recommendations</h4>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${fundsToShow.length}, 1fr)` }}>
                  {fundsToShow.map((fund, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-sm text-center">{fund.name}</h5>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            {fund.scheme_type.toLowerCase().includes('equity') ? (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            ) : fund.scheme_type.toLowerCase().includes('debt') ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Shield className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="font-medium">
                              {fund.scheme_type.toLowerCase().includes('equity') ? 'High Growth Potential' :
                               fund.scheme_type.toLowerCase().includes('debt') ? 'Stable Income Focus' :
                               'Balanced Approach'}
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            <strong>Best for:</strong> {' '}
                            {fund.scheme_type.toLowerCase().includes('equity') ? 
                              'Long-term wealth creation, SIP investors with 5+ year horizon' :
                             fund.scheme_type.toLowerCase().includes('debt') ? 
                              'Conservative investors seeking regular income' :
                              'Balanced portfolios with moderate risk appetite'}
                          </div>
                          <div className="text-muted-foreground">
                            <strong>Min Investment:</strong> ₹{parseFloat(fund.minimum_purchase_amount).toLocaleString('en-IN')}
                          </div>
                          <div className="pt-2 border-t">
                            <Badge 
                              className={`text-xs ${
                                fund.purchase_allowed === '1' ? 
                                'bg-green-100 text-green-800' : 
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {fund.purchase_allowed === '1' ? '✓ Available for Purchase' : '✗ Purchase Closed'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}