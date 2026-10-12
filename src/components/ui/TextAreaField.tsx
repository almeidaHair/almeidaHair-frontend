import React, { TextareaHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextAreaField({ label, error, className = '', id, required, rows = 3, ...rest }: TextAreaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={twMerge('py-2', className)}>
      <label htmlFor={inputId} className="block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="text-wine"> *</span>}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={twMerge(
          'mt-2 w-full resize-y rounded-lg border bg-surface px-3 py-2.5 text-[15px] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-wine/15',
          error ? 'border-wine' : 'border-line focus:border-wine'
        )}
        {...rest} />
      
      {error &&
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-wine">
          {error}
        </p>
      }
    </div>);

}