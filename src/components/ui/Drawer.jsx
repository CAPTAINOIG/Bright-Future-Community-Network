import { Drawer as AntDrawer } from 'antd';

const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  footer,
  width = 700,
}) => {
  return (
    <AntDrawer
      open={isOpen}
      onClose={onClose}
      placement={position}
      title={title}
      footer={footer}
      width={width}
      className="custom-drawer"
      styles={{
        header: {
          padding: '15px 20px',
          borderBottom: '1px solid #f0f0f0',
        },
        wrapper: {
          borderRadius: '20px 0 0 20px',
          overflow: 'hidden',
        },
        body: {
          padding: '24px',
          background: '#fafafa',
        },
        footer: {
          padding: '16px 4px',
          borderTop: '1px solid #f0f0f0',
          background: '#fff',
        },
      }}
      rootStyle={{
        borderRadius: position === 'right'
          ? '16px 0 0 16px'
          : '0 16px 16px 0',
        overflow: 'hidden',
      }}
    >
      {children}
    </AntDrawer>
  );
}

export default Drawer;