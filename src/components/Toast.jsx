import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto
            bg-white text-gray-900 
            px-6 py-4 
            rounded-lg 
            shadow-2xl 
            min-w-[300px] 
            max-w-[90vw]
            flex items-center gap-3
            transition-all duration-300 ease-in-out
            animate-[slideDown_0.3s_ease-out]
            ${toast.type === 'success' ? 'border-l-4 border-green-500' : ''}
            ${toast.type === 'error' ? 'border-l-4 border-red-500' : ''}
            ${toast.type === 'info' ? 'border-l-4 border-blue-500' : ''}
          `}
        >
          {/* Icon */}
          {toast.type === 'success' && (
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.type === 'info' && (
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}

          {/* Message */}
          <p className="flex-1 font-medium text-sm">{toast.message}</p>

          {/* Undo button */}
          {toast.onUndo && (
            <button
              onClick={() => {
                toast.onUndo();
                removeToast(toast.id);
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex-shrink-0 mr-2"
            >
              Undo
            </button>
          )}

          {/* Close button */}
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;

