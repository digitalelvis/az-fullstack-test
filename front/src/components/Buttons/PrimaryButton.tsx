import React from "react";

interface PrimaryButtonProps {
  label: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, size = "md", onClick }) => {
  return (
    <button
      className={`w-full rounded-md bg-primary text-white font-semibold shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
