import type { Category, CreateCategoryData } from '@/types/api';

/**
 * Service layer for category-related operations
 * Handles data transformations between forms and API
 */
export class CategoryService {
  /**
   * Transform form values to API format
   */
  static prepareData(name: string, color: string): CreateCategoryData {
    return {
      name: name.trim(),
      color: color.trim(),
    };
  }

  /**
   * Transform category to form default values
   */
  static categoryToFormValues(category: Category): CreateCategoryData {
    return {
      name: category.name,
      color: category.color,
    };
  }

  /**
   * Validate if form has changes
   */
  static hasChanges(
    formData: CreateCategoryData,
    originalCategory: Category
  ): boolean {
    return (
      formData.name !== originalCategory.name ||
      formData.color !== originalCategory.color
    );
  }
}
