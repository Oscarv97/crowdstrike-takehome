import React from "react";

type CheckboxState = "off" | "checked" | "on";

interface CustomCheckBoxProps {
  value: CheckboxState;
  onClick: () => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ value, onClick }) => {
  const baseClasses = "relative select-none inline-flex m-2 items-center justify-center w-5 h-5 border-2 rounded cursor-pointer";
  const stateClasses = {
    off: "bg-white border-gray-400",
    checked: "bg-blue-400 border-blue-400 text-white",
    on: " bg-blue-400 border-blue-400 text-white",
  };


  return (
    <div className={`${baseClasses} ${stateClasses[value]}`} onClick={onClick}>
      {value === "checked" && <span>✓</span>}
      {value === "on" && <span>-</span>}
      <div className="absolute bottom-full mb-1 hidden w-max px-2 py-1 text-xs text-white bg-black rounded opacity-75 group-hover:block">
        {"Select all files"}
      </div>
    </div>
  );
};

export default CustomCheckBox;