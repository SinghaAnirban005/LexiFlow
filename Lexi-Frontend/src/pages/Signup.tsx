import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserPlus } from 'lucide-react';
import axios from 'axios';

type SignUpForm = {
    email: string,
    full_name: string,
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
      const signupReq = await axios.post('http://127.0.0.1:8080/signup', {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        username: data.username
      })
      
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
            name="full_name"
            type="text"
            register={register}
            error={errors.full_name?.message}
          />

          <Input
            label="Username"
            name="username"
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