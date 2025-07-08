import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/index.js';

const Window = ({ id, title, position, size, zIndex, maximized, minimized, children }) => {
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

  // Animation variants for different window states
  const windowVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] // macOS-like easing
      }
    },
    minimized: {
      scale: 0.1,
      opacity: 0,
      y: window.innerHeight - 100, // Animate towards dock
      x: -200,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] // macOS genie effect easing
      }
    },
    maximized: {
      scale: 1,
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
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
      variants={windowVariants}
      initial="hidden"
      animate={minimized ? "minimized" : (maximized ? "maximized" : "visible")}
      exit="hidden"
      style={windowStyle}
      onClick={handleWindowClick}
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden"
      whileHover={{ 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.2 }
      }}
      layoutId={`window-${id}`} // For smooth layout animations
    >
      {/* macOS Title Bar */}
      <motion.div 
        className="bg-gray-100/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 flex items-center justify-between cursor-move select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={handleCloseClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center group transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
          </motion.button>
          <motion.button
            onClick={handleMinimizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center group transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
          </motion.button>
          <motion.button
            onClick={handleMaximizeClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center group transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
          </motion.button>
        </div>

        {/* Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-gray-700 text-sm font-medium">{title}</span>
        </div>

        {/* Empty space for balance */}
        <div className="w-16"></div>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        className="h-full overflow-auto bg-white/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  // Don't render if minimized
  if (minimized) {
    return (
      <AnimatePresence>
        <motion.div
          key={`minimized-${id}`}
          variants={windowVariants}
          initial="visible"
          animate="minimized"
          exit="hidden"
          style={{ position: 'absolute', zIndex, transformOrigin: 'bottom center' }}
        >
          <WindowContent />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (maximized) {
    return (
      <AnimatePresence>
        <WindowContent />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default Window;

