import { Label } from '@/components/ui/shadcn/label';
import { Button } from '@/components/ui/shadcn/button';
import { ImageIcon, X } from 'lucide-react';

interface Props {
  currentUrl?: string;
  onSelect: (url: string) => void;
}

const ItemImageInput = ({ currentUrl, onSelect }: Props) => {
  const placeholderUrl =
    'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const handleFakeUpload = () => {
    onSelect(placeholderUrl);
  };

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium">Image (optional)</Label>

      <div className="relative w-full h-48 rounded-xl border border-muted bg-muted/40 overflow-hidden group">
        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt="Item preview"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onSelect('')}
              className="absolute top-2 right-2 z-10 text-destructive bg-white/70 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
            <ImageIcon className="w-6 h-6 opacity-50" />
            <p className="text-xs">No image selected</p>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleFakeUpload}
      >
        Upload image
      </Button>
    </div>
  );
};

export default ItemImageInput;
