
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import { toast, Toaster } from 'sonner';
import { useState } from 'react';
import { AuthService } from '../services/auth.service';
import { useForm } from 'react-hook-form';
import { LogInIcon, User, LoaderCircle } from 'lucide-react';

// interface for signin form data
interface FormSignIn {
  login: string;
  password: string;
}

// interface for signup form data
interface FormSignUp {
  login: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignInUp() {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is already authenticated, if yes, redirect to /dashboard
    if (!isLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm<FormSignIn>();
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, watch: watchSignUp, formState: { errors: errorsSignUp } } = useForm<FormSignUp>();

  const onSubmitSignin = async (data: FormSignIn) => {
    // backend API call simulation
    setIsLocalLoading(true);

    try {

      // Service that sends POST. If success, Express injects the httpOnly Cookie.
      const _user = await AuthService.signin({ login: data.login, password: data.password });
      // set user in global state
      useAuthStore.getState().setUser(_user);
      // show success toast
      toast.success('Logged in successfully', {
        description: 'Redirecting to dashboard...'
      });
      // redirect to dashboard
      navigate('/dashboard');

    } catch (err: any) {

      const message = err.response?.data?.message || 'Error connecting to server.';
      toast.error('Failed to sign in', {
        description: message
      });

    } finally {
      setIsLocalLoading(false);
    }
  };

  const onSubmitSignup = async (data: FormSignUp) => {
    // backend API call simulation
    setIsLocalLoading(true);

    try {

      // Service that sends POST. If success, Express injects the httpOnly Cookie.
      const _user = await AuthService.signup({ login: data.login, name: data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword });
      // set user in global state
      useAuthStore.getState().setUser(_user);
      // show success toast
      toast.success('Signed up successfully', {
        description: 'Redirecting to dashboard...'
      });
      // redirect to dashboard
      navigate('/dashboard');

    } catch (err: any) {

      const message = err.response?.data?.message || 'Error connecting to server.';
      toast.error('Failed to sign up', {
        description: message
      });

    } finally {
      setIsLocalLoading(false);
    }
  };

  // observe password field to validate confirm password
  const password = watchSignUp("password");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-neutral-400">
        <LoaderCircle size={24} className="animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    // dark native theme with tailwind v4
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <Toaster closeButton richColors theme="dark" />

      <main className="max-w-7xl mx-auto space-y-12">

        {/* header */}
        <header className="border-b border-neutral-800 pb-6 text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-50 tracking-tight">
            react-utils /sign
          </h1>
          <p className="w-full text-neutral-400 text-base mx-auto">
            An example with a professional base, componentized and styled with React Hook Form, Axios, Zustand, Hooks and Tailwind CSS v4 to accelerate the development of new applications.
          </p>
        </header>

        {/* layout in two columns */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          {/* column 1: sign in form */}

          <section className="bg-transparent border border-neutral-700 p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-3 border-b border-neutral-700 pb-4">
              <LogInIcon className="text-sky-400 size-5" />
              Sign In Form
            </h2>

            <form onSubmit={handleSubmitSignIn(onSubmitSignin)} className="space-y-4 pt-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Login</label>
                <input
                  type="text"
                  className={`w-full bg-neutral-950 border ${errorsSignIn.login ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                  {...registerSignIn('login', { required: 'Login is required' })}
                />
                {errorsSignIn.login && <span className="text-red-400 text-xs mt-1 block">{errorsSignIn.login.message}</span>}
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
                <input
                  type="password"
                  className={`w-full bg-neutral-950 border ${errorsSignIn.password ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                  {...registerSignIn('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
                {errorsSignIn.password && <span className="text-red-400 text-xs mt-1 block">{errorsSignIn.password.message}</span>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLocalLoading}
                  className={`w-full text-white font-semibold py-3 rounded-xl transition-colors shadow-lg 
                  ${isLocalLoading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500 cursor-pointer'}`}
                >
                  {isLocalLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>
          </section>

          {/* column 2: sign up form */}
          <section className="bg-transparent border border-neutral-700 p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-3 border-b border-neutral-700 pb-4">
              <User className="text-sky-400 size-5" />
              Sign Up
            </h2>

            <form onSubmit={handleSubmitSignUp(onSubmitSignup)} className="pt-6 space-y-4">
              {/* Login */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Login</label>
                <input
                  type="text"
                  className={`w-full bg-neutral-950 border ${errorsSignUp.login ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                  {...registerSignUp('login', { required: 'Login is required' })}
                />
                {errorsSignUp.login && <span className="text-red-400 text-xs mt-1 block">{errorsSignUp.login.message}</span>}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  className={`w-full bg-neutral-950 border ${errorsSignUp.name ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                  {...registerSignUp('name', { required: 'Name is required' })}
                />
                {errorsSignUp.name && <span className="text-red-400 text-xs mt-1 block">{errorsSignUp.name.message}</span>}
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">E-mail</label>
                <input
                  type="email"
                  className={`w-full bg-neutral-950 border ${errorsSignUp.email ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                  {...registerSignUp('email', {
                    required: 'E-mail is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid e-mail' }
                  })}
                />
                {errorsSignUp.email && <span className="text-red-400 text-xs mt-1 block">{errorsSignUp.email.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
                  <input
                    type="password"
                    className={`w-full bg-neutral-950 border ${errorsSignUp.password ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                    {...registerSignUp('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                  {errorsSignUp.password && <span className="text-red-400 text-xs mt-1 block">{errorsSignUp.password.message}</span>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    className={`w-full bg-neutral-950 border ${errorsSignUp.confirmPassword ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
                    {...registerSignUp('confirmPassword', {
                      required: 'Confirmation is required',
                      validate: (value) => value === password || 'Passwords do not match'
                    })}
                  />
                  {errorsSignUp.confirmPassword && <span className="text-red-400 text-xs mt-1 block">{errorsSignUp.confirmPassword.message}</span>}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLocalLoading}
                  className={`w-full text-white font-semibold py-3 rounded-xl transition-colors shadow-lg 
                  ${isLocalLoading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500 cursor-pointer'}`}
                >
                  {isLocalLoading ? 'Signing up...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* footer example */}
        <footer className="mt-16 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-600">
          starter example © 2026
        </footer>
      </main>
    </div>
  );
}