import React from 'react';

export function Footer() {
  return (
    <footer className="container mx-auto px-6 py-8 text-center text-gray-400">
      <p>© {new Date().getFullYear()} LucidFlow. All rights reserved.</p>
    </footer>
  );
}