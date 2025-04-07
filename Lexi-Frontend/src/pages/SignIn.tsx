import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/Slice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LogIn } from 'lucide-react';
import axios from "axios"

type SignInForm = {
    email: string,
    password: string
}

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInForm) => {
    try {
      const loginReq = await axios.post('http://127.0.0.1:8080/login', {
        email: data.email,
        password: data.password
      })

      const userData = loginReq.data
      localStorage.setItem("token", userData.token)
      await dispatch(login({
        email: userData.email,
        username: userData.username
      }));

      navigate('/home');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue to LucidFlow</p>
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
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <Button variant="primary" icon={LogIn}>
            Sign In
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}