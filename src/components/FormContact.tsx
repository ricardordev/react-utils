import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLogStore } from '../store/useLogStore';

// interface for form data
interface FormContact {
  name: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

export function FormContact() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormContact>();

  const addLog = useLogStore((state) => state.addLog);

  const onSubmit = (data: FormContact) => {
    console.log('Form data:', data);
    
    // backend API call simulation ...
    toast.success('API call simulated', {
      description: 'Check console for form data.'
    });
    
    // add log to global state
    addLog(`Form submitted successfully with data: ${JSON.stringify(data)}`, 'success');
  };

  // observe password field to validate confirm password
  const password = watch("password");

  return (
    <section className="bg-transparent border border-neutral-700 p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-3">
        <span className="bg-sky-950 text-sky-400 size-10 rounded-lg flex items-center justify-center font-black">1.</span>
        Sample Form
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
          <input
            type="text"
            className={`w-full bg-neutral-950 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">E-mail</label>
          <input
            type="email"
            className={`w-full bg-neutral-950 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
            {...register('email', { 
              required: 'E-mail is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid e-mail' }
            })}
          />
          {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Birthday</label>
            <input
              type="date"
              className={`w-full bg-neutral-950 border ${errors.birthday ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
              {...register('birthday', { required: 'Birthday is required' })}
            />
            {errors.birthday && <span className="text-red-400 text-xs mt-1 block">{errors.birthday.message}</span>}
          </div>

          {/* Gender (Select) */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Gender</label>
            <select
              className={`w-full bg-neutral-950 border ${errors.gender ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
              {...register('gender', { required: 'Select a gender' })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-red-400 text-xs mt-1 block">{errors.gender.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
            <input
              type="password"
              className={`w-full bg-neutral-950 border ${errors.password ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Confirm Password</label>
            <input
              type="password"
              className={`w-full bg-neutral-950 border ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors`}
              {...register('confirmPassword', { 
                required: 'Confirmation is required',
                validate: (value) => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <span className="text-red-400 text-xs mt-1 block">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-lg hover:shadow-sky-950/40"
          >
            Save Registration
          </button>
        </div>
      </form>
    </section>
  );
}