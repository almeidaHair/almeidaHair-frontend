import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-blush disabled:pointer-events-none disabled:opacity-60';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]'
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-wine text-white hover:bg-wine-dark',
  secondary: 'border border-petal-border bg-white text-wine hover:bg-petal/50',
  ghost: 'text-ink-muted hover:bg-petal/50 hover:text-wine'
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return twMerge(base, sizes[size], variants[variant], extra);
}