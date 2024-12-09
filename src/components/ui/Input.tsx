import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  id?: string;
  name?: string;
  value: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  max?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string; // Custom layout for for input/label
  inputClassName?: string; // Custom class for input
  labelClassName?: string; // Custom class for label
  checked?: boolean; // Add checked for radio buttons
}

const Input = ({
  type,
  id,
  name,
  value,
  placeholder,
  label,
  required = false,
  max,
  onChange,
  containerClassName = "flex flex-col", // Default cantainer styles
  inputClassName = "mb-1 p-2 border rounded", // Default input styles
  labelClassName = "mb-1", // Default label styles
  checked, // Add checked for radio buttons
}: InputProps): JSX.Element => {
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        max={type === "date" ? max : undefined}
        className={inputClassName}
        checked={checked}
      />
    </div>
  );
};

export default Input;
