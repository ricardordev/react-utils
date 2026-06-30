import { useToggle } from '../hooks/useToggle';
import { useLogStore } from '../store/useLogStore';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface ItemProps {
  title: string;
  content: string;
}

// Subcomponent encapsuladed with its own useToggle
function AccordionItem({ title, content }: ItemProps) {
  const [isOpen, { toggle }] = useToggle(false);
  const addLog = useLogStore((state) => state.addLog);

  const handleToggle = () => {
    toggle();
    addLog(`Accordion structure toggled: "${title}" (Now: ${isOpen ? 'open' : 'closed'})`, 'info');
  };

  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/40 transition-colors duration-200">
      {/* Trigger button */}
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center p-4 text-left text-sm font-medium text-neutral-200 hover:bg-neutral-800/40 transition-colors cursor-pointer select-none"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-4 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`}
        />
      </button>

      {/* Expansible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-neutral-800/60' : 'max-h-0'}`}
      >
        <div className="p-4 text-xs text-neutral-400 leading-relaxed bg-neutral-950/60 font-mono">
          {content}
        </div>
      </div>
    </div>
  );
}

export function Accordion() {
  const faq = [
    {
      title: "How does the useToggle hook work?",
      content: "The useToggle hook initializes a basic boolean and returns immutable modifiers using the useCallback hook from React, avoiding unnecessary re-renders of memory pointers."
    },
    {
      title: "Why not use conventional useState here?",
      content: "Using a custom handler prevents human errors in typing (like forgetting the negation character '!') and standardizes state mutations in scalable teams."
    },
    {
      title: "How to integrate with native animations in Tailwind v4?",
      content: "Tailwind v4 manages transition properties by combining utility classes for direct transitions (like transition-all duration-300) mapped directly to conditional selectors in JSX."
    }
  ];

  return (
    <section className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2 m-0!">
        <HelpCircle className="text-purple-400 size-5" />
        Accordion List (Isolated useToggle)
      </h2>
      <div className="mt-3 mb-3">
        <p className="text-xs text-neutral-400">
          Instance encapsulated where each line has atomic expansion control.
        </p>
      </div>

      <div className="space-y-2">
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </section>
  );
}