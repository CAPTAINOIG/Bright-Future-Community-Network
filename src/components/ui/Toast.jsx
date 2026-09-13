import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      expand={true}
      duration={4000}
      closeButton
      theme="light"
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          fontSize: '14px'
        },
        className: 'shadow-lg'
      }}
    />
  );
}

export { toast } from 'sonner';