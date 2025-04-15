import { Button } from '@/components/ui/button';
import { FormWrapper, FormInput } from './form/form-parts';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type InputWithButtonProps = {
  name: string;
  label: string;
  className?: string;
  buttonText?: string;
  onSubmit: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithButton = ({
  name,
  label,
  className = '',
  buttonText = '送信',
  onSubmit,
  ...props
}: InputWithButtonProps) => {
  const form = useForm({
    defaultValues: {},
  });

  return (
    <FormWrapper onSubmit={onSubmit} form={form}>
      <div className={cn('flex flex-col gap-4', className)}>
        <FormInput label={label} name={name} {...props} />
        <Button type="submit">{buttonText}</Button>
      </div>
    </FormWrapper>
  );
};
