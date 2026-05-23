import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Toaster } from 'sonner';
import { LoaderCircle } from 'lucide-react';

export function Dashboard() {
  const { user, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // checking if user is not authenticated, if not, redirect to /sign
    if (!isLoading && !user) {
      navigate('/sign', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-neutral-400">
        <LoaderCircle size={24} className="animate-spin" />
        <span className="ml-2">Checking session...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    // dark native theme with tailwind v4
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <Toaster closeButton richColors theme="dark" />

      <main className="max-w-7xl mx-auto space-y-12">

        {/* header */}
        <header className="border-b border-neutral-800 pb-6 text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-50 tracking-tight">
            react-utils /dashboard
          </h1>
          <p className="w-full text-neutral-400 text-base mx-auto">
            safe dashboard page example, protected by authentication. If you see this, it means you are logged in and the session is valid. You can implement your dashboard content here, knowing that only authenticated users can access it.
          </p>
        </header>

        {/* layout in two columns */}
        <div className="grid gap-10 grid-cols-4">
          <div>&nbsp;</div>
          <div className="p-8 col-span-2 bg-neutral-900 rounded-xl">
            <div className="text-2xl font-bold text-center">{user?.name}</div>
            <ul className="mt-4 text-neutral-400 text-center">
              <li>Login: {user?.login}</li>
              <li>E-mail: {user?.email}</li>
            </ul>
            <div className="text-center">
              <button
                onClick={logout}
                className="mt-6 bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
        </div>

        {/* footer example */}
        <footer className="mt-16 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-600">
          starter example © 2026
        </footer>
      </main>
    </div>
  );
}