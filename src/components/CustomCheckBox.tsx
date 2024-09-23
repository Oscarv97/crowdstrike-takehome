import React from "react";

type CheckboxState = "off" | "checked" | "on";

interface CustomCheckBoxProps {
  value: CheckboxState;
  onClick: () => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ value, onClick }) => {
  const baseClasses = "relative inline-flex my-2 items-center justify-center w-5 h-5 border-2 rounded cursor-pointer";
  const stateClasses = {
    off: "bg-white border-gray-400",
    checked: "bg-green-500 border-green-500 text-white",
    on: "bg-yellow-300 border-yellow-300 text-black",
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