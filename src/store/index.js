import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      apps: [],
      nextZIndex: 1000,

      openApp: (appId) => {
        const { apps, nextZIndex } = get();
        const existingApp = apps.find(app => app.id === appId);
        
        if (existingApp) {
          // If app exists, bring it to front and unminimize if needed
          set({
            apps: apps.map(app => 
              app.id === appId 
                ? { ...app, zIndex: nextZIndex, minimized: false }
                : app
            ),
            nextZIndex: nextZIndex + 1
          });
        } else {
          // Create new app window
          const appConfig = {
            projects: { title: 'Project Explorer', icon: '📁' },
            resume: { title: 'Resume Viewer', icon: '📄' },
            contact: { title: 'Contact Form', icon: '💬' },
            terminal: { title: 'Terminal', icon: '💻' },
            recycle: { title: 'Recycle Bin', icon: '🗑️' }
          };

          const config = appConfig[appId] || { title: 'Unknown App', icon: '❓' };
          
          const newApp = {
            id: appId,
            title: config.title,
            icon: config.icon,
            position: { x: 100 + (apps.length * 30), y: 100 + (apps.length * 30) },
            size: { width: 600, height: 400 },
            zIndex: nextZIndex,
            minimized: false,
            maximized: false
          };

          set({
            apps: [...apps, newApp],
            nextZIndex: nextZIndex + 1
          });
        }
      },

      closeApp: (appId) => {
        set(state => ({
          apps: state.apps.filter(app => app.id !== appId)
        }));
      },

      minimizeApp: (appId) => {
        set(state => ({
          apps: state.apps.map(app => 
            app.id === appId 
              ? { ...app, minimized: !app.minimized }
              : app
          )
        }));
      },

      maximizeApp: (appId) => {
        set(state => ({
          apps: state.apps.map(app => 
            app.id === appId 
              ? { ...app, maximized: !app.maximized }
              : app
          )
        }));
      },

      bringAppToFront: (appId) => {
        const { nextZIndex } = get();
        set(state => ({
          apps: state.apps.map(app => 
            app.id === appId 
              ? { ...app, zIndex: nextZIndex }
              : app
          ),
          nextZIndex: nextZIndex + 1
        }));
      },

      updateAppPosition: (appId, x, y) => {
        set(state => ({
          apps: state.apps.map(app => 
            app.id === appId 
              ? { ...app, position: { x, y } }
              : app
          )
        }));
      },

      updateAppSize: (appId, width, height) => {
        set(state => ({
          apps: state.apps.map(app => 
            app.id === appId 
              ? { ...app, size: { width, height } }
              : app
          )
        }));
      }
    }),
    {
      name: 'desktop-os-storage',
      partialize: (state) => ({ apps: state.apps })
    }
  )
);

export default useStore;

