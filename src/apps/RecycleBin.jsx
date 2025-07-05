import React, { useState } from 'react';
import { FiTrash2, FiRotateCcw, FiX } from 'react-icons/fi';

const RecycleBin = () => {
  const [deletedItems] = useState([
    {
      id: 1,
      name: "Old Portfolio v1.0",
      type: "folder",
      deletedDate: "2024-01-15",
      reason: "Outdated design, replaced with modern version"
    },
    {
      id: 2,
      name: "jQuery Todo App",
      type: "file",
      deletedDate: "2024-01-10",
      reason: "Migrated to React for better maintainability"
    },
    {
      id: 3,
      name: "PHP Blog System",
      type: "folder",
      deletedDate: "2024-01-05",
      reason: "Replaced with headless CMS solution"
    },
    {
      id: 4,
      name: "Vanilla JS Calculator",
      type: "file",
      deletedDate: "2023-12-20",
      reason: "Learning project, no longer needed"
    },
    {
      id: 5,
      name: "Bootstrap Landing Page",
      type: "file",
      deletedDate: "2023-12-15",
      reason: "Switched to Tailwind CSS for utility-first approach"
    },
    {
      id: 6,
      name: "Express REST API v1",
      type: "folder",
      deletedDate: "2023-12-01",
      reason: "Refactored with better architecture and TypeScript"
    }
  ]);

  const getIcon = (type) => {
    return type === 'folder' ? '📁' : '📄';
  };

  const handleRestore = (itemId) => {
    alert(`Restoring item ${itemId}... (This is a demo)`);
  };

  const handlePermanentDelete = (itemId) => {
    alert(`Permanently deleting item ${itemId}... (This is a demo)`);
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recycle Bin</h2>
        <p className="text-gray-600">Rejected ideas and old projects that didn't make the cut</p>
      </div>

      {deletedItems.length === 0 ? (
        <div className="text-center py-12">
          <FiTrash2 size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Recycle bin is empty</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {deletedItems.map(item => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-2xl">{getIcon(item.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                    <p className="text-xs text-gray-500">Deleted on {item.deletedDate}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleRestore(item.id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Restore"
                  >
                    <FiRotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete Permanently"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">💡 Why a Recycle Bin?</h3>
          <p className="text-sm text-blue-800">
            Every developer has projects that didn't work out or got replaced by better solutions. 
            This recycle bin represents my journey of continuous learning and improvement. 
            Each "deleted" project taught me valuable lessons that contributed to my growth as a developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecycleBin;

