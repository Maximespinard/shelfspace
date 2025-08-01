import type {
  ItemWithCategory,
} from '../types/item.types';
import type { ItemFormValues, ItemFormSubmitData } from '../types/item.form';

/**
 * Service layer for item-related operations
 * Handles data transformations between forms and API
 */
export class ItemService {
  /**
   * Transform form values to API format for creating an item
   */
  static prepareCreateData(formValues: ItemFormValues): ItemFormSubmitData {
    return {
      data: {
        title: formValues.title.trim().toLowerCase(),
        description: formValues.description?.trim() || null,
        price: formValues.price === '' ? null : formValues.price,
        acquisitionDate: formValues.acquisitionDate || null,
        category: formValues.category || null,
      },
      image: formValues.image || undefined,
    };
  }

  /**
   * Transform form values to API format for updating an item
   */
  static prepareUpdateData(
    formValues: ItemFormValues,
    originalItem: ItemWithCategory,
    imageRemoved: boolean
  ): ItemFormSubmitData {
    const data: ItemFormSubmitData['data'] = {
      // Always include all required fields
      title: formValues.title.trim().toLowerCase(),
      description: formValues.description?.trim() || null,
      price: formValues.price === '' ? null : formValues.price,
      acquisitionDate: formValues.acquisitionDate || null,
      category: formValues.category || null,
    };

    // Only set removeImage if user had an image and removed it
    if (imageRemoved && originalItem.imageUrl) {
      data.removeImage = true;
    }

    return {
      data,
      image: formValues.image || undefined,
    };
  }

  /**
   * Transform API item data to form default values
   */
  static itemToFormValues(item: ItemWithCategory): Omit<ItemFormValues, 'image'> {
    return {
      title: item.title,
      description: item.description || '',
      price: item.price || null,
      acquisitionDate: item.acquisitionDate
        ? item.acquisitionDate.split('T')[0]
        : '',
      category:
        typeof item.category === 'object' && item.category
          ? item.category._id
          : '',
    };
  }

  /**
   * Create FormData for multipart upload
   */
  static createFormData(submitData: ItemFormSubmitData): FormData {
    const formData = new FormData();

    // Append JSON data
    formData.append('data', JSON.stringify(submitData.data));

    // Append image if present
    if (submitData.image) {
      formData.append('image', submitData.image);
    }

    return formData;
  }

  /**
   * Validate if form has actual changes compared to original item
   */
  static hasChanges(
    formValues: ItemFormValues,
    originalItem: ItemWithCategory,
    imageRemoved: boolean
  ): boolean {
    // Check if image was removed
    if (imageRemoved && originalItem.imageUrl) {
      return true;
    }

    // Check if new image was added
    if (formValues.image) {
      return true;
    }

    // Compare other fields
    const original = this.itemToFormValues(originalItem);

    return (
      formValues.title !== original.title ||
      formValues.description !== original.description ||
      formValues.price !== original.price ||
      formValues.acquisitionDate !== original.acquisitionDate ||
      formValues.category !== original.category
    );
  }

  /**
   * Determine what image operations need to be performed
   */
  static needsImageOperation(
    submitData: ItemFormSubmitData,
    hasExistingImage: boolean
  ): { shouldRemoveImage: boolean; hasNewImage: boolean } {
    const shouldRemoveImage = !!submitData.data.removeImage && hasExistingImage;
    const hasNewImage = !!submitData.image;
    
    return {
      shouldRemoveImage,
      hasNewImage,
    };
  }
}
