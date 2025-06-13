import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import ItemForm from './ItemForm';
import { useItemModal } from '@/hooks/useItemModal';
import { useItemsStore } from '@/store/useItemsStore';
import { useEffect, useState } from 'react';
import { type ExistingItem, type NewItem } from '@/schemas/item.schema';

const ItemModal = () => {
  const { isOpen, mode, itemToEdit, close, open } = useItemModal();
  const { addItem, updateItem } = useItemsStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && itemToEdit) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [mode, itemToEdit]);

  const handleSubmit = async (data: NewItem) => {
    setIsSubmitting(true);
    if (mode === 'edit' && itemToEdit) {
      await updateItem(itemToEdit._id, data);
      open('add');
      setEditMode(false);
    } else {
      await addItem(data);
    }
    setIsSubmitting(false);
  };

  const handleCancelEdit = () => {
    open('add');
    setEditMode(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the item details to save it to your collection.
          </DialogDescription>
        </DialogHeader>

        <ItemForm
          editMode={editMode}
          mode={mode}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          cancelEdit={handleCancelEdit}
          itemToEdit={itemToEdit as ExistingItem}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
