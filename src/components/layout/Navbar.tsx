import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserPanel } from "@/components/user/UserPanel";
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  HelpCircle,
  TrendingUp,
  Shield,
  Zap,
  Menu,
  X,
  Sparkles,
  BarChart3,
  LogOut,
  ChevronDown,
  Calendar,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Investments", href: "/funds", icon: TrendingUp },
  { name: "Budget", href: "/budget", icon: Shield },
  { name: "Risk Analysis", href: "/risk-analysis", icon: Shield },
];

const dropdownItems = [
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Knowledge", href: "/knowledge", icon: BookOpen },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, demoMode } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-display gradient-text">
                  WealthFlow
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Smart Investing
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-primary-light text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Dropdown Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    (isActive("/calendar") || isActive("/knowledge"))
                      ? "bg-primary-light text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                  )}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>More</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isDropdownOpen ? "rotate-180" : ""
                  )} />
                </Button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    {dropdownItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors duration-200",
                            isActive(item.href)
                              ? "bg-primary-light text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                          )}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                </Button>
                
              </div>

              {/* User Profile */}
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setIsUserPanelOpen(true)}
              >
                <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="hidden sm:inline text-sm">
                  {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Samarth'}
                </span>
              </Button>

              {/* Sign Out Button */}
              <Button variant="ghost" size="icon-sm" onClick={handleSignOut} title="Sign Out">
                <LogOut className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="section-padding py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search funds, insights..."
                    className="w-full h-10 pl-10 pr-4 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "bg-primary-light text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile Dropdown Items */}
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "bg-primary-light text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Actions */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>


      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
      
      {/* User Panel */}
      <UserPanel 
        isOpen={isUserPanelOpen} 
        onClose={() => setIsUserPanelOpen(false)} 
        user={user}
      />

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
}