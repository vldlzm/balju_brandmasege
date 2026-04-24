import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md';
}

const BASE = 'inline-flex items-center justify-center rounded-xl font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

const VARIANTS: Record<Variant, string> = {
  primary:   'bg-[#4DB87A] text-white hover:bg-[#3da869]',
  secondary: 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50',
  danger:    'bg-red-500 text-white hover:bg-red-600',
  ghost:     'text-gray-500 hover:bg-gray-100',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
