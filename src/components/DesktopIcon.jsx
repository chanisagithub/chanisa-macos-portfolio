import React, { useState } from "react";

const DesktopIcon = ({ id, title, icon, x, y, onDoubleClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
  };

  const handleDoubleClick = () => {
    onDoubleClick(id);
  };

  return (
    <div
      className="absolute cursor-pointer select-none group"
      style={{ left: x, top: y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={`
        w-16 h-16 rounded-xl flex items-center justify-center mb-2 transition-all duration-200
        ${
          isSelected
            ? "bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 scale-105"
            : "hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105"
        }
        shadow-lg
      `}
      >
        <span className="text-3xl drop-shadow-lg">{icon}</span>
      </div>

      <div
        className={`
        text-center px-2 py-1 rounded-md text-xs font-medium transition-all duration-200
        ${
          isSelected
            ? "bg-blue-500/80 text-white"
            : "bg-black/30 text-white backdrop-blur-sm"
        }
        shadow-lg max-w-20 truncate
      `}
      >
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;
