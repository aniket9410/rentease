// components/SplashScreen.tsx

'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SplashScreen: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const splashShown = sessionStorage.getItem('splashShown');
    if (!splashShown) {
      setIsMounted(true);
      setIsVisible(true);
      sessionStorage.setItem('splashShown', 'true');

      const timer = window.setTimeout(() => {
        setIsVisible(false);
        window.setTimeout(() => setIsMounted(false), 500); // Match transition duration
      }, 500);

      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`
      fixed inset-0 
      flex flex-col items-center justify-center 
      bg-white
      z-[9999] 
      transition-opacity duration-500
      ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* Logo */}
      <div className="text-4xl mb-8 font-bold text-gray-800 dark:text-white">
        <Image
                    alt="Logo"
                    className="hidden md:block cursor-pointer"
                    height="100"
                    width="100"
                    src="/images/logo.png"
                />
      </div>
      
      {/* Spinner */}
      <div className="h-12 w-12 border-4 border-gray-200 rounded-full 
                      border-l-blue-500 animate-spin" />
    </div>
  );
};

export default SplashScreen;