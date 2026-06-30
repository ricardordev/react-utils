import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { SignInUp } from './pages/SignInUp';
import { Dashboard } from './pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign',
    element: <SignInUp />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
]);