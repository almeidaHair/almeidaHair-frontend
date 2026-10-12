import React, { useId } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-desc` : undefined}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 focus-visible:ring-offset-2 ${
        checked ? 'bg-wine' : 'bg-line'}`
        }>
        
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          checked ? 'translate-x-5' : 'translate-x-0'}`
          } />
        
      </button>
      <div>
        <p id={`${id}-label`} className="text-sm font-medium text-ink">
          {label}
        </p>
        {description &&
        <p id={`${id}-desc`} className="text-xs text-ink-muted">
            {description}
          </p>
        }
      </div>
    </div>);

}