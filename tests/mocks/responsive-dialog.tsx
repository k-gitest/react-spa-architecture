import React from 'react';

export const ResponsiveDialog = ({
  children,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  onOpenChange,
  ...rest
}: {
  children: React.ReactNode;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  onOpenChange?: (open: boolean) => void;
  [key: string]: any;
}) => (
  <div data-testid={`dialog-${buttonTitle}`}>
    <button onClick={() => onOpenChange && onOpenChange(true)} data-testid={`open-dialog-${buttonTitle}`} {...rest}>
      {buttonTitle}
    </button>
    <div data-testid={`dialog-content-${buttonTitle}`}>
      <h2>{dialogTitle}</h2>
      <p>{dialogDescription}</p>
      {children}
    </div>
  </div>
);