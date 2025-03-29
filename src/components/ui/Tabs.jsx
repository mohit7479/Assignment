"use client";

import * as React from "react";

const Tabs = ({ value, onValueChange, children, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(value);

  React.useEffect(() => {
    setActiveTab(value);
  }, [value]);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={`${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange: handleTabChange,
          });
        }

        return child;
      })}
    </div>
  );
};

const TabsList = ({
  children,
  className,
  activeTab,
  onTabChange,
  ...props
}) => {
  return (
    <div
      className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === TabsTrigger) {
          return React.cloneElement(child, {
            active: activeTab === child.props.value,
            onClick: () => onTabChange(child.props.value),
          });
        }

        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({
  value,
  active,
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        active
          ? "bg-background text-foreground shadow"
          : "hover:bg-muted hover:text-muted-foreground"
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeTab, children, className, ...props }) => {
  if (value !== activeTab) return null;

  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
