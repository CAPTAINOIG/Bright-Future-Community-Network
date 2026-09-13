import { Modal as AntModal } from 'antd';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
  showCloseButton = true
}) {
  return <AntModal open={isOpen} onCancel={onClose} title={title} footer={null} closable={showCloseButton} width={maxWidth === 'max-w-md' ? 448 : 720}>{children}</AntModal>;
}