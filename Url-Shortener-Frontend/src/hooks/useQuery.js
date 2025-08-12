import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ['my-shortenurls', token],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get('/api/urls/myurls', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return data; // array of urls
    },
    select: (data) =>
      [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      ),
    onError,
    staleTime: 5000,
  });
};

export const useFetchTotalClicks = (token, onError) => {
  const startDate = '2025-01-01';
  const endDate = '2025-12-31';

  return useQuery({
    queryKey: ['url-totalclick', token, startDate, endDate],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data; // e.g. { "2025-07-28": 2, "2025-07-27": 3 }
    },
    select: (obj) =>
      Object.entries(obj || {}).map(([clickDate, count]) => ({
        clickDate,
        count,
      })),
    onError,
    staleTime: 5000,
  });
};
