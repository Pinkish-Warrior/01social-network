import React from "react";

interface TextAreaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number; // Optional, to set the number of rows in the textarea
  className?: string;
}

const TextArea = ({
  label,
  id,
  name,
  value,
  placeholder = "",
  required = false,
  onChange,
  rows = 3, // Default number of rows
  className = "",
}: TextAreaProps): JSX.Element => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onChange={onChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default TextArea;
