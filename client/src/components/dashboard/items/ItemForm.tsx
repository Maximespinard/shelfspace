import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type NewItem,
  type ItemSchema,
  type ExistingItem,
  itemSchema,
} from '@/schemas/item.schema';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { Input } from '@/components/ui/shadcn/input';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { Button } from '@/components/ui/shadcn/button';
import { Label } from '@/components/ui/shadcn/label';
import { Loader2, Plus } from 'lucide-react';

import { useCategoriesStore } from '@/store/useCategoriesStore';
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { useItemModal } from '@/hooks/useItemModal';

import ItemImageInput from './ItemImageInput';

interface Props {
  editMode: boolean;
  mode: 'add' | 'edit';
  isSubmitting: boolean;
  cancelEdit?: () => void;
  itemToEdit?: ExistingItem;
  onSubmit: (data: NewItem) => void;
}

const ItemForm = ({
  editMode,
  mode,
  isSubmitting,
  cancelEdit,
  itemToEdit,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      acquisitionDate: '',
      imageUrl: '',
      category: '',
    },
  });

  const { categories } = useCategoriesStore();
  const selectedCategory = watch('category');
  const imageUrl = watch('imageUrl');

  const { open: openCategoryModal } = useCategoryModal();
  const { close: closeItemModal } = useItemModal();

  useEffect(() => {
    if (editMode && itemToEdit) {
      reset({
        title: itemToEdit.title,
        description: itemToEdit.description || '',
        price: itemToEdit.price,
        acquisitionDate: itemToEdit.acquisitionDate?.split('T')[0] || '',
        imageUrl: itemToEdit.imageUrl || '',
        category: itemToEdit.category || '',
      });
    }
  }, [editMode, itemToEdit, reset]);

  const onSubmitForm = async (data: NewItem) => {
    const fixedData = {
      ...data,
      category: data.category?.trim() === '' ? undefined : data.category,
      imageUrl: data.imageUrl?.trim() === '' ? undefined : data.imageUrl,
      acquisitionDate: data.acquisitionDate
        ? new Date(data.acquisitionDate).toISOString()
        : undefined,
    };

    await onSubmit(fixedData);
    closeItemModal();
    reset({
      title: '',
      description: '',
      price: 0,
      acquisitionDate: '',
      imageUrl: '',
      category: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Item Title</Label>
          <Input
            inputSize="lg"
            id="title"
            placeholder="e.g. MacBook Pro"
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Select
            value={selectedCategory || 'none'}
            onValueChange={(val) => {
              if (val === '__manage__') {
                openCategoryModal('add');
                return;
              }
              setValue('category', val === 'none' ? '' : val, {
                shouldValidate: true,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="No category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No category</SelectItem>

              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </SelectItem>
              ))}

              <div className="py-1 px-1.5">
                <button
                  type="button"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                  onClick={() => openCategoryModal('add')}
                >
                  <Plus className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Manage categories</span>
                </button>
              </div>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            inputSize="lg"
            type="number"
            placeholder="e.g. 999.99"
            min={0}
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        {/* Acquisition Date */}
        <div className="space-y-1.5">
          <Label htmlFor="acquisitionDate">Acquisition Date</Label>
          <Input
            id="acquisitionDate"
            inputSize="lg"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            {...register('acquisitionDate')}
          />
          {errors.acquisitionDate && (
            <p className="text-sm text-destructive">
              {errors.acquisitionDate.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Add a description..."
          rows={3}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Image upload */}
      <div className="pt-1">
        <ItemImageInput
          currentUrl={imageUrl}
          onSelect={(url) => setValue('imageUrl', url)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">
        {editMode && cancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={cancelEdit}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size={'lg'}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : mode === 'edit' ? (
            'Save Changes'
          ) : (
            'Add Item'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
