import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  onSelect: (file: File | null) => void;
  defaultPreviewUrl?: string;
  maxSizeMB?: number;
}

const ItemImageDropzone = ({
  onSelect,
  defaultPreviewUrl = '',
  maxSizeMB = 5,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultPreviewUrl);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const reason = fileRejections[0].errors[0].message;
        toast.error(reason);
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
      onSelect(file);
      toast.success('Image selected');
    },
    [onSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      noClick: true,
      noKeyboard: true,
      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
      },
      maxSize: maxSizeMB * 1024 * 1024,
    });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPreviewUrl('');
    onSelect(null);
    toast.success('Image removed');
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          'relative w-full h-48 border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/40 overflow-hidden transition hover:cursor-pointer',
          isDragActive && 'border-primary'
        )}
        onClick={open}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleRemove}
              className="absolute top-2 right-2 z-10 text-destructive bg-white/70 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            <p className="text-sm">Drag & drop or click to upload</p>
            <p className="text-xs text-muted-foreground">
              JPG / PNG up to {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <p className="text-xs text-muted-foreground text-center truncate">
          {acceptedFiles[0].name}
        </p>
      )}
    </div>
  );
};

export default ItemImageDropzone;
