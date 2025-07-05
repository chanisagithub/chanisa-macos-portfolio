import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { motion } from 'framer-motion';
import useStore from '../store/index.js';

const Window = ({ id, title, position, size, zIndex, maximized, children }) => {
  const { closeApp, minimizeApp, maximizeApp, updateAppPosition, updateAppSize, bringAppToFront } = useStore();
  const nodeRef = useRef(null);

  const handleDragStop = (e, data) => {
    updateAppPosition(id, data.x, data.y);
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    updateAppSize(id, ref.offsetWidth, ref.offsetHeight);
  };

  const handleWindowClick = () => {
    bringAppToFront(id);
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeApp(id);
  };

  const handleMinimizeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    minimizeApp(id);
  };

  const handleMaximizeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    maximizeApp(id);
  };

  const windowStyle = maximized 
    ? { 
        position: 'fixed', 
        top: '32px', // Account for menu bar
        left: 0, 
        width: '100vw', 
        height: 'calc(100vh - 112px)', // Account for menu bar (32px) + dock space (80px)
        zIndex 
      }
    : { 
        position: 'absolute', 
        zIndex 
      };

  const WindowContent = () => (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={windowStyle}
      onClick={handleWindowClick}
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* macOS Title Bar */}
      <div className="bg-gray-100/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 flex items-center justify-between cursor-move select-none">
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCloseClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center group transition-all duration-200"
          >
            <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
          </button>
          <button
            onClick={handleMinimizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center group transition-all duration-200"
          >
            <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
          </button>
          <button
            onClick={handleMaximizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center group transition-all duration-200"
          >
            <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
          </button>
        </div>

        {/* Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-gray-700 text-sm font-medium">{title}</span>
        </div>

        {/* Empty space for balance */}
        <div className="w-16"></div>
      </div>

      {/* Content Area */}
      <div className="h-full overflow-auto bg-white/95">
        {children}
      </div>
    </motion.div>
  );

  if (maximized) {
    return <WindowContent />;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".cursor-move"
      position={position}
      onStop={handleDragStop}
      bounds={{
        top: 32, // Account for menu bar
        left: 0,
        right: window.innerWidth - 100,
        bottom: window.innerHeight - 100
      }}
    >
      <div ref={nodeRef} style={{ position: 'absolute', zIndex }}>
        <Resizable
          size={size}
          onResizeStop={handleResizeStop}
          minWidth={300}
          minHeight={200}
          maxWidth={window.innerWidth - 100}
          maxHeight={window.innerHeight - 132} // Account for menu bar + dock
        >
          <WindowContent />
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Window;

