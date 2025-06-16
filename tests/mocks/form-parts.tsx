import React, { ReactNode } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

export const FormWrapper = ({
  children,
  onSubmit,
  form,
  initialValues = {},
}: {
  children: ReactNode;
  onSubmit: (data: any) => void;
  form?: any;
  initialValues?: any;
}) => (
  <FormProvider {...form}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form?.getValues ? form.getValues() : initialValues);
      }}
      data-testid="form-wrapper"
    >
      {children}
    </form>
  </FormProvider>
);

export const FormInput = ({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) => {
  const { register } = useFormContext();
  return (
    <input aria-label={label} name={name} placeholder={placeholder} data-testid={`input-${name}`} {...register(name)} />
  );
};

export const FormTextArea = ({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) => {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        aria-label={label}
        name={name}
        placeholder={placeholder}
        data-testid={`textarea-${name}`}
        {...register(name)}
      />
    </div>
  );
};

export const FormSelect = ({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) => {
  const { register } = useFormContext();
  return (
    <div aria-label={label} data-testid={`select-${name}`}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} role="combobox" {...register(name)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FormRadioGroup = ({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
}) => {
  const { register } = useFormContext();
  return (
    <div aria-label={label} role="radiogroup" data-testid={`radio-group-${name}`}>
      <span>{label}</span>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            aria-label={option.label}
            role="radio"
            data-testid={`radio-${option.value}`}
            {...register(name)}
          />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export const FormCheckboxGroup = ({
  label,
  name,
  options,
  selectedValues = [],
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  selectedValues?: string[];
}) => {
  const { register } = useFormContext();

  return (
    <div aria-label={label} data-testid={`checkbox-group-${name}`}>
      <span>{label}</span>
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);

        return (
          <div key={option.value}>
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              aria-label={option.label}
              role="checkbox"
              defaultChecked={isChecked}
              data-testid={`checkbox-${option.value}`}
              {...register(name)}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </div>
        );
      })}
    </div>
  );
};
