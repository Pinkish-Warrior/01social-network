import React from "react";
import Image from "next/image";

// Define props for the CardLayout component
interface RequestListLayoutProps {
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  content: React.ReactNode;
  buttonContent?: React.ReactNode;
  imageAspectRatio?: string;
  containerClassName?: string;
  imageClassName?: string;
  bodyClassName?: string;
  buttonClassName?: string;
}

const RequestListLayout = ({
  imageSrc,
  imageAlt,
  width,
  height,
  imageAspectRatio = "400/240",
  content,
  buttonContent,
  containerClassName = "flex items-center justify-between py-2",
  imageClassName = "w-8 h-8 rounded-full object-cover",
  bodyClassName = "flex-1 min-w-0 ms-4",
  buttonClassName = "flex gap-2 justify-end ml-2",
}: RequestListLayoutProps): JSX.Element => {
  return (
    <li className={containerClassName}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={width}
            height={height}
            className={imageClassName}
            style={{ aspectRatio: imageAspectRatio, objectFit: "cover" }}
          />
        </div>
        <div className={bodyClassName}>
          {/* Inject flexible content here */}
          {content}
        </div>
      </div>
      <div className={buttonClassName}>
        {/* Inject flexible buttons/actions here */}
        {buttonContent}
      </div>
    </li>
  );
};

export default RequestListLayout;
