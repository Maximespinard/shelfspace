import type { ItemWithCategory } from '@/types/api';
import type { FormMode } from '@/types/forms';

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
import { useCategoryModal } from '@/hooks/modals/useCategoryModal';
import { useItemForm } from '@/hooks/form/useItemForm';

import ItemImageDropzone from './ItemImageDropzone';
import { Controller } from 'react-hook-form';

interface Props {
  mode: FormMode;
  isSubmitting: boolean;
  cancelEdit?: () => void;
  itemToEdit?: ItemWithCategory;
  onSubmit: (data: FormData) => void | Promise<void>;
}

const ItemForm = ({
  mode,
  isSubmitting,
  cancelEdit,
  itemToEdit,
  onSubmit,
}: Props) => {
  const { register, handleSubmit, setValue, watch, errors, isDirty, control } =
    useItemForm(onSubmit, itemToEdit);

  const { categories } = useCategoriesStore();
  const { open: openCategoryModal } = useCategoryModal();

  const selectedCategory = watch('category');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Item Title</Label>
          <Input
            inputSize="lg"
            id="title"
            placeholder="e.g. MacBook Pro"
            autoFocus={false}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

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
                shouldDirty: true,
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

      <div className="pt-1">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <ItemImageDropzone
              onSelect={(file) => onChange(file)}
              defaultPreviewUrl={itemToEdit?.imageUrl}
            />
          )}
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4">
        {mode === 'edit' && cancelEdit && (
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
          disabled={isSubmitting || (mode === 'edit' && !isDirty)}
          className={mode === 'add' ? 'w-full' : ''}
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
