import React, { ReactNode } from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    primary: "bg-star hover:bg-star-dark text-white shadow-lg shadow-star/30",
    secondary: "bg-star-accent text-star-dark hover:bg-green-100",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30",
    outline: "border-2 border-star text-star hover:bg-star hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-gray-700 font-medium text-sm uppercase tracking-wide">{label}</label>}
    <input 
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-star focus:ring-2 focus:ring-star/20 outline-none transition-all ${className}`}
      {...props} 
    />
  </div>
);
