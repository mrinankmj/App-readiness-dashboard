import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageName: string;
  onAddTool: (toolName: string, toolDescription: string) => void;
}

export const AddToolModal: React.FC<AddToolModalProps> = ({
  isOpen,
  onClose,
  stageName,
  onAddTool,
}) => {
  const [toolName, setToolName] = useState('');
  const [toolDescription, setToolDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (toolName.trim()) {
      onAddTool(toolName, toolDescription);
      setToolName('');
      setToolDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Add Tool to {stageName}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          <div>
            <label htmlFor="toolName" className="block text-sm font-medium text-gray-700 mb-2">
              Tool Name *
            </label>
            <input
              type="text"
              id="toolName"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Docker, Kubernetes"
              required
            />
          </div>

          <div>
            <label htmlFor="toolDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="toolDescription"
              value={toolDescription}
              onChange={(e) => setToolDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Brief description of the tool"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Tool
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
