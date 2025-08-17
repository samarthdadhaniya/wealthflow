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

const allFunds = [
  {
    tradingsymbol: "INF00XX01135",
    amc: "ITI MUTUAL FUND_MF",
    name: "ITI Multi Cap Fund",
    purchase_allowed: "0",
    redemption_allowed: "1",
    minimum_purchase_amount: "1000.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "1000.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "23.2105",
    last_price_date: "2025-08-05",
    // Legacy fields for compatibility
    type: "Multi Cap Equity",
    risk: "Medium" as const,
    duration: "3+ years",
    expectedReturn: 12.8,
    minInvestment: 1000,
    tags: ["Growth Fund", "Multi Cap"],
    rating: 4.2,
    nav: 23.21
  },
  {
    tradingsymbol: "INF077A01024",
    amc: "AXIS MUTUAL FUND",
    name: "Axis Bluechip Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "500.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "500.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "54.2314",
    last_price_date: "2025-08-05",
    type: "Large Cap Equity",
    risk: "Medium" as const,
    duration: "3+ years",
    expectedReturn: 12.8,
    minInvestment: 500,
    tags: ["Top Performing", "Tax Saver"],
    rating: 4.5,
    nav: 54.23
  },
  {
    tradingsymbol: "INF179K01158",
    amc: "HDFC MUTUAL FUND",
    name: "HDFC Small Cap Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "1000.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "1000.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "89.6789",
    last_price_date: "2025-08-05",
    type: "Small Cap Equity", 
    risk: "High" as const,
    duration: "5+ years",
    expectedReturn: 15.2,
    minInvestment: 1000,
    tags: ["High Growth", "Trending Now"],
    rating: 4.2,
    nav: 89.67
  },
  {
    tradingsymbol: "INF200K01212",
    amc: "SBI MUTUAL FUND",
    name: "SBI Liquid Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "100.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "100.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Debt",
    plan: "regular",
    settlement_type: "T1",
    last_price: "4567.8912",
    last_price_date: "2025-08-05",
    type: "Liquid Fund",
    risk: "Low" as const,
    duration: "1+ month",
    expectedReturn: 6.5,
    minInvestment: 100,
    tags: ["Low Risk", "Emergency Fund"],
    rating: 4.0,
    nav: 4567.89
  },
  {
    tradingsymbol: "INF109K01319",
    amc: "ICICI PRUDENTIAL MUTUAL FUND",
    name: "ICICI Prudential Balanced Advantage Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "1000.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "1000.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Hybrid",
    plan: "regular",
    settlement_type: "T2",
    last_price: "45.7823",
    last_price_date: "2025-08-05",
    type: "Hybrid Fund",
    risk: "Medium" as const,
    duration: "3+ years",
    expectedReturn: 10.5,
    minInvestment: 1000,
    tags: ["Balanced", "Conservative"],
    rating: 4.1,
    nav: 45.78
  },
  {
    tradingsymbol: "INF090I01239",
    amc: "MIRAE ASSET MUTUAL FUND",
    name: "Mirae Asset Large Cap Fund",
    purchase_allowed: "1",
    redemption_allowed: "1",
    minimum_purchase_amount: "500.0",
    purchase_amount_multiplier: "1.0",
    minimum_additional_purchase_amount: "500.0",
    minimum_redemption_quantity: "0.001",
    redemption_quantity_multiplier: "0.001",
    dividend_type: "growth",
    scheme_type: "Equity",
    plan: "regular",
    settlement_type: "T2",
    last_price: "76.4512",
    last_price_date: "2025-08-05",
    type: "Large Cap Equity",
    risk: "Medium" as const,
    duration: "3+ years",
    expectedReturn: 11.8,
    minInvestment: 500,
    tags: ["Consistent", "Top Rated"],
    rating: 4.3,
    nav: 76.45
  }
];

export default function MutualFunds() {
  const [selectedCategory, setSelectedCategory] = useState("All Funds");
  const [selectedRisk, setSelectedRisk] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedFundForComparison, setSelectedFundForComparison] = useState<typeof allFunds[0] | null>(null);

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

  const filteredFunds = allFunds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fund.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = selectedRisk.length === 0 || selectedRisk.includes(fund.risk);
    const matchesDuration = selectedDuration.length === 0 || selectedDuration.includes(fund.duration);
    const matchesCategory = selectedCategory === "All Funds" || 
                           fund.type.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesRisk && matchesDuration && matchesCategory;
  });

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
                <p className="font-semibold text-foreground">{filteredFunds.length} Available</p>
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
            {selectedCategory} ({filteredFunds.length} funds)
          </h2>
        </div>

        {/* Fund Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunds.map((fund, index) => (
            <FundCard
              key={index}
              {...fund}
              onCompare={() => {
                setSelectedFundForComparison(fund);
                setShowComparison(true);
              }}
            />
          ))}
        </div>

        {/* Fund Comparison Modal */}
        <FundComparison
          isOpen={showComparison}
          onClose={() => {
            setShowComparison(false);
            setSelectedFundForComparison(null);
          }}
          selectedFund={selectedFundForComparison}
          allFunds={allFunds}
        />

        {filteredFunds.length === 0 && (
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No funds found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}