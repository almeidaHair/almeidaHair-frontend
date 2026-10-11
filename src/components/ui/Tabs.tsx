import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface TabItem<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
}

export function Tabs<T extends string>({ tabs, value, onChange }: TabsProps<T>) {
  const layoutId = useId();
  return (
    <div role="tablist" className="flex gap-6 border-b border-line">
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`relative -mb-px inline-flex items-center gap-2 whitespace-nowrap pb-3 pt-1 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30 ${
            selected ? 'text-wine' : 'text-ink-muted hover:text-ink'}`
            }>
            
            {tab.label}
            {tab.count !== undefined &&
            <span
              className={`rounded-full px-1.5 py-px text-[11px] ${selected ? 'bg-petal text-wine' : 'bg-line text-ink-muted'}`}>
              
                {tab.count}
              </span>
            }
            {selected &&
            <motion.span
              layoutId={layoutId}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-wine" />

            }
          </button>);

      })}
    </div>);

}