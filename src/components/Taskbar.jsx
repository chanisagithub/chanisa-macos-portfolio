import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FiWifi, FiBattery, FiSearch, FiSettings } from "react-icons/fi";

import useStore from "../store/index.js";

const Taskbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { apps, openApp, minimizeApp } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  const handleMenuClick = (action) => {
    console.log(`Menu item clicked: ${action}`);
  };

  const defaultDockApps = [
    { id: "resume", title: "Resume Viewer", icon: "📄" },
    { id: "contact", title: "Contact Form", icon: "💬" },
  ];

  const openAppIds = apps.map((app) => app.id);
  const dockApps = [
    ...defaultDockApps.filter((d) => !openAppIds.includes(d.id)),
    ...apps,
  ];

  return (
    <>
      {/* Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-lg text-white text-sm flex items-center justify-between px-4 z-50">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold"></div>
          <div className="font-bold">Chanisa's Portfolio</div>
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
        <div className="flex items-center space-x-4">
          <FiBattery />
          <FiWifi />
          <FiSearch />
          <FiSettings />
          <div className="font-sans">{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Bottom Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-end h-[70px] space-x-2 p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
          {/* Static Finder Icon */}
          <div className="relative group">
            <button
              onClick={() => openApp("projects")}
              className="w-14 h-14 bg-gray-500/50 rounded-xl flex items-center justify-center text-4xl hover:scale-110 transition-transform duration-200"
            >
              {"📁"}
            </button>
            {apps.find((app) => app.id === "projects" && !app.minimized) && (
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Project Explorer
            </div>
          </div>

          {/* Dynamically added apps */}
          {dockApps.map((app) => (
            <div key={app.id} className="relative group">
              <button
                onClick={() => {
                  openApp(app.id);
                  if (apps.find((a) => a.id === app.id)?.minimized)
                    minimizeApp(app.id);
                }}
                className="w-14 h-14 bg-gray-500/50 rounded-xl flex items-center justify-center text-4xl hover:scale-110 transition-transform duration-200"
              >
                {app.icon}
              </button>
              {apps.find((a) => a.id === app.id && !a.minimized) && (
                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {app.title}
              </div>
            </div>
          ))}

          {/* Separator */}
          <div className="h-14 w-px bg-white/20 mx-2"></div>

          <div className="relative group">
            <button
              onClick={() => openApp("recycle")}
              className="w-14 h-14 bg-gray-500/50 rounded-xl flex items-center justify-center text-4xl hover:scale-110 transition-transform duration-200"
            >
              {"🗑️"}
            </button>
            {apps.find((app) => app.id === "recycle" && !app.minimized) && (
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Recycle Bin
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
