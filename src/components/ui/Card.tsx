import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export default function Card({ padding = true, className = '', children, ...props }: Props) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
