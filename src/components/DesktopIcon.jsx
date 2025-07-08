import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFolder, FaFileAlt, FaComments, FaTerminal, FaTrash } from 'react-icons/fa';
import useStore from '../store/index.js';

const DesktopIcon = ({ id, name, icon, x, y }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { openApp } = useStore();

  const getIconComponent = (iconId) => {
    const iconMap = {
      'project-explorer': FaFolder,
      'resume-viewer': FaFileAlt,
      'contact-form': FaComments,
      'terminal': FaTerminal,
      'recycle-bin': FaTrash
    };
    return iconMap[iconId] || FaFolder;
  };

  const getIconColor = (iconId) => {
    const colorMap = {
      'project-explorer': 'text-gray-600',
      'resume-viewer': 'text-blue-600',
      'contact-form': 'text-green-600',
      'terminal': 'text-gray-800',
      'recycle-bin': 'text-gray-500'
    };
    return colorMap[iconId] || 'text-gray-600';
  };

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
    openApp(id);
  };

  const IconComponent = getIconComponent(id);
  const iconColor = getIconColor(id);

  return (
    <motion.div
      className="absolute cursor-pointer select-none group"
      style={{ left: x, top: y }}
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container */}
      <motion.div 
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center mb-2 transition-all duration-200
          ${isSelected 
            ? 'bg-blue-500/30 backdrop-blur-sm border border-blue-400/50' 
            : 'hover:bg-white/10 hover:backdrop-blur-sm'
          }
          shadow-lg bg-white/80 backdrop-blur-sm border border-white/50
        `}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <IconComponent className={`text-2xl ${iconColor}`} />
      </motion.div>
      
      {/* Label */}
      <div className={`
        text-center px-2 py-1 rounded-md text-xs font-medium transition-all duration-200
        ${isSelected 
          ? 'bg-blue-500/80 text-white' 
          : 'bg-black/30 text-white backdrop-blur-sm'
        }
        shadow-lg max-w-20 truncate
      `}>
        {name}
      </div>
    </motion.div>
  );
};

export default DesktopIcon;

