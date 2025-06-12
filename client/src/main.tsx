import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/index.css';
import App from './App.tsx';
import './lib/axios.ts';

import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  </StrictMode>
);
