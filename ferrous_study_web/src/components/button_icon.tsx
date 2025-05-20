import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ButtonIcon({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      className="bg-transparent border-none rounded p-0 focus:outline-none hover:shadow-[0_4px_3px_-2px] hover:shadow-theme-3 transition-transform duration-300 active:scale-95 hover:scale-105"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
