import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      openApps: [],
      nextZIndex: 1000,

      openApp: (appId) => {
        const { openApps, nextZIndex } = get();
        const existingApp = openApps.find(app => app.id === appId);
        
        if (existingApp) {
          // If app exists but is minimized, restore it
          if (existingApp.minimized) {
            set({
              openApps: openApps.map(app =>
                app.id === appId
                  ? { ...app, minimized: false, zIndex: nextZIndex }
                  : app
              ),
              nextZIndex: nextZIndex + 1
            });
          } else {
            // Just bring to front
            set({
              openApps: openApps.map(app =>
                app.id === appId
                  ? { ...app, zIndex: nextZIndex }
                  : app
              ),
              nextZIndex: nextZIndex + 1
            });
          }
        } else {
          // Create new app window
          const newApp = {
            id: appId,
            name: getAppName(appId),
            position: { x: 100 + (openApps.length * 30), y: 100 + (openApps.length * 30) },
            size: { width: 800, height: 600 },
            zIndex: nextZIndex,
            maximized: false,
            minimized: false
          };
          
          set({
            openApps: [...openApps, newApp],
            nextZIndex: nextZIndex + 1
          });
        }
      },

      closeApp: (appId) => {
        const { openApps } = get();
        set({
          openApps: openApps.filter(app => app.id !== appId)
        });
      },

      minimizeApp: (appId) => {
        const { openApps } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, minimized: true }
              : app
          )
        });
      },

      restoreApp: (appId) => {
        const { openApps, nextZIndex } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, minimized: false, zIndex: nextZIndex }
              : app
          ),
          nextZIndex: nextZIndex + 1
        });
      },

      maximizeApp: (appId) => {
        const { openApps } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, maximized: !app.maximized }
              : app
          )
        });
      },

      updateAppPosition: (appId, x, y) => {
        const { openApps } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, position: { x, y } }
              : app
          )
        });
      },

      updateAppSize: (appId, width, height) => {
        const { openApps } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, size: { width, height } }
              : app
          )
        });
      },

      bringAppToFront: (appId) => {
        const { openApps, nextZIndex } = get();
        set({
          openApps: openApps.map(app =>
            app.id === appId
              ? { ...app, zIndex: nextZIndex }
              : app
          ),
          nextZIndex: nextZIndex + 1
        });
      }
    }),
    {
      name: 'desktop-os-storage',
      partialize: (state) => ({ openApps: state.openApps })
    }
  )
);

function getAppName(appId) {
  const appNames = {
    'project-explorer': 'Project Explorer',
    'resume-viewer': 'Resume Viewer',
    'contact-form': 'Chat With Me',
    'terminal': 'Terminal',
    'recycle-bin': 'Recycle Bin',
  };
  return appNames[appId] || 'Unknown App';
}

export default useStore;

