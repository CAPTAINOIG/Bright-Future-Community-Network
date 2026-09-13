import { Dropdown as AntDropdown, Button } from 'antd';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({ 
  trigger, 
  items = [], 
  align = 'right',
  className 
}) {
  const menu = { items: items.map((item, index) => ({ key: String(index), label: item.label, icon: item.icon ? <item.icon size={16} /> : undefined, onClick: item.onClick, danger: item.danger })) };
  return <AntDropdown menu={menu} placement={align === 'left' ? 'bottomLeft' : 'bottomRight'} trigger={['click']} overlayClassName={className}><Button type="text" icon={<ChevronDown size={15} />} className="!flex !items-center">{trigger}</Button></AntDropdown>;
}