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
          background: '#ffffff',
          border: '1px solid #e2e6e1',
          borderRadius: '14px',
          color: '#151a17',
          fontSize: '14px'
        }
      }}
    />
  );
}

export { toast } from 'sonner';
