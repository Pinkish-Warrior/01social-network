import React from "react";
import Image from "next/image";

// Define props for the CardLayout component
interface MiniCardLayoutProps {
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  title: React.ReactNode; // in order to use Link
  description?: string;
  memberCount: number;
  footerContent?: React.ReactNode;
  imageAspectRatio?: string;
  containerClassName?: string;
  imageClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  context: "group" | "friend";
}

const MiniCardLayout = ({
  imageSrc,
  imageAlt,
  width,
  height,
  title,
  description,
  memberCount,
  footerContent,
  imageAspectRatio = "400/240",
  containerClassName = "relative bg-gray-200 overflow-hidden rounded-lg shadow-lg flex flex-col",
  imageClassName = "rounded-full w-18 h-18 object-cover p-2 m-2 flex justify-center items-center",
  bodyClassName = "p-2 flex-1 flex flex-col justify-center",
  footerClassName = "p-2 ",
  context,
}: MiniCardLayoutProps): JSX.Element => {
  return (
    <div className={`${containerClassName} min-w-[280px] md:min-w-0`}>
      <div className="flex flex-1 p-2">
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
          <h3 className="text-sm font-bold mb-1 hover:underline">{title}</h3>
          <p className="text-xs text-gray-600 mb-4 truncate lg:whitespace-normal lg:overflow-visible">
            {description}
          </p>
          <div className="flex flex-row mb-4">
            <div className="flex text-xs text-muted-foreground">
              <Image
                src="/icons/members.webp"
                alt="Members"
                width={24}
                height={24}
                className="w-6 h-6 mr-1"
              />
              {context === "group"
                ? `${memberCount} members`
                : `${memberCount} mutual friends`}
            </div>
          </div>
        </div>
      </div>
      <div className={footerClassName}>{footerContent}</div>
    </div>
  );
};

export default MiniCardLayout;
