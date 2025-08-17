import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MutualFunds from "./pages/MutualFunds";
import Budget from "./pages/Budget";
import Calendar from "./pages/Calendar";
import Knowledge from "./pages/Knowledge";
import RiskAnalysis from "./pages/RiskAnalysis";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading, demoMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthenticated = user || demoMode;

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Index />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Index />} />
        <Route path="/funds" element={isAuthenticated ? <MutualFunds /> : <Index />} />
        <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Index />} />
        <Route path="/budget" element={isAuthenticated ? <Budget /> : <Index />} />
        <Route path="/knowledge" element={isAuthenticated ? <Knowledge /> : <Index />} />
        <Route path="/risk-analysis" element={isAuthenticated ? <RiskAnalysis /> : <Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
