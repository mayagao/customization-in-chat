import Image from "next/image";
import { RepoIcon } from "@primer/octicons-react";

const ToggleButton = ({ label, isActive, onClick, imageSrc }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center border rounded-full px-2 h-[32px] text-sm font-default transition-colors 
        ${
          isActive
            ? "bg-white border-gray-200 font-medium "
            : "bg-gray-50 text-gray-500 border-gray-300 border-opacity-80 hover:bg-white hover:text-black"
        }`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          width="20"
          height="20"
          alt={label}
          className="mr-1 border border-gray-300 border-opacity-50 rounded-full"
          quality={100} // Ensure high-quality rendering
        />
      )}
      {!imageSrc && <RepoIcon className="mr-1" />}
      {label}
    </button>
  );
};
export default ToggleButton;
