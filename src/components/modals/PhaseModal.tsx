import React from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { Phase } from '@/types';

interface PhaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase: Phase | null;
}

export const PhaseModal: React.FC<PhaseModalProps> = ({ isOpen, onClose, phase }) => {
  if (!isOpen || !phase) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {phase.name} - Items
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {phase.items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  item.status === 'complete'
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-red-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {item.status === 'complete' ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-red-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${
                      item.status === 'complete' ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      item.status === 'complete'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'complete' ? 'Complete' : 'TODO'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Total Items: <strong>{phase.items.length}</strong>
            </span>
            <span className="text-gray-600">
              Completed: <strong className="text-green-600">
                {phase.items.filter(item => item.status === 'complete').length}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
