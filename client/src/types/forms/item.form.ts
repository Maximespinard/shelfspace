// Form values for the item form (used by React Hook Form)
export interface ItemFormValues {
  title: string;
  description: string;
  price: number | null;
  acquisitionDate: string;
  category: string;
  image: File | null;
}

// Props for form mode
export type FormMode = 'add' | 'edit';

// Form submission data
export interface ItemFormSubmitData {
  data: {
    title: string;
    description: string | null;
    price: number | null;
    acquisitionDate: string | null;
    category: string | null;
    removeImage?: boolean;
  };
  image?: File;
}