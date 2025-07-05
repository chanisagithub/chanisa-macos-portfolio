import React from 'react';
import useStore from '../store/index.js';
import Taskbar from './Taskbar.jsx';
import DesktopIcon from './DesktopIcon.jsx';
import Window from './Window.jsx';
import ProjectExplorer from '../apps/ProjectExplorer.jsx';
import ResumeViewer from '../apps/ResumeViewer.jsx';
import ContactForm from '../apps/ContactForm.jsx';
import Terminal from '../apps/Terminal.jsx';
import RecycleBin from '../apps/RecycleBin.jsx';

const Desktop = () => {
  const { apps, openApp } = useStore();

  const desktopIcons = [
    { id: 'projects', title: 'Project Explorer', icon: '📁', x: 30, y: 60 }, // Adjusted for menu bar
    { id: 'resume', title: 'Resume.pdf', icon: '📄', x: 30, y: 150 },
    { id: 'contact', title: 'Chat With Me', icon: '💬', x: 30, y: 240 },
    { id: 'terminal', title: 'Terminal', icon: '💻', x: 30, y: 330 },
    { id: 'recycle', title: 'Recycle Bin', icon: '🗑️', x: 30, y: 420 }
  ];

  const renderAppContent = (appId) => {
    switch (appId) {
      case 'projects':
        return <ProjectExplorer />;
      case 'resume':
        return <ResumeViewer />;
      case 'contact':
        return <ContactForm />;
      case 'terminal':
        return <Terminal />;
      case 'recycle':
        return <RecycleBin />;
      default:
        return <div>Unknown application</div>;
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '32px' // Account for menu bar
      }}
    >
      {/* Desktop Icons */}
      {desktopIcons.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          icon={icon.icon}
          x={icon.x}
          y={icon.y}
          onDoubleClick={openApp}
        />
      ))}

      {/* Windows */}
      {apps.filter(app => !app.minimized).map(app => (
        <Window
          key={app.id}
          id={app.id}
          title={app.title}
          position={app.position}
          size={app.size}
          zIndex={app.zIndex}
          maximized={app.maximized}
        >
          {renderAppContent(app.id)}
        </Window>
      ))}

      {/* Menu Bar and Dock */}
      <Taskbar />
    </div>
  );
};

export default Desktop;

