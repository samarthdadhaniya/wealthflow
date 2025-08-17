import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Clock, 
  User,
  TrendingUp,
  Shield,
  Target,
  Calculator,
  ArrowRight,
  Star
} from "lucide-react";

const categories = [
  { name: "All Articles", count: 45, active: true },
  { name: "Mutual Funds", count: 18 },
  { name: "SIP Guide", count: 12 },
  { name: "Tax Saving", count: 8 },
  { name: "Goal Planning", count: 7 }
];

const featuredArticles = [
  {
    title: "Complete Guide to SIP Investing",
    excerpt: "Learn everything about Systematic Investment Plans and how they can help you build wealth over time.",
    readTime: "8 min read",
    author: "Financial Expert",
    category: "SIP Guide",
    rating: 4.8,
    views: "12.5K",
    featured: true
  },
  {
    title: "Understanding Risk vs Return in Mutual Funds",
    excerpt: "A comprehensive guide to balancing risk and return in your mutual fund portfolio.",
    readTime: "6 min read", 
    author: "Investment Advisor",
    category: "Mutual Funds",
    rating: 4.6,
    views: "8.2K",
    featured: true
  }
];

const articles = [
  {
    title: "How to Choose the Right Mutual Fund",
    excerpt: "Key factors to consider when selecting mutual funds for your investment portfolio.",
    readTime: "5 min read",
    author: "Portfolio Manager",
    category: "Mutual Funds",
    rating: 4.7,
    views: "6.8K"
  },
  {
    title: "Tax Saving Strategies with ELSS Funds",
    excerpt: "Maximize your tax savings while building wealth with Equity Linked Savings Schemes.",
    readTime: "7 min read",
    author: "Tax Advisor", 
    category: "Tax Saving",
    rating: 4.5,
    views: "5.4K"
  },
  {
    title: "Building an Emergency Fund: Step by Step Guide",
    excerpt: "Create a robust emergency fund to protect yourself from financial uncertainties.",
    readTime: "4 min read",
    author: "Financial Planner",
    category: "Goal Planning", 
    rating: 4.6,
    views: "9.1K"
  },
  {
    title: "Dollar Cost Averaging vs Lump Sum Investment",
    excerpt: "Compare different investment strategies and find what works best for your situation.",
    readTime: "6 min read",
    author: "Investment Strategist",
    category: "SIP Guide",
    rating: 4.4,
    views: "4.7K"
  },
  {
    title: "Retirement Planning in Your 20s and 30s",
    excerpt: "Start your retirement planning early and secure your financial future.",
    readTime: "9 min read",
    author: "Retirement Specialist",
    category: "Goal Planning",
    rating: 4.8,
    views: "7.3K"
  },
  {
    title: "Understanding NAV and How it Affects Your Returns",
    excerpt: "Learn about Net Asset Value and its impact on your mutual fund investments.",
    readTime: "5 min read",
    author: "Fund Analyst",
    category: "Mutual Funds",
    rating: 4.3,
    views: "3.9K"
  }
];

const quickTools = [
  {
    title: "SIP Calculator",
    description: "Calculate potential returns from your SIP investments",
    icon: <Calculator className="w-6 h-6" />,
    color: "bg-primary-light text-primary"
  },
  {
    title: "Goal Planner",
    description: "Plan and track your financial goals",
    icon: <Target className="w-6 h-6" />,
    color: "bg-success-light text-success"
  },
  {
    title: "Risk Profiler",
    description: "Assess your risk tolerance for better investment decisions",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-warning-light text-warning"
  }
];

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Knowledge Center
          </h1>
          <p className="text-muted-foreground">
            Learn about investments, mutual funds, and financial planning
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          {categories.map(category => (
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Articles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article, index) => (
                  <Card key={index} className="p-6 bg-gradient-card hover:shadow-medium transition-all duration-300 group">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="text-sm text-muted-foreground">{article.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{article.author}</span>
                          </div>
                        </div>
                        <span>{article.views} views</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Articles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">All Articles</h2>
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <Card key={index} className="p-6 bg-gradient-card hover:shadow-soft transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-light rounded-lg group-hover:bg-primary-glow transition-all">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span className="text-sm text-muted-foreground">{article.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{article.author}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tools */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4">Quick Tools</h3>
              <div className="space-y-3">
                {quickTools.map((tool, index) => (
                  <div key={index} className="p-4 bg-secondary rounded-lg hover:shadow-soft transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Topics */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {[
                  "SIP Investment Strategy",
                  "Tax Saving Tips",
                  "Emergency Fund Planning",
                  "Retirement Planning",
                  "Risk Management",
                  "Portfolio Diversification"
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
                    <span className="text-sm text-foreground hover:text-primary transition-colors">
                      {topic}
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter Signup */}
            <Card className="p-6 bg-gradient-primary text-white">
              <div className="text-center space-y-4">
                <TrendingUp className="w-8 h-8 mx-auto" />
                <h3 className="font-semibold text-lg">Stay Updated</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Get weekly insights and tips delivered to your inbox
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}