import React from "react";
import Image from "next/image";

// Define props for the CardLayout component
interface CardLayoutProps {
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  title: React.ReactNode; // in order to use Link
  description?: string;
  memberCount: number;
  footerContent: React.ReactNode;
  imageAspectRatio?: string;
  containerClassName?: string;
  imageClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const CardLayout = ({
  imageSrc,
  imageAlt,
  width,
  height,
  title,
  description,
  memberCount,
  footerContent,
  imageAspectRatio = "400/240",
  containerClassName = "relative flex-grow bg-gray-200 overflow-hidden rounded-lg shadow-lg flex flex-col h-full",
  imageClassName = "w-full h-48 object-cover",
  bodyClassName = "p-4 flex-1 flex-col",
  footerClassName = "p-4",
}: CardLayoutProps): JSX.Element => {
  return (
    <div className={`${containerClassName} min-w-[280px] md:min-w-0`}>
      {/*style={{ minWidth: "100%" } cause problem button got hidden,but without this mobile size changed...*/}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={height}
        className={imageClassName}
        style={{ aspectRatio: imageAspectRatio, objectFit: "cover" }}
      />
      <div className={bodyClassName}>
        <h3 className="text-xl font-bold mb-2 hover:underline">{title}</h3>
        <p className="p-1 text-sm text-gray-600 mb-4 line-clamp-3 lg:line-clamp-none">
          {description}
        </p>
        <div className="flex flex-row items-center mb-4">
          <div className="flex text-sm text-muted-foreground">
            <Image
              src="/icons/members.webp"
              alt="Members"
              width={24}
              height={24}
              className="w-6 h-6 mr-1"
            />
            {memberCount} members
          </div>
        </div>
      </div>
      <div className={footerClassName}>{footerContent}</div>
    </div>
  );
};

export default CardLayout;
