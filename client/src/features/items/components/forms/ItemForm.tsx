import type { FC } from 'react';
import { Controller } from 'react-hook-form';
import type {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { Loader2, Plus } from 'lucide-react';

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

import ItemImageDropzone from './ItemImageDropzone';
import type { ItemFormValues, FormMode } from '../../types/item.form';
import type { Category } from '../../../categories/types/category.types';

interface ItemFormProps {
  // Form state
  mode: FormMode;
  isSubmitting: boolean;
  isDirty: boolean;
  
  // Form methods
  register: UseFormRegister<ItemFormValues>;
  control: Control<ItemFormValues>;
  errors: FieldErrors<ItemFormValues>;
  watch: UseFormWatch<ItemFormValues>;
  setValue: UseFormSetValue<ItemFormValues>;
  
  // Data
  categories: Category[];
  defaultImageUrl?: string;
  
  // Handlers
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onCancel?: () => void;
  onCategoryManage: () => void;
  onImageChange: (file: File | null) => void;
}

const ItemForm: FC<ItemFormProps> = ({
  mode,
  isSubmitting,
  isDirty,
  register,
  control,
  errors,
  watch,
  setValue,
  categories,
  defaultImageUrl,
  onSubmit,
  onCancel,
  onCategoryManage,
  onImageChange,
}) => {
  const selectedCategory = watch('category');

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
                onCategoryManage();
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
                    style={{ backgroundColor: cat.color } as React.CSSProperties}
                  />
                  {cat.name}
                </SelectItem>
              ))}
              <div className="py-1 px-1.5">
                <button
                  type="button"
                  className="flex w-full items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                  onClick={onCategoryManage}
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
          <Label htmlFor="price">Price (optional)</Label>
          <Input
            id="price"
            inputSize="lg"
            type="number"
            placeholder="e.g. 999.99"
            step="0.01"
            min={0}
            {...register('price', {
              setValueAs: (v) => (v === '' ? null : Number(v)),
            })}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="acquisitionDate">Acquisition Date (optional)</Label>
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
              onSelect={(file) => {
                onChange(file);
                onImageChange(file);
              }}
              defaultPreviewUrl={defaultImageUrl}
            />
          )}
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4">
        {mode === 'edit' && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || (mode === 'edit' && !isDirty)}
          className={mode === 'add' ? 'w-full' : ''}
          size="lg"
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