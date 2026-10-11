import React, { ReactNode, useId } from 'react';
import { CheckIcon } from 'lucide-react';

type Option = string | {value: string;label: string;};

interface BaseProps {
  label: string;
  options: Option[];
  extra?: ReactNode;
}

interface MultiProps extends BaseProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

interface SingleProps extends BaseProps {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
}

type ChoiceGroupProps = MultiProps | SingleProps;

function normalize(option: Option) {
  return typeof option === 'string' ? { value: option, label: option } : option;
}

export function ChoiceGroup(props: ChoiceGroupProps) {
  const { label, options, extra } = props;
  const labelId = useId();

  const isChecked = (value: string) =>
  props.multiple ? props.value.includes(value) : props.value === value;

  const toggle = (value: string) => {
    if (props.multiple) {
      const next = props.value.includes(value) ?
      props.value.filter((v) => v !== value) :
      [...props.value, value];
      props.onChange(next);
    } else {
      props.onChange(props.value === value ? '' : value);
    }
  };

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="grid gap-2 border-b border-line py-3 last:border-0 sm:grid-cols-[150px_1fr] sm:items-start sm:gap-4">
      
      <span id={labelId} className="pt-1 text-[13px] font-semibold text-ink">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {options.map((raw) => {
          const option = normalize(raw);
          const checked = isChecked(option.value);
          return (
            <label
              key={option.value}
              className={`inline-flex min-h-[34px] cursor-pointer select-none items-center gap-2 pr-1 text-sm transition-colors duration-150 ${
              checked ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'}`
              }>
              
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                onChange={() => toggle(option.value)} />
              
              <span
                aria-hidden="true"
                className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-wine/30 peer-focus-visible:ring-offset-1 ${
                checked ? 'border-wine bg-wine' : 'border-[#BFAFB6] bg-white'}`
                }>
                
                {checked && <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              {option.label}
            </label>);

        })}
        {extra}
      </div>
    </div>);

}