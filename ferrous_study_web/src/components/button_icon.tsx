import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ButtonIcon({ children, onClick,disabled }: ButtonProps) {
  return (
    <button
      className="bg-transparent border-none p-0 focus:outline-none transition-transform duration-300 active:scale-95 hover:scale-105"
    disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
