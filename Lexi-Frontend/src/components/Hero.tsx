import React from 'react';
import { Button } from './Button';

export function Hero() {
  return (
    <div className="justify-center text-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Experience the Next Generation of AI Chat
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Engage in natural conversations, get instant answers, and explore the possibilities
        of artificial intelligence with our advanced chat platform.
      </p>
      <div>
        <Button styles="inline-block" variant="primary">Get Started Free</Button>
      </div>
    </div>
  );
}