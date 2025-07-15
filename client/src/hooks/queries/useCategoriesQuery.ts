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
    onMutate: async (newCategory: CreateCategoryData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.categories.all });

      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(queryKeys.categories.lists());

      // Optimistically add the new category
      queryClient.setQueryData(
        queryKeys.categories.lists(),
        (old: Category[] | undefined) => {
          if (!old) return [];
          
          // Create optimistic category with temporary ID
          const optimisticCategory: Category = {
            _id: `temp-${Date.now()}`,
            ...newCategory,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          return [...old, optimisticCategory];
        }
      );

      return { previousCategories };
    },
    onError: (err, _, context) => {
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
      toast.success('Category created successfully!');
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
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
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.categories.all });

      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(queryKeys.categories.lists());

      // Optimistically update the category
      queryClient.setQueryData(
        queryKeys.categories.lists(),
        (old: Category[] | undefined) => {
          if (!old) return [];
          return old.map((cat) => 
            cat._id === id 
              ? { ...cat, ...data, updatedAt: new Date().toISOString() }
              : cat
          );
        }
      );

      return { previousCategories };
    },
    onError: (err, _, context) => {
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
      toast.success('Category updated successfully!');
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
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