import { Modal as AntModal } from 'antd';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
  showCloseButton = true
}) {
  return (
    <AntModal
      open={isOpen}
      onCancel={onClose}
      title={title ? <span className="font-serif text-[1.35rem] font-medium text-gray-900 leading-snug">{title}</span> : title}
      footer={null}
      closable={showCloseButton}
      width={maxWidth === 'max-w-md' ? 448 : 720}
      centered
      styles={{ content: { borderRadius: 20, padding: 28 }, header: { marginBottom: 16 } }}
    >
      <div className="text-[15px] text-gray-700 leading-relaxed">{children}</div>
    </AntModal>
  );
}
