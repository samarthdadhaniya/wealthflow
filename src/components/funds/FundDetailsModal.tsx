import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Shield, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";
// import { Chart } from "@/components/ui/chart";
import type { MutualFundDetailsResponse } from "@/services/mutualFundsService";

interface FundDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: MutualFundDetailsResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

export function FundDetailsModal({ isOpen, onClose, data, isLoading, error }: FundDetailsModalProps) {
  const performanceData = useMemo(() => {
    if (!data?.ai?.historicalPerformance) return [] as { date: string; nav: number }[];
    return data.ai.historicalPerformance.map(p => ({ date: p.date, nav: p.nav }));
  }, [data]);

  const getRiskLevel = (schemeType: string) => {
    if (schemeType.toLowerCase().includes('equity')) {
      return { level: 'High', color: 'text-red-600', icon: AlertTriangle };
    } else if (schemeType.toLowerCase().includes('debt')) {
      return { level: 'Low', color: 'text-green-600', icon: CheckCircle };
    } else if (schemeType.toLowerCase().includes('hybrid')) {
      return { level: 'Medium', color: 'text-yellow-600', icon: Shield };
    }
    return { level: 'Medium', color: 'text-gray-600', icon: Info };
  };

  const getInvestmentHorizon = (schemeType: string) => {
    if (schemeType.toLowerCase().includes('equity')) {
      return '5+ years';
    } else if (schemeType.toLowerCase().includes('debt')) {
      return '1-3 years';
    } else if (schemeType.toLowerCase().includes('hybrid')) {
      return '3-5 years';
    }
    return 'Consult advisor';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {data?.overview?.name ?? "Fund Details"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="py-8 text-center text-muted-foreground">Loading details…</div>
        )}

        {!isLoading && error && (
          <div className="py-4 text-destructive text-sm">{error}</div>
        )}

        {!isLoading && data && (
          <div className="space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Fund Overview Card */}
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">AMC</div>
                  <div className="font-semibold text-sm">{data.overview.amc}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Scheme</div>
                  <div className="font-semibold text-sm">{data.overview.scheme_type}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Plan</div>
                  <div className="font-semibold text-sm capitalize">{data.overview.plan}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Current NAV</div>
                  <div className="font-mono text-lg font-bold text-green-600">₹{parseFloat(data.overview.last_price).toFixed(4)}</div>
                  <div className="text-xs text-muted-foreground">{data.overview.last_price_date}</div>
                </div>
              </div>
            </Card>

            {/* Investment Decision Summary */}
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Investment Decision Summary</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {data.ai.summaryRecommendation || "This fund offers diversified investment opportunities based on its mandate and investment strategy."}
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk & Suitability Analysis */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  {(() => {
                    const riskInfo = getRiskLevel(data.overview.scheme_type);
                    const Icon = riskInfo.icon;
                    return (
                      <>
                        <Icon className={`w-5 h-5 ${riskInfo.color}`} />
                        <h3 className="font-semibold">Risk Assessment</h3>
                      </>
                    );
                  })()}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Level:</span>
                    <span className={`font-semibold ${getRiskLevel(data.overview.scheme_type).color}`}>
                      {getRiskLevel(data.overview.scheme_type).level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Suitable for:</span>
                    <span className="font-semibold text-sm">
                      {data.overview.scheme_type.toLowerCase().includes('equity') ? 'Aggressive Investors' : 
                       data.overview.scheme_type.toLowerCase().includes('debt') ? 'Conservative Investors' : 
                       'Moderate Investors'}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Investment Horizon</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Recommended Period:</span>
                    <span className="font-semibold text-blue-600">
                      {getInvestmentHorizon(data.overview.scheme_type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Investment Type:</span>
                    <span className="font-semibold text-sm">
                      {data.overview.scheme_type.toLowerCase().includes('equity') ? 'Long-term Growth' : 
                       data.overview.scheme_type.toLowerCase().includes('debt') ? 'Income Generation' : 
                       'Balanced Approach'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance & Analytics */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Performance Analytics</h3>
              </div>
              
              {performanceData.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">NAV Trend (Last 12 Months)</div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between text-sm">
                      <span>12 months ago: ₹{performanceData[0]?.nav.toFixed(4)}</span>
                      <span>Current: ₹{performanceData[performanceData.length - 1]?.nav.toFixed(4)}</span>
                    </div>
                    <div className="mt-2">
                      <div className={`text-sm font-semibold ${
                        (performanceData[performanceData.length - 1]?.nav || 0) > (performanceData[0]?.nav || 0) ? 
                        'text-green-600' : 'text-red-600'
                      }`}>
                        {((((performanceData[performanceData.length - 1]?.nav || 0) - (performanceData[0]?.nav || 0)) / (performanceData[0]?.nav || 1)) * 100).toFixed(2)}% 
                        {(performanceData[performanceData.length - 1]?.nav || 0) > (performanceData[0]?.nav || 0) ? ' Growth' : ' Decline'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Performance data will be updated soon.</div>
              )}
            </Card>

            {/* Fund Description & Objectives */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Fund Strategy & Objectives</h3>
              <div className="text-sm text-muted-foreground leading-relaxed mb-3">
                {data.ai.description}
              </div>
              {data.ai.objectives?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Objectives:</div>
                  <div className="flex flex-wrap gap-2">
                    {data.ai.objectives.map((obj, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        {obj}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Portfolio Composition */}
            {data.ai.sectorHoldings?.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Portfolio Composition</h3>
                <div className="space-y-3">
                  {data.ai.sectorHoldings.map((s, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{s.sector}</span>
                        <span className="font-semibold text-blue-600">{s.percentage}%</span>
                      </div>
                      <Progress value={s.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Key Statistics */}
            {data.ai.stats?.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Key Investment Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data.ai.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 border">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                      <div className="font-bold text-lg mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


