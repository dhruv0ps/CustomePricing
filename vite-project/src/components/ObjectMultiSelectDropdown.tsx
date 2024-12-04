import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type ObjectMultiSelectDropdownProps = {
  options: Option[];
  value: string[];
  placeholder?: string;
  onChange: (selectedOptions: string[]) => void;
};

const ObjectMultiSelectDropdown: React.FC<ObjectMultiSelectDropdownProps> = ({
  options,
  value,
  placeholder = "Select options",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedLabel: string) => {
    if (!value.includes(selectedLabel)) {
      onChange([...value, selectedLabel]);
      setIsOpen(false)
    }
  };

  const handleRemove = (selectedLabel: string) => {
    onChange(value.filter((label) => label !== selectedLabel));
  };

  return (
    <div className="relative  md:w-80">
      {/* Dropdown Trigger */}
      <div
        className="border border-gray-300 p-2 rounded cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700">
          {value.length > 0 ? `${value.length} selected` : placeholder}
        </span>
        <button className="text-gray-500" type="button">
          &#x25BC;
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {options
            .filter((option) => !value.includes(option.label))
            .map((option) => (
              <div
                key={option.value}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(option.label)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}

      {/* Selected Items Below Dropdown */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((label) => (
            <div
              key={label}
              className="bg-blue-500 text-black px-3 py-1 rounded-full flex items-center"
              style={{backgroundColor:"lightblue"}}
            >
              <span>{label}</span>
              <button
                className="ml-2 text-black hover:text-gray-300 focus:outline-none"
                type="button"
                onClick={() => handleRemove(label)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ObjectMultiSelectDropdown;
