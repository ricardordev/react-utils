import { Link } from 'react-router-dom';
import { LogInIcon, LayoutDashboardIcon } from 'lucide-react';

export function NavigationButtons() {
    return (
        <div className="flex gap-4 p-6 justify-center border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/40 transition-colors duration-200">

            {/* Botão de Login */}
            <div className="flex flex-col items-center gap-2 max-w-xs text-center">
                <Link
                    to="/sign"
                    className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 px-6 py-3 rounded-xl transition-all"
                >
                    <LogInIcon size={20} />
                    <span>Sign in / Sign up</span>
                </Link>
                <p className="text-xs text-neutral-500">
                    Sign in / Sign up for an account<br />and manage your consumption data.
                </p>
            </div>

            {/* Botão de Dashboard */}
            <div className="flex flex-col items-center gap-2 max-w-xs text-center">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-xl transition-all"
                >
                    <LayoutDashboardIcon size={20} />
                    <span>Go to Dashboard</span>
                </Link>
                <p className="text-xs text-neutral-500">
                    Visualize your transactions, history<br />and metrics in real time.
                </p>
            </div>

        </div>
    );
}