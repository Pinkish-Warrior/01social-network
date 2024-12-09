import React, { ChangeEvent } from "react";

interface FileInputProps {
  type: string;
  id: string;
  name: string;
  accept?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string; // Custom class for input
  labelClassName?: string; // Custom class for label
}

const FileInput = ({
  id,
  name,
  accept,
  label,
  onChange,
  inputClassName = "p-2 border rounded", // Default input styles
  labelClassName = "mb-1", // Default label styles
}: FileInputProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  );
};

export default FileInput;
