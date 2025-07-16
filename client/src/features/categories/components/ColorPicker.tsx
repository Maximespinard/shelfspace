import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRESET_COLORS } from '@/constants/colors';

interface ColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
  colors?: string[];
}

export function ColorPicker({
  selectedColor,
  onSelect,
  colors = PRESET_COLORS,
}: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all',
            selectedColor === color
              ? 'border-ring ring-2 ring-offset-2'
              : 'border-border'
          )}
          style={{ backgroundColor: color }}
          onClick={() => onSelect(color)}
        >
          {selectedColor === color && (
            <CheckIcon className="w-4 h-4 text-white drop-shadow" />
          )}
        </button>
      ))}
    </div>
  );
}
