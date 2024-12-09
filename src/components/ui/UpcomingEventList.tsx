import React from "react";

// Define props for the CardLayout component
interface RequestListLayoutProps {
  content: React.ReactNode;
  containerClassName?: string;
  bodyClassName?: string;
}

const UpcomingEventListLayout = ({
  content,
  containerClassName = "flex items-center py-2 mr-0",
  bodyClassName = "flex-1 min-w-0 ms-4",
}: RequestListLayoutProps): JSX.Element => {
  return (
    <li className={containerClassName}>
      <div className="flex items-center">
        <div className={bodyClassName}>
          {/* Inject flexible content here */}
          {content}
        </div>
      </div>
    </li>
  );
};

export default UpcomingEventListLayout;
