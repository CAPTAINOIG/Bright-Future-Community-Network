import { CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const icons = {
  warning: <span className="grid place-items-center w-9 h-9 rounded-full bg-accent-50 text-accent-600 text-lg shrink-0"><ExclamationCircleOutlined /></span>,
  danger: <span className="grid place-items-center w-9 h-9 rounded-full bg-red-50 text-red-600 text-lg shrink-0"><ExclamationCircleOutlined /></span>,
  info: <span className="grid place-items-center w-9 h-9 rounded-full bg-primary-50 text-primary-700 text-lg shrink-0"><InfoCircleOutlined /></span>,
  success: <span className="grid place-items-center w-9 h-9 rounded-full bg-primary-50 text-primary-600 text-lg shrink-0"><CheckCircleOutlined /></span>,
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
}) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      width={440}
      styles={{ content: { borderRadius: 20, padding: 28 } }}
      title={<span className="flex items-center gap-3">{icons[type]}<span className="font-serif text-[1.3rem] font-medium text-gray-900 leading-snug">{title}</span></span>}
      footer={[
        <Button key="cancel" shape="round" onClick={onClose} disabled={loading}>{cancelText}</Button>,
        <Button key="confirm" shape="round" type="primary" danger={type === 'danger'} loading={loading} onClick={onConfirm}>{confirmText}</Button>,
      ]}
    >
      <p className="pt-2 pb-4 text-[15px] leading-relaxed text-gray-600 m-0">{message}</p>
    </Modal>
  );
}
