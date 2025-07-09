import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFolder,
  FaFileAlt,
  FaComments,
  FaTerminal,
  FaTrash,
  FaApple,
} from "react-icons/fa";
import useStore from "../store/index.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FiWifi, FiBattery, FiSearch, FiSettings } from "react-icons/fi";

const Taskbar = () => {
  const { openApps, openApp, restoreApp } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleMenuClick = (action) => {
    console.log(`Menu item clicked: ${action}`);
  };

  const dockApps = [
    { id: "finder", name: "Finder", icon: FaFolder, color: "text-blue-500" },
    {
      id: "project-explorer",
      name: "Project Explorer",
      icon: FaFolder,
      color: "text-gray-600",
    },
    {
      id: "resume-viewer",
      name: "Resume Viewer",
      icon: FaFileAlt,
      color: "text-blue-600",
    },
    {
      id: "contact-form",
      name: "Chat With Me",
      icon: FaComments,
      color: "text-green-600",
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: FaTerminal,
      color: "text-gray-800",
    },
    {
      id: "recycle-bin",
      name: "Recycle Bin",
      icon: FaTrash,
      color: "text-gray-500",
    },
  ];

  const handleAppClick = (appId) => {
    const app = openApps.find((app) => app.id === appId);
    if (app && app.minimized) {
      restoreApp(appId);
    } else {
      openApp(appId);
    }
  };

  const isAppOpen = (appId) => {
    return openApps.some((app) => app.id === appId);
  };

  const isAppMinimized = (appId) => {
    const app = openApps.find((app) => app.id === appId);
    return app && app.minimized;
  };

  return (
    <>
      {/* Menu Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-lg text-white text-sm flex items-center justify-between px-4 z-50"
        initial={{ y: -32 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Left-aligned items */}
        <div className="flex items-center space-x-4">
          <FaApple className="text-white text-xl" />
          <span className="text-white text-sm font-medium">
            Chanisa's Portfolio OS
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              File
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleMenuClick("New Window")}>
                New Window
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMenuClick("Close")}>
                Close
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              Edit
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleMenuClick("Cut")}>
                Cut
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuClick("Copy")}>
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuClick("Paste")}>
                Paste
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              View
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleMenuClick("Show Icons")}>
                Show Icons
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuClick("Hide Dock")}>
                Hide Dock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right-aligned items */}
        <div className="flex items-center space-x-4">
          <FiBattery />
          <FiWifi />
          <FiSearch />
          <FiSettings />
          <div className="text-white text-sm">
            {formatDate(currentTime)} {formatTime(currentTime)}
          </div>
        </div>
      </motion.div>

      {/* Dock */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          className="bg-white/20 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/30 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {dockApps.map((app, index) => {
                const IconComponent = app.icon;
                const isOpen = isAppOpen(app.id);
                const isMinimized = isAppMinimized(app.id);

                return (
                  <motion.div
                    key={app.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="relative"
                  >
                    <motion.button
                      onClick={() => handleAppClick(app.id)}
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-white/80 backdrop-blur-sm border border-white/50
                        hover:bg-white/90 transition-all duration-200
                        ${isOpen ? "ring-2 ring-blue-400/50" : ""}
                        ${isMinimized ? "opacity-60" : ""}
                      `}
                      whileHover={{
                        scale: 1.1,
                        y: -8,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.95 }}
                      title={app.name}
                    >
                      <IconComponent className={`text-xl ${app.color}`} />
                    </motion.button>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {isOpen && !isMinimized && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-700 rounded-full"
                        />
                      )}
                    </AnimatePresence>

                    {/* Minimized indicator */}
                    <AnimatePresence>
                      {isMinimized && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-yellow-500 rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Taskbar;
