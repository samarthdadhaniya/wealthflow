import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">AMC</div>
                  <div className="font-medium">{data.overview.amc}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Scheme</div>
                  <div className="font-medium">{data.overview.scheme_type}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Plan</div>
                  <div className="font-medium capitalize">{data.overview.plan}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last NAV</div>
                  <div className="font-mono">₹{parseFloat(data.overview.last_price).toFixed(4)}</div>
                </div>
              </div>
            </Card>

            {performanceData.length > 0 && (
              <Card className="p-4">
                <div className="mb-3 font-medium">Historical Performance</div>
                {/* <Chart
                  data={performanceData}
                  index="date"
                  categories={["nav"]}
                  colors={["#22c55e"]}
                /> */}
              </Card>
            )}

            {performanceData.length === 0 && (
              <Card className="p-4">
                <div className="mb-1 font-medium">Historical Performance</div>
                <div className="text-sm text-muted-foreground">No performance data available.</div>
              </Card>
            )}

            <Card className="p-4 space-y-3">
              <div className="font-medium">Description & Objectives</div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {data.ai.description}
              </div>
              {data.ai.objectives?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.ai.objectives.map((obj, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{obj}</Badge>
                  ))}
                </div>
              )}
            </Card>

            {data.ai.sectorHoldings?.length > 0 && (
              <Card className="p-4 space-y-3">
                <div className="font-medium">Sector-wise Holdings</div>
                <div className="space-y-2">
                  {data.ai.sectorHoldings.map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{s.sector}</span>
                        <span className="font-medium">{s.percentage}%</span>
                      </div>
                      <Progress value={s.percentage} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {!data.ai.sectorHoldings?.length && (
              <Card className="p-4">
                <div className="font-medium mb-1">Sector-wise Holdings</div>
                <div className="text-sm text-muted-foreground">No sector breakdown available.</div>
              </Card>
            )}

            {data.ai.stats?.length > 0 && (
              <Card className="p-4">
                <div className="font-medium mb-3">Statistical & Analytical Data</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {data.ai.stats.map((m, i) => (
                    <div key={i} className="p-3 rounded border bg-secondary/30">
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                      <div className="font-semibold">{m.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {!data.ai.stats?.length && (
              <Card className="p-4">
                <div className="font-medium mb-1">Statistical & Analytical Data</div>
                <div className="text-sm text-muted-foreground">No statistics available.</div>
              </Card>
            )}

            {data.ai.summaryRecommendation && (
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">AI Summary</div>
                <div className="mt-1 font-medium">{data.ai.summaryRecommendation}</div>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


