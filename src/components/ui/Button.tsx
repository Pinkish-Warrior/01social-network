import React from "react";

// Extend the ButtonProps to include all button-related HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  isPending?: boolean;
  pendingText?: string;
  loaderColor?: string;
}

const Button = ({
  type,
  disabled = false,
  onClick,
  children,
  className = "w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 ease-in-out box-border",
  isPending = false,
  pendingText = "Submitting...", // Default loading text
  loaderColor = "border-white", // Default loader color
  ...rest // Spread the rest of the props for more flexibility
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      disabled={disabled || isPending}
      onClick={onClick}
      className={`${className} ${
        disabled || isPending ? "bg-blue-300 cursor-not-allowed" : ""
      }`}
      aria-busy={isPending} // Add aria-busy for accessibility
      aria-disabled={disabled || isPending} // Add aria-disabled for accessibility
      {...rest} // Spread remaining button attributes
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-2">
          <div
            className={`inline-block h-4 w-4 border-4 border-t-4 ${loaderColor} border-solid rounded-full animate-spin`}
          />
          {pendingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
