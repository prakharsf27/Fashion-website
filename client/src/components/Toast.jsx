import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Toast() {
  const { toasts, removeToast } = useTryOn();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let borderClass = 'border-atelier-950 bg-atelier-950 text-white';
        let Icon = Info;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-900 bg-atelier-950 text-white border-l-4 border-l-emerald-400';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-900 bg-atelier-950 text-white border-l-4 border-l-rose-500';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-900 bg-atelier-950 text-white border-l-4 border-l-amber-400';
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 shadow-2xl flex items-start space-x-3 transition-all duration-300 animate-fade-in ${borderClass}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-champagne-300" />
            <div className="flex-grow text-xs font-light leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-atelier-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
