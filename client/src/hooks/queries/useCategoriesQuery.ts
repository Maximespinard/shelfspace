import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  fetchCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '@/lib/api/categories';
import { queryKeys } from '@/lib/react-query';
import { ErrorService } from '@/services/error.service';
import type { Category, CreateCategoryData } from '@/types/api';

/**
 * Hook to fetch all categories
 */
export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: fetchCategoriesApi,
  });
}

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: (data) => {
      // Update cache immediately
      queryClient.setQueryData(
        queryKeys.categories.lists(),
        (old: Category[] | undefined) => {
          if (!old) return [data];
          return [...old, data];
        }
      );
      
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success('Category created successfully!');
    },
    onError: (error) => {
      const message = ErrorService.getErrorMessage(error);
      toast.error(message);
    },
  });
}

/**
 * Hook to update a category
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryData }) =>
      updateCategoryApi(id, data),
    onSuccess: (data, variables) => {
      // Update cache immediately
      queryClient.setQueryData(
        queryKeys.categories.lists(),
        (old: Category[] | undefined) => {
          if (!old) return [data];
          return old.map((cat) => (cat._id === variables.id ? data : cat));
        }
      );
      
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      toast.success('Category updated successfully!');
    },
    onError: (error) => {
      const message = ErrorService.getErrorMessage(error);
      toast.error(message);
    },
  });
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onMutate: async (id: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.categories.all });

      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(queryKeys.categories.lists());

      // Optimistically remove from cache
      queryClient.setQueryData(
        queryKeys.categories.lists(),
        (old: Category[] | undefined) => {
          if (!old) return [];
          return old.filter((cat) => cat._id !== id);
        }
      );

      return { previousCategories };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousCategories) {
        queryClient.setQueryData(
          queryKeys.categories.lists(),
          context.previousCategories
        );
      }
      const message = ErrorService.getErrorMessage(err);
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Category deleted successfully!');
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.items.all });
    },
  });
}