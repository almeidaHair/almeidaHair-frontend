import React, { InputHTMLAttributes, ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
}

export function TextField({ label, error, hint, trailing, className = '', id, required, ...rest }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={twMerge('py-2', className)}>
      <label htmlFor={inputId} className="block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="text-wine"> *</span>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={twMerge(
            'mt-1 w-full border-0 border-b bg-transparent px-0 py-2 text-[15px] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint focus:outline-none focus:ring-0',
            error ?
            'border-wine shadow-[0_1px_0_0_#8C2D4F]' :
            'border-[#CDBDC4] focus:border-wine focus:shadow-[0_1px_0_0_#8C2D4F]',
            trailing ? 'pr-24' : ''
          )}
          {...rest} />
        
        {trailing && <div className="absolute inset-y-0 right-0 flex items-center gap-1">{trailing}</div>}
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-wine">
          {error}
        </p> :

      hint &&
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink-muted">
            {hint}
          </p>

      }
    </div>);

}