import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Target, 
  Users, 
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  PieChart,
  Calendar,
  Brain,
  Smartphone,
  Award,
  Play
} from "lucide-react";


const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Suggestions",
    description: "Get personalized fund recommendations based on your risk profile and goals"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Assessment",
    description: "Comprehensive risk analysis to match investments with your comfort level"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Goal Tracking",
    description: "Set and monitor your financial goals with smart milestone tracking"
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: "Portfolio Analytics",
    description: "Advanced charts and insights to visualize your investment performance"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "SIP Management",
    description: "Never miss a SIP payment with intelligent calendar reminders"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First",
    description: "Seamlessly manage investments on any device, anywhere, anytime"
  }
];

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "₹250Cr+", label: "Assets Managed" },
  { number: "12.8%", label: "Avg Returns" },
  { number: "4.9★", label: "User Rating" }
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    content: "WealthFlow simplified my investment journey. The AI suggestions are spot-on!",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "Best investment platform I've used. Clean interface and smart recommendations.",
    rating: 5
  },
  {
    name: "Anita Singh",
    role: "Marketing Manager",
    content: "Finally, a platform that makes mutual funds easy to understand and manage.",
    rating: 5
  }
];

const quotes = [
  "Invest in your future, one smart decision at a time",
  "Where intelligence meets investment",
  "Your wealth, simplified and optimized",
  "Building wealth through smart technology"
];

export default function Index() {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">
                Wealth<span className="text-primary">Flow</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-accent rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-success rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-12">
            {/* Hero Content */}
            <div className="space-y-8 max-w-5xl mx-auto">
              <Badge variant="secondary" className="mb-6 glass-card animate-bounce-in">
                <Star className="w-4 h-4 mr-2" />
                #1 Smart Investment Platform in India
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-foreground animate-slide-up">
                Invest Smarter with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                <br />
                Financial Intelligence
              </h1>
              
              <div className="h-8 flex items-center justify-center">
                <p className="text-2xl text-muted-foreground animate-fade-in font-medium">
                  {quotes[currentQuote]}
                </p>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Transform your investment journey with personalized mutual fund recommendations, 
                comprehensive risk analysis, and intelligent portfolio optimization powered by advanced AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Button size="lg" onClick={() => navigate('/auth')} className="group text-lg px-8 py-4">
                  Start Your Investment Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="group text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Interactive Stats with 3D Effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="bg-gradient-card p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow transform hover:-translate-y-2">
                    <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto">
              <div className="glass-card p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 group hover:shadow-glow">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground text-sm">Smart recommendations based on market analysis</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 group hover:shadow-accent-glow">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Risk Assessment</h3>
                <p className="text-muted-foreground text-sm">Comprehensive portfolio risk analysis</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl border border-border/30 hover:border-success/50 transition-all duration-300 group hover:shadow-glow">
                <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Goal Tracking</h3>
                <p className="text-muted-foreground text-sm">Monitor and achieve your financial goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose WealthFlow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of investment management with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about their investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-background/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of smart investors who trust WealthFlow for their financial future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="group"
            >
              Start Your Journey
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">
                Wealth<span className="text-primary">Flow</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2024 WealthFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}