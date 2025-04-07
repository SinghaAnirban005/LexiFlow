import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserPlus } from 'lucide-react';

// const schema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });
type SignUpForm = {
    email: string,
    FullName: string,
    username: string,
    password: string
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpForm) => {
    try {
    //   await dispatch(signUp({ email: data.email, password: data.password }));
      navigate('/signin');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join LucidFlow today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          <Input
            label="Full Name"
            name="fullname"
            type="text"
            register={register}
            error={errors.FullName?.message}
          />

          <Input
            label="Username"
            name="Username"
            type="text"
            register={register}
            error={errors.username?.message}
          />

        <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <Button variant="primary" icon={UserPlus}>
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-500 hover:text-blue-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}