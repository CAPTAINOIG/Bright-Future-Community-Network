import { Dropdown as AntDropdown, ConfigProvider } from 'antd';

export default function Dropdown({
  trigger,
  items = [],
  align = 'right',
  className,
  danger = false,
}) {
  const menu = {
    items: items.map((item, index) => ({
      key: String(item.key ?? index),
      label: item.label,
      icon: item.icon ? <item.icon size={16} /> : undefined,
      onClick: item.onClick,
      danger: item.danger ?? danger,
    })),
  };

  const placement = align === 'left' ? 'bottomLeft' : 'bottomRight';

  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            controlItemBgHover: '#f7faf6',
          },
        },
      }}
    >
      <AntDropdown
        menu={menu}
        placement={placement}
        trigger={['click']}
        overlayClassName={className}
        destroyPopupOnHide
      >
        <span
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
          }}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex cursor-pointer select-none"
        >
          {trigger}
        </span>
      </AntDropdown>
    </ConfigProvider>
  );
}