import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchItemsApi,
  createItemApi,
  updateItemApi,
  deleteItemApi,
} from '../api/items';
import { queryKeys } from '@/lib/react-query';
import { ErrorService } from '@/services/error.service';
import type {
  ItemWithCategory,
  ItemsQueryParams,
  ItemsResponse,
} from '../types/item.types';

/**
 * Hook to fetch items with filters
 */
export function useItemsQuery(params?: ItemsQueryParams) {
  return useQuery({
    queryKey: queryKeys.items.list(params || {}),
    queryFn: () => fetchItemsApi(params || {}),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

/**
 * Hook to create a new item
 */
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return createItemApi(formData);
    },
    onError: (err) => {
      const message = ErrorService.getErrorMessage(err);
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Item created successfully!');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });
    },
  });
}

/**
 * Hook to update an item
 */
export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      return updateItemApi(id, formData);
    },
    onError: (err) => {
      const message = ErrorService.getErrorMessage(err);
      toast.error(message);
    },
    onSuccess: (_, variables) => {
      toast.success('Item updated successfully!');
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.items.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });
    },
  });
}

/**
 * Hook to delete an item
 */
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemApi,
    onMutate: async (itemId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.items.all });

      // Snapshot previous values for all queries
      const previousQueries = queryClient.getQueriesData({
        queryKey: queryKeys.items.lists(),
      });

      // Optimistically remove the item from all cached queries
      queryClient.setQueriesData(
        { queryKey: queryKeys.items.lists() },
        (old: ItemsResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.filter(
              (item: ItemWithCategory) => item._id !== itemId
            ),
            total: old.total - 1,
          };
        }
      );

      return { previousQueries };
    },
    onError: (err, _, context) => {
      // Rollback on error
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      const message = ErrorService.getErrorMessage(err);
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Item deleted successfully!');
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.lists() });
    },
  });
}
