import React, { useState, useEffect } from 'react';
import useStore from '../store/index.js';

const Taskbar = () => {
  const { apps, bringAppToFront, minimizeApp } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDockIconClick = (appId) => {
    const app = apps.find(a => a.id === appId);
    if (app.minimized) {
      minimizeApp(appId);
      bringAppToFront(appId);
    } else {
      bringAppToFront(appId);
    }
  };

  return (
    <>
      {/* Menu Bar (Top) */}
      <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 py-1 z-50">
        <div className="flex items-center justify-between">
          {/* Left side - App menu */}
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm font-medium"></div>
            <div className="text-white text-sm font-medium">Chanisa's Portfolio</div>
          </div>

          {/* Right side - System info */}
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* macOS Dock (Bottom) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/30">
          <div className="flex items-center space-x-3">
            {/* Finder Icon (Static) */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">📁</span>
            </div>

            {/* Separator */}
            {apps.length > 0 && (
              <div className="w-px h-8 bg-white/30"></div>
            )}

            {/* Open Applications */}
            {apps.map(app => (
              <div key={app.id} className="relative">
                <button
                  onClick={() => handleDockIconClick(app.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 ${
                    app.minimized 
                      ? 'bg-gray-400/50' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-300'
                  }`}
                >
                  <span className="text-lg">{app.icon}</span>
                </button>
                {/* Active indicator */}
                {!app.minimized && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </div>
            ))}

            {/* Separator */}
            <div className="w-px h-8 bg-white/30"></div>

            {/* Trash Icon (Static) */}
            <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🗑️</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;

