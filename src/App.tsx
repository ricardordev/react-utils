import { FormContact } from './components/FormContact';
import { SearchRepo } from './components/SearchRepo';
import { Audit } from './components/Audit';
import { Modal } from './components/Modal';
import { Accordion } from './components/Accordion';
import { NavigationButtons } from './components/NavigationButtons';
import { Toaster } from 'sonner';

export default function App() {

  return (
    // dark native theme with tailwind v4
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <Toaster closeButton richColors theme="dark" />

      <main className="max-w-7xl mx-auto space-y-12">

        {/* header */}
        <header className="border-b border-neutral-800 pb-6 text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-neutral-50 tracking-tight">
            @ricardordev/react-utils
          </h1>
          <p className="w-full text-neutral-400 text-base mx-auto">
            An example with a professional base, componentized and styled with React Hook Form, Axios, Zustand, Hooks and Tailwind CSS v4 to accelerate the development of new applications.
          </p>
        </header>

        {/* layout in two columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          {/* column 1: contact form */}
          <FormContact />

          {/* column 2: search component */}
          <SearchRepo />
        </div>

        {/* layout in one columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-1">
          {/* modal component */}
          <Modal />
        </div>

        {/* layout in one columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-1">
          {/* accordion component */}
          <Accordion />
        </div>

        {/* layout in one columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-1">
          {/* authentication components */}
          <NavigationButtons />
        </div>

        {/* layout in one columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-1">
          {/* audit component */}
          <Audit />
        </div>

        {/* footer example */}
        <footer className="mt-16 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-600">
          starter example © 2026
        </footer>
      </main>
    </div>
  );
}