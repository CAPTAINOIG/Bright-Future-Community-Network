import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { DatePicker, Form, Input, Select, TimePicker } from 'antd';

const toSelectValue = (value) => (value === '' || value === null ? undefined : value);

/**
 * Antd Select that also works with react-hook-form's `register()`.
 * register() never passes `value`; it writes `ref.value` on mount and on reset(),
 * so the ref exposes a `value` setter that drives the selected option.
 */
const RegisteredSelect = forwardRef(({ value, defaultValue, onChange, ...props }, ref) => {
  const selectRef = useRef(null);
  const [innerValue, setInnerValue] = useState(toSelectValue(defaultValue));
  const innerValueRef = useRef(innerValue);
  innerValueRef.current = innerValue;

  useImperativeHandle(ref, () => ({
    focus: () => selectRef.current?.focus(),
    blur: () => selectRef.current?.blur(),
    get value() {
      return innerValueRef.current;
    },
    set value(next) {
      setInnerValue(toSelectValue(next));
    },
  }), []);

  return (
    <Select
      ref={selectRef}
      {...props}
      value={value !== undefined ? toSelectValue(value) : innerValue}
      onChange={(next, option) => {
        setInnerValue(next);
        onChange?.(next, option);
      }}
    />
  );
});

RegisteredSelect.displayName = 'RegisteredSelect';

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

  const buildOptions = (nodes) => {
    const out = [];
    const walk = (list) => {
      if (!Array.isArray(list)) list = [list];
      list.forEach((node) => {
        if (!node || node === null) return;
        if (Array.isArray(node)) return walk(node);
        if (typeof node === 'string' || typeof node === 'number') return;
        if (node.type && typeof node.type === 'symbol') return walk(node.props?.children);
        if (node.props && 'value' in node.props) {
          out.push({
            value: node.props.value,
            label: node.props.children ?? String(node.props.value),
            disabled: !!node.props.disabled,
          });
        } else if (node.props?.children) {
          walk(node.props.children);
        }
      });
    };
    walk(nodes);
    return out;
  };

  const options = buildOptions(children);
  const inputProps = { size: 'large', ...controlProps, name, value, defaultValue, onBlur, status: error ? 'error' : undefined };
  const handleValueChange = (nextValue, option) => {
    const synthetic = { target: { name, value: nextValue }, currentTarget: { name, value: nextValue }, option };
    onChange?.(synthetic);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {label}
          {required && <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      {type === 'textarea' ? <Input.TextArea ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={onChange} />
        : type === 'select' ? <RegisteredSelect ref={ref} size={controlProps.size || 'large'} className={baseClasses} options={options} placeholder={placeholder || 'Select an option'} value={value} defaultValue={defaultValue} onChange={handleValueChange} onBlur={onBlur} status={error ? 'error' : undefined} />
          : type === 'date' ? <DatePicker ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={(date) => handleValueChange(date?.format('YYYY-MM-DD') || '')} />
            : type === 'time' ? <TimePicker ref={ref} className={baseClasses} placeholder={placeholder} {...inputProps} onChange={(time) => handleValueChange(time?.format('HH:mm') || '')} />
              : <Input ref={ref} className={baseClasses} type={type} placeholder={placeholder} {...inputProps} onChange={onChange} />}
      {error && <div className="text-[13px] text-red-600 mt-1.5"><Form.ErrorList errors={[error.message]} /></div>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;