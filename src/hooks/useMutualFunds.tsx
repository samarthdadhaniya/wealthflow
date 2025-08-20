import { useQuery } from '@tanstack/react-query';
import { mutualFundsService, PaginationParams, PaginatedResponse } from '@/services/mutualFundsService';

export const useMutualFunds = (params: PaginationParams) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['mutual-funds', params.page, params.size],
    queryFn: () => mutualFundsService.getMutualFunds(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
