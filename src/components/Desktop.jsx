import React from "react";
import { motion } from "framer-motion";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import Window from "./Window";
import ProjectExplorer from "../apps/ProjectExplorer";
import ResumeViewer from "../apps/ResumeViewer";
import ContactForm from "../apps/ContactForm";
import Terminal from "../apps/Terminal";
import RecycleBin from "../apps/RecycleBin";
import useStore from "../store/index.js";

import wallpaper from "../assets/macos-background.jpg";

const Desktop = () => {
  const { openApps } = useStore();

  const desktopIcons = [
    {
      id: "project-explorer",
      name: "Project Explorer",
      icon: "📁",
      x: 30,
      y: 100,
    },
    { id: "resume-viewer", name: "Resume Viewer", icon: "📄", x: 30, y: 200 },
    { id: "contact-form", name: "Chat With Me", icon: "💬", x: 30, y: 300 },
    { id: "terminal", name: "Terminal", icon: "💻", x: 30, y: 400 },
    { id: "recycle-bin", name: "Recycle Bin", icon: "🗑️", x: 30, y: 500 },
  ];

  const getAppComponent = (appId) => {
    switch (appId) {
      case "project-explorer":
        return <ProjectExplorer />;
      case "resume-viewer":
        return <ResumeViewer />;
      case "contact-form":
        return <ContactForm />;
      case "terminal":
        return <Terminal />;
      case "recycle-bin":
        return <RecycleBin />;
      default:
        return <div>App not found</div>;
    }
  };

  return (
    <motion.div
      className="h-screen w-screen  relative overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "0px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Desktop Icons */}
      <motion.div
        className="absolute inset-0 pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5 + index * 0.1,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <DesktopIcon
              id={icon.id}
              name={icon.name}
              icon={icon.icon}
              x={icon.x}
              y={icon.y}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Windows */}
      {openApps.map((app) => (
        <Window
          key={app.id}
          id={app.id}
          title={app.name}
          position={app.position}
          size={app.size}
          zIndex={app.zIndex}
          maximized={app.maximized}
          minimized={app.minimized}
        >
          {getAppComponent(app.id)}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar />
    </motion.div>
  );
};

export default Desktop;
