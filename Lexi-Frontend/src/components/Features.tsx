import React from 'react';
import { Sparkles, Brain, Shield } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart Responses",
      description: "Advanced AI that understands context and provides intelligent, relevant answers."
    },
    {
      icon: Brain,
      title: "Learning AI",
      description: "Our AI continuously learns and adapts to provide better responses over time."
    },
    {
      icon: Shield,
      title: "Secure Chat",
      description: "End-to-end encryption ensures your conversations remain private and secure."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-24">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}