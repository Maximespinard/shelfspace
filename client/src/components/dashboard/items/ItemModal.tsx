import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import ItemFormContainer from './ItemFormContainer';
import { useItemModal } from '@/hooks/modals/useItemModal';

const ItemModal = () => {
  const { isOpen, mode, itemToEdit, close } = useItemModal();

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

        <ItemFormContainer
          mode={mode}
          itemToEdit={itemToEdit || undefined}
          onSuccess={close}
          onCancel={close}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
