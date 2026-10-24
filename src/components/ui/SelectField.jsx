import { forwardRef } from 'react';
import clsx from 'clsx';
import { Select, Form } from 'antd';

const SelectField = forwardRef(({
  label,
  placeholder = 'Select an option',
  error,
  required = false,
  className,
  options = [],
  ...props
}, ref) => {
  const baseClasses = clsx('w-full', className);
  const { onChange, onBlur, name, value, defaultValue, ...controlProps } = props;

  const handleValueChange = (nextValue) => {
    const synthetic = { target: { name, value: nextValue }, currentTarget: { name, value: nextValue } };
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
      <Select
        ref={ref}
        size="large"
        className={baseClasses}
        options={options}
        placeholder={placeholder}
        value={value || undefined}
        defaultValue={defaultValue}
        onChange={handleValueChange}
        onBlur={onBlur}
        status={error ? 'error' : undefined}
        {...controlProps}
        optionLabelProp="label"
      />
      {error && <div className="text-[13px] text-red-600 mt-1.5"><Form.ErrorList errors={[error.message]} /></div>}
    </div>
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;
