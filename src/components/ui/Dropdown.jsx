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
            controlItemBgHover: '#f7f8f6',
            borderRadiusLG: 14,
            borderRadiusSM: 8,
            paddingBlock: 8,
          },
        },
      }}
    >
      <AntDropdown
        menu={menu}
        placement={placement}
        trigger={['click']}
        overlayClassName={className}
        destroyOnHidden
      >
        <span
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
          }}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex cursor-pointer select-none rounded-full focus-visible:outline-2 focus-visible:outline-primary-500"
        >
          {trigger}
        </span>
      </AntDropdown>
    </ConfigProvider>
  );
}