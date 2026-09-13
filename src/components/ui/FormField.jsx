import { forwardRef } from 'react';
import clsx from 'clsx';
import { DatePicker, Form, Input, Select, TimePicker } from 'antd';

const FormField = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  className,
  ...props
}, ref) => {
  const baseClasses = clsx('w-full', className);
  const { children, onChange, onBlur, name, value, defaultValue, ...controlProps } = props;
  const inputProps = { ...controlProps, name, value, defaultValue, onBlur, status: error ? 'error' : undefined };
  const options = Array.isArray(children) ? children.filter(Boolean).map((child) => ({ value: child.props.value, label: child.props.children })) : children ? [{ value: children.props.value, label: children.props.children }] : [];
  const handleValueChange = (nextValue) => onChange?.({ target: { name, value: nextValue }, currentTarget: { name, value: nextValue } });

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {type === 'textarea' ? <Input.TextArea ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={onChange} />
        : type === 'select' ? <Select ref={ref} className={baseClasses} options={options} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={handleValueChange} onBlur={onBlur} status={error ? 'error' : undefined} />
          : type === 'date' ? <DatePicker ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={(date) => handleValueChange(date?.format('YYYY-MM-DD') || '')} />
            : type === 'time' ? <TimePicker ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={(time) => handleValueChange(time?.format('HH:mm') || '')} />
              : <Input ref={ref} className={baseClasses} type={type} placeholder={placeholder} {...inputProps} onChange={onChange} />}
      {error && <Form.ErrorList errors={[error.message]} />}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;