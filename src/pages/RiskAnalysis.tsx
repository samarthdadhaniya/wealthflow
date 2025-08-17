import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Target, 
  BarChart3,
  PieChart,
  Activity,
  Calculator,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Download,
  Zap,
  Globe,
  Layers
} from "lucide-react";

// Mock portfolio data
const portfolioData = {
  totalValue: 485000,
  totalInvested: 420000,
  totalReturns: 65000,
  returnPercentage: 15.48,
  riskScore: 7.2,
  sharpeRatio: 1.45,
  beta: 1.12,
  standardDeviation: 18.5,
  maxDrawdown: -12.3,
  var95: -8.2
};

const assetAllocation = [
  { name: "Large Cap Equity", value: 45, returns: 16.2, risk: "Medium", color: "bg-blue-500" },
  { name: "Mid Cap Equity", value: 25, returns: 22.8, risk: "High", color: "bg-green-500" },
  { name: "Small Cap Equity", value: 15, returns: 28.5, risk: "Very High", color: "bg-orange-500" },
  { name: "Debt Funds", value: 10, returns: 7.2, risk: "Low", color: "bg-purple-500" },
  { name: "Gold ETF", value: 5, returns: 12.1, risk: "Medium", color: "bg-yellow-500" }
];

const riskMetrics = [
  { name: "Portfolio Risk Score", value: 7.2, max: 10, description: "Overall risk level", icon: <AlertTriangle className="w-5 h-5" /> },
  { name: "Sharpe Ratio", value: 1.45, max: 3, description: "Risk-adjusted returns", icon: <Target className="w-5 h-5" /> },
  { name: "Beta", value: 1.12, max: 2, description: "Market sensitivity", icon: <Activity className="w-5 h-5" /> },
  { name: "Standard Deviation", value: 18.5, max: 30, description: "Volatility measure", icon: <BarChart3 className="w-5 h-5" /> }
];

const recommendations = [
  {
    type: "warning",
    title: "High Small Cap Exposure",
    description: "Consider reducing small cap allocation to 10% for better risk management",
    action: "Rebalance Portfolio"
  },
  {
    type: "info",
    title: "Add Debt Component",
    description: "Increase debt allocation to 20% to reduce overall portfolio volatility",
    action: "View Debt Funds"
  },
  {
    type: "success",
    title: "Good Diversification",
    description: "Your portfolio is well diversified across asset classes",
    action: "Maintain Current"
  }
];

export default function RiskAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [investmentHorizon, setInvestmentHorizon] = useState([10]);
  const [monthlyInvestment, setMonthlyInvestment] = useState("25000");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isOptimizeOpen, setIsOptimizeOpen] = useState(false);
  const { toast } = useToast();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "High": return "text-orange-600 bg-orange-100";
      case "Very High": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Risk Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive portfolio risk assessment and recommendations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calculator className="w-4 h-4 mr-2" />
                    Risk Calculator
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Risk Calculator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Risk Tolerance (1-10)</Label>
                      <Slider
                        value={riskTolerance}
                        onValueChange={setRiskTolerance}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-sm text-muted-foreground">Current: {riskTolerance[0]}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Investment Horizon (Years)</Label>
                      <Slider
                        value={investmentHorizon}
                        onValueChange={setInvestmentHorizon}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-sm text-muted-foreground">Current: {investmentHorizon[0]} years</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Monthly Investment</Label>
                      <Input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        placeholder="25000"
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        toast({
                          title: "Risk Analysis Complete",
                          description: `Based on your inputs, recommended allocation: ${riskTolerance[0] * 8}% equity, ${100 - (riskTolerance[0] * 8)}% debt`
                        });
                        setIsCalculatorOpen(false);
                      }}
                    >
                      Calculate Risk Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isOptimizeOpen} onOpenChange={setIsOptimizeOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-primary text-white">
                    <Target className="w-4 h-4 mr-2" />
                    Optimize Portfolio
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Portfolio Optimization</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Current Allocation</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Equity</span>
                            <span>85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Debt</span>
                            <span>10%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gold</span>
                            <span>5%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-success-light">
                        <h4 className="font-medium mb-2">Optimized Allocation</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Equity</span>
                            <span>70%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Debt</span>
                            <span>20%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gold</span>
                            <span>10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-primary-light rounded-lg">
                      <h4 className="font-medium mb-2">Optimization Benefits</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Reduced portfolio volatility by 8%</li>
                        <li>• Improved Sharpe ratio from 1.45 to 1.68</li>
                        <li>• Better risk-adjusted returns</li>
                      </ul>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Portfolio Optimized",
                          description: "Your portfolio has been rebalanced for better risk-adjusted returns"
                        });
                        setIsOptimizeOpen(false);
                      }}
                    >
                      Apply Optimization
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-light rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(portfolioData.totalValue)}
                </p>
                <p className="text-xs text-success flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +{portfolioData.returnPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-success-light rounded-lg">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(portfolioData.totalReturns)}
                </p>
                <p className="text-xs text-success">Absolute gains</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-warning-light rounded-lg">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-xl font-bold text-foreground">
                  {portfolioData.riskScore}/10
                </p>
                <p className="text-xs text-warning">Moderate-High</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-accent-light rounded-lg">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                <p className="text-xl font-bold text-foreground">
                  {portfolioData.sharpeRatio}
                </p>
                <p className="text-xs text-success">Good risk-adjusted return</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Risk Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-primary">{metric.icon}</div>
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <span className="font-bold text-primary">{metric.value}</span>
                    </div>
                    <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Asset Allocation */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Asset Allocation & Risk</h3>
              <div className="space-y-4">
                {assetAllocation.map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${asset.color}`}></div>
                        <span className="font-medium">{asset.name}</span>
                        <Badge variant="outline" className={getRiskColor(asset.risk)}>
                          {asset.risk}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{asset.value}%</span>
                        <span className="text-sm text-success ml-2">+{asset.returns}%</span>
                      </div>
                    </div>
                    <Progress value={asset.value} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Detailed Analytics */}
            <Card className="p-6">
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
                  <TabsTrigger value="correlation">Correlation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Annualized Return</label>
                      <div className="text-2xl font-bold text-success">+{portfolioData.returnPercentage}%</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Volatility</label>
                      <div className="text-2xl font-bold text-warning">{portfolioData.standardDeviation}%</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="drawdown" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Drawdown</label>
                      <div className="text-2xl font-bold text-destructive">{portfolioData.maxDrawdown}%</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Value at Risk (95%)</label>
                      <div className="text-2xl font-bold text-destructive">{portfolioData.var95}%</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="correlation" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Portfolio correlation with market indices and risk factors
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Nifty 50</span>
                      <span className="font-medium">0.85</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nifty Midcap</span>
                      <span className="font-medium">0.72</span>
                    </div>
                    <div className="flex justify-between">
                      <span>US Markets</span>
                      <span className="font-medium">0.45</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Score Card */}
            <Card className="p-6 text-center bg-gradient-card">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-8 border-warning/20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-warning">{portfolioData.riskScore}</div>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Portfolio Risk Score</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Moderate-High risk profile with good return potential
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Risk Assessment
              </Button>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Risk Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    rec.type === 'warning' ? 'bg-warning-light border-warning' :
                    rec.type === 'info' ? 'bg-info-light border-info' :
                    'bg-success-light border-success'
                  }`}>
                    <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs opacity-80 mb-2">{rec.description}</p>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Report Generated",
                      description: "Your comprehensive risk analysis report has been generated and will be emailed to you."
                    });
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsOptimizeOpen(true)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-Optimize
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('/knowledge', '_blank')}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Risk Education
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}