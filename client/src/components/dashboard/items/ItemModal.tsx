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
import { useState } from 'react';
import { type ExistingItem } from '@/schemas/item.schema';

const ItemModal = () => {
  const { isOpen, mode, itemToEdit, close } = useItemModal();
  const { addItem, updateItem } = useItemsStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    if (mode === 'edit' && itemToEdit) {
      await updateItem(itemToEdit._id!, data);
      close();
    } else {
      await addItem(data);
      close();
    }
    setIsSubmitting(false);
  };

  const handleCancelEdit = () => {
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden space-y-6"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the item details to save it to your collection.
          </DialogDescription>
        </DialogHeader>

        <ItemForm
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
