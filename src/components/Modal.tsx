import { useToggle } from '../hooks/useToggle';
import { useLogStore } from '../store/useLogStore';
import { Layers, X, Info, AlertTriangle } from 'lucide-react';

export function Modal() {
  // Clean unstructured destructuring of the hook with semantic aliases for better readability in the component context.
  const [isModalOpen, { toggle: toggleModal, setFalse: closeModal }] = useToggle(false);
  const addLog = useLogStore((state) => state.addLog);

  const handleOpen = () => {
    toggleModal();
    addLog('Example Modal opened using useToggle', 'info');
  };

  const handleClose = () => {
    closeModal();
    addLog('Example Modal closed using useToggle', 'info');
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2 m-0!">
        <Layers className="text-purple-400 size-5" />
        Modal Control (useToggle)
      </h2>
      <div className="mt-3 mb-3">
        <p className="text-xs text-neutral-400">
            Management of explicit overlay windows and closing accessibility.
        </p>
      </div>

      <button
        onClick={handleOpen}
        className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-lg hover:shadow-purple-950/30"
      >
        Open Preview Modal
      </button>

      {/* Backdrop and Container */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 max-w-md w-full rounded-2xl shadow-2xl p-6 relative overflow-hidden">
            
            {/* Top aesthetic indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Info className="text-purple-400 size-5" />
                System Diagnostics
              </h3>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-200 p-1 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3 text-sm text-neutral-300">
              <p>
                This modal is a live example of state isolation. It demonstrates how to lock external interactions without relying on complex contexts.
              </p>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex gap-2 items-start text-xs font-mono text-yellow-500/90">
                <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                <span>Notice: All layout variables are running seamlessly through Tailwind v4 theme variables.</span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}