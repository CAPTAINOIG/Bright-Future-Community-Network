import { CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const icons = {
  warning: <ExclamationCircleOutlined className="text-[#d68e42]" />,
  danger: <ExclamationCircleOutlined className="text-red-600" />,
  info: <InfoCircleOutlined className="text-blue-600" />,
  success: <CheckCircleOutlined className="text-[#427456]" />,
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
      title={<span className="flex items-center gap-2">{icons[type]} {title}</span>}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>{cancelText}</Button>,
        <Button key="confirm" type="primary" danger={type === 'danger'} loading={loading} onClick={onConfirm}>{confirmText}</Button>,
      ]}
    >
      <p className="py-3 text-sm text-[#708078]">{message}</p>
    </Modal>
  );
}
