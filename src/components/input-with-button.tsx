import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InputWithButtonProps {
  id?: string;
  initialValue?: string;
  placeholder?: string;
  inputType?: string;
  buttonText?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  className?: string;
  value?: string;
}

export const InputWithButton = ({
  id,
  initialValue = '',
  placeholder = '',
  inputType = 'text',
  buttonText = '送信',
  label,
  onChange,
  onSubmit,
  className = '',
  value = ''
}: InputWithButtonProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {label && <p>{label}</p>}
      <Input id={id} type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
      <Button type="button" onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  );
};

