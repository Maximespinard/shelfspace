import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Loader2 } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { PRESET_COLORS } from '@/constants/colors';
import {
  type CategorySchema,
  categorySchema,
} from '@/schemas/category.schema';
import type { Category, CreateCategoryData } from '@/types/api';
import type { FormMode } from '@/types/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

interface Props {
  editMode: boolean;
  mode: FormMode;
  onSubmit: (data: CreateCategoryData) => void;
  isSubmitting: boolean;
  cancelEdit?: () => void;
  categoryToEdit?: Category | null;
}

export const CategoryForm = ({
  editMode,
  mode,
  onSubmit,
  isSubmitting,
  cancelEdit,
  categoryToEdit,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: PRESET_COLORS[0],
    },
  });

  useEffect(() => {
    if (editMode && categoryToEdit) {
      setValue('name', categoryToEdit.name);
      setValue('color', categoryToEdit.color || PRESET_COLORS[0]);
    }
  }, [editMode, categoryToEdit, setValue]);

  useEffect(() => {
    if (mode === 'add' && !isSubmitting) {
      reset({
        name: '',
        color: PRESET_COLORS[0],
      });
    }
  }, [mode, isSubmitting, reset]);

  const selectedColor = watch('color');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Category name" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Select a color</p>
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color) => setValue('color', color)}
        />
      </div>

      <div className="flex justify-between items-center">
        {editMode && cancelEdit && (
          <Button type="button" variant="outline" onClick={cancelEdit}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : mode === 'edit' ? (
            'Save Changes'
          ) : (
            'Add Category'
          )}
        </Button>
      </div>
    </form>
  );
};
