import React from "react";
import "@app/globals.css";

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  containerClassName?: string; // Custom class for the container
  headerClassName?: string; // Custom class for the header
  bodyClassName?: string; // Custom class for the body
}

const FormLayout = ({
  children,
  title,
  subtitle,
  containerClassName = "mt-10 mb-9 lg:mt-0 lg:mb-0 max-w-md mx-auto bg-blue-100 p-4 w-full glassmorphism", // Default container styles
  headerClassName = "head_text", // Default header styles
  bodyClassName = "space-y-4", // Default body styles
}: FormLayoutProps): JSX.Element => {
  return (
    <div className={containerClassName}>
      <h1 className={headerClassName}>{title}</h1>
      {subtitle && <h2 className="mb-4 text-center text-sm">{subtitle}</h2>}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default FormLayout;
