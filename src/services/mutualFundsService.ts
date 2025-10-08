export interface MutualFund {
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
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface PaginatedResponse {
  size: number;
  last: boolean;
  numberOfElements: number;
  totalPages: number;
  page: number;
  content: MutualFund[];
  first: boolean;
  totalElements: number;
}

// Detailed fund + AI insights
export interface MutualFundDetailsOverview {
  tradingsymbol: string;
  name: string;
  amc: string;
  scheme_type: string;
  plan: string;
  last_price: string;
  last_price_date: string;
}

export interface HistoricalPerformancePoint {
  date: string; // ISO date
  nav: number;
}

export interface SectorHolding {
  sector: string;
  percentage: number; // 0-100
}

export interface StatisticalMetric {
  label: string;
  value: string | number;
}

export interface AiInsights {
  description: string;
  objectives: string[];
  historicalPerformance: HistoricalPerformancePoint[];
  sectorHoldings: SectorHolding[];
  stats: StatisticalMetric[];
  summaryRecommendation?: string;
}

export interface MutualFundDetailsResponse {
  overview: MutualFundDetailsOverview;
  ai: AiInsights;
}

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class MutualFundsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get mutual funds with pagination
  async getMutualFunds(params: PaginationParams): Promise<PaginatedResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('page', params.page.toString());
    searchParams.append('size', params.size.toString());

    return this.makeRequest<PaginatedResponse>(`/mf/instruments?${searchParams.toString()}`);
  }

  // Get a single fund's details enriched with AI insights
  async getMutualFundDetails(tradingsymbol: string): Promise<MutualFundDetailsResponse> {
    // Endpoint expected from backend integration with Gemini
    // Adjust the path if your backend differs
    const encoded = encodeURIComponent(tradingsymbol);
    return this.makeRequest<MutualFundDetailsResponse>(`/mf/instruments/${encoded}/details`);
  }
}

// Export a singleton instance
export const mutualFundsService = new MutualFundsService();
