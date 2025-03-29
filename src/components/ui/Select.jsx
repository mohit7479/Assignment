"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const selectRef = React.useRef(null);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setOpen(false);
  };

  return (
    <div ref={selectRef} className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            open,
            value: selectedValue,
          });
        }

        if (child.type === SelectContent) {
          return open
            ? React.cloneElement(child, {
                onSelect: handleSelect,
                value: selectedValue,
              })
            : null;
        }

        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({
  id,
  children,
  onClick,
  open,
  value,
  className,
  ...props
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
        open ? "border-ring" : ""
      } ${className}`}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === SelectValue) {
          return React.cloneElement(child, { value });
        }

        return child;
      })}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

const SelectValue = ({ placeholder, value }) => {
  return <span>{value || placeholder}</span>;
};

const SelectContent = ({ children, onSelect, value, className, ...props }) => {
  return (
    <div
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full mt-1 ${className}`}
      {...props}
    >
      <div className="w-full p-1">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              onSelect,
              selected: value === child.props.value,
            });
          }

          return child;
        })}
      </div>
    </div>
  );
};

const SelectItem = ({
  value,
  children,
  onSelect,
  selected,
  className,
  ...props
}) => {
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
        selected ? "bg-accent text-accent-foreground" : ""
      } ${className}`}
      onClick={() => onSelect(value)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
