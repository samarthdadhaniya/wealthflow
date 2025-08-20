import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FundCard } from "@/components/funds/FundCard";
import { FundComparison } from "@/components/funds/FundComparison";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Target
} from "lucide-react";
import { useMutualFunds } from "@/hooks/useMutualFunds";

const fundCategories = [
  { name: "All Funds", count: 156 },
  { name: "Large Cap", count: 45 },
  { name: "Mid Cap", count: 32 },
  { name: "Small Cap", count: 28 },
  { name: "Hybrid", count: 25 },
  { name: "Debt", count: 26 }
];

const riskLevels = ["Low", "Medium", "High"];
const durations = ["1+ month", "6+ months", "1+ year", "3+ years", "5+ years"];

export default function MutualFunds() {
  const [selectedCategory, setSelectedCategory] = useState("All Funds");
  const [selectedRisk, setSelectedRisk] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  const { data, isLoading, isError } = useMutualFunds({ page, size });
  const funds = data?.content ?? [];

  const toggleRisk = (risk: string) => {
    setSelectedRisk(prev => 
      prev.includes(risk) 
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDuration(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mutual Fund Explorer
          </h1>
          <p className="text-muted-foreground">
            Discover and compare the best mutual funds for your investment goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search funds by name or type..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-6 bg-gradient-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Risk Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {riskLevels.map(risk => (
                      <Badge
                        key={risk}
                        variant={selectedRisk.includes(risk) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleRisk(risk)}
                      >
                        {risk} Risk
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Investment Duration</h3>
                  <div className="flex flex-wrap gap-2">
                    {durations.map(duration => (
                      <Badge
                        key={duration}
                        variant={selectedDuration.includes(duration) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleDuration(duration)}
                      >
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          {fundCategories.map(category => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="whitespace-nowrap"
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-light rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Performer</p>
                <p className="font-semibold text-foreground">16.8% Returns</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Returns</p>
                <p className="font-semibold text-foreground">12.3% Returns</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning-light rounded-lg">
                <PieChart className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Funds</p>
                <p className="font-semibold text-foreground">{data?.totalElements ?? 0} Available</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-light rounded-lg">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Min Investment</p>
                <p className="font-semibold text-foreground">₹100 onwards</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {selectedCategory} ({data?.numberOfElements ?? 0} funds)
          </h2>
        </div>

        {/* Loading / Error */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading funds...</p>
          </div>
        )}
        {isError && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load funds.</p>
          </div>
        )}

        {/* Fund Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funds.map((fund, index) => (
              <FundCard
                key={index}
                // Provide fallbacks for legacy-required props used in FundCard
                type={fund.scheme_type}
                risk={"Medium"}
                duration={"3+ years"}
                expectedReturn={12}
                minInvestment={parseFloat(fund.minimum_purchase_amount)}
                rating={4}
                nav={parseFloat(fund.last_price)}
                {...fund}
                onCompare={() => {
                  // Comparison relies on legacy allFunds; keeping disabled for server data
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" disabled={data?.first || page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page + 1} of {data?.totalPages ?? 1}
          </div>
          <Button variant="default" disabled={data?.last} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>

        {/* Comparison Modal (hidden for server data as we don't have tags/ratings) */}
        {/* Keeping component mounted but not used with server data */}
        <FundComparison
          isOpen={false}
          onClose={() => {}}
          selectedFund={null as any}
          allFunds={[] as any}
        />
      </div>
    </div>
  );
}