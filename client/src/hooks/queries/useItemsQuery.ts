import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  fetchItemsApi,
  createItemJsonApi,
  updateItemJsonApi,
  deleteItemApi,
  uploadItemImageApi,
  deleteItemImageApi,
} from '@/lib/api/items';
import { queryKeys } from '@/lib/react-query';
import { ItemService } from '@/services/item.service';
import { ErrorService } from '@/services/error.service';
import type { 
  ItemWithCategory, 
  ItemsQueryParams,
  CreateItemData,
  UpdateItemData,
  ItemsResponse,
} from '@/types/api';
import type { ItemFormSubmitData } from '@/types/forms';

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
    mutationFn: async (submitData: ItemFormSubmitData) => {
      // First create the item
      const item = await createItemJsonApi(submitData.data as CreateItemData);
      
      // Then upload image if provided
      if (submitData.image) {
        return uploadItemImageApi(item.data._id, submitData.image);
      }
      
      return item;
    },
    onMutate: async (submitData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.items.all });

      // Snapshot previous values for all queries
      const previousQueries = queryClient.getQueriesData({ queryKey: queryKeys.items.lists() });

      // Optimistically add the new item to all cached queries
      queryClient.setQueriesData(
        { queryKey: queryKeys.items.lists() },
        (old: ItemsResponse | undefined) => {
          if (!old) return old;
          
          // Create optimistic item with temporary ID
          const optimisticItem: ItemWithCategory = {
            _id: `temp-${Date.now()}`,
            ...submitData.data,
            category: null, // Will be populated by server
            imageUrl: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as ItemWithCategory;

          return {
            ...old,
            items: [optimisticItem, ...old.items],
            total: old.total + 1,
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
      toast.success('Item created successfully!');
    },
    onSettled: () => {
      // Always refetch after mutation
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
      submitData
    }: { 
      id: string; 
      submitData: ItemFormSubmitData;
    }) => {
      // Update item data
      const updatedItem = await updateItemJsonApi(id, submitData.data as UpdateItemData);
      
      // Handle image operations
      const imageOps = ItemService.needsImageOperation(submitData, true);
      
      if (imageOps.shouldRemoveImage) {
        return deleteItemImageApi(id);
      } else if (imageOps.hasNewImage && submitData.image) {
        return uploadItemImageApi(id, submitData.image);
      }
      
      return updatedItem;
    },
    onMutate: async ({ id, submitData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.items.all });

      // Snapshot previous values for all queries
      const previousQueries = queryClient.getQueriesData({ queryKey: queryKeys.items.lists() });

      // Optimistically update all cached queries
      queryClient.setQueriesData(
        { queryKey: queryKeys.items.lists() },
        (old: ItemsResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.map((item: ItemWithCategory) =>
              item._id === id
                ? {
                    ...item,
                    ...submitData.data,
                    // Keep existing category object if not updating category
                    category: submitData.data.category ? item.category : item.category,
                    updatedAt: new Date().toISOString(),
                  }
                : item
            ),
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.detail(variables.id) });
      toast.success('Item updated successfully!');
    },
    onSettled: () => {
      // Always refetch after mutation
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
      const previousQueries = queryClient.getQueriesData({ queryKey: queryKeys.items.lists() });

      // Optimistically remove the item from all cached queries
      queryClient.setQueriesData(
        { queryKey: queryKeys.items.lists() },
        (old: ItemsResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.filter((item: ItemWithCategory) => item._id !== itemId),
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

