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
} from '@/types/api';
import type { ItemFormSubmitData } from '@/types/forms';

/**
 * Hook to fetch items with filters
 */
export function useItemsQuery(params?: ItemsQueryParams) {
  return useQuery({
    queryKey: queryKeys.items.list(params || {}),
    queryFn: () => fetchItemsApi(params || {}),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      toast.success('Item created successfully!');
    },
    onError: (error) => {
      const message = ErrorService.getErrorMessage(error);
      toast.error(message);
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
      submitData, 
      originalItem 
    }: { 
      id: string; 
      submitData: ItemFormSubmitData;
      originalItem: ItemWithCategory;
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.detail(variables.id) });
      toast.success('Item updated successfully!');
    },
    onError: (error) => {
      const message = ErrorService.getErrorMessage(error);
      toast.error(message);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
      toast.success('Item deleted successfully!');
    },
    onError: (error) => {
      const message = ErrorService.getErrorMessage(error);
      toast.error(message);
    },
  });
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      submitData 
    }: { 
      id: string; 
      submitData: ItemFormSubmitData;
    }) => {
      return updateItemJsonApi(id, submitData.data as UpdateItemData);
    },
    onMutate: async ({ id, submitData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.items.all });

      // Snapshot previous values
      const previousItems = queryClient.getQueryData(queryKeys.items.lists());

      // Optimistically update
      queryClient.setQueryData(queryKeys.items.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item: ItemWithCategory) =>
            item._id === id 
              ? { ...item, ...submitData.data }
              : item
          ),
        };
      });

      return { previousItems };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousItems) {
        queryClient.setQueryData(queryKeys.items.lists(), context.previousItems);
      }
      const message = ErrorService.getErrorMessage(err);
      toast.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
    },
  });
}