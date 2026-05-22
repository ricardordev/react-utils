import { useLogStore } from '../store/useLogStore';
import { Terminal, Trash2, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Audit() {
  const { logs, clearLogs } = useLogStore();

  return (
    <section className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
        <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2 m-0!">
          <Terminal className="text-sky-400 size-5" />
          Audit using Zustand (Global State)
        </h2>
        {logs.length > 0 && (
          <button 
            onClick={clearLogs}
            className="text-neutral-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-neutral-950 transition-colors cursor-pointer"
            title="Clear History"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {logs.length === 0 ? (
          <p className="text-sm text-neutral-600 italic text-center py-4">
            No actions registered in the global state yet.
          </p>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-2.5 flex items-start gap-2 text-xs font-mono"
            >
              <span className="text-neutral-600 shrink-0">{log.timestamp}</span>
              
              {log.type === 'success' && <CheckCircle2 className="text-emerald-500 size-3.5 mt-0.5 shrink-0" />}
              {log.type === 'error' && <AlertCircle className="text-red-500 size-3.5 mt-0.5 shrink-0" />}
              {log.type === 'info' && <Info className="text-sky-500 size-3.5 mt-0.5 shrink-0" />}

              <span className="text-neutral-300 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}