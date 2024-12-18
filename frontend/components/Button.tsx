import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button data-testid="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
