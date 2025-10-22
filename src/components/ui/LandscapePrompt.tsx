'use client';

import {useEffect, useState} from 'react';
import {Button} from 'primereact/button';
import Image from "next/image";

const LandscapePrompt = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);

      // Initial check
      if (mobile) {
        checkOrientation();
      }
    };

    // Check screen orientation
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isPortraitMode);
    };

    // Initial check
    checkIfMobile();

    // Add event listeners
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Only show prompt on mobile in portrait mode
  if (!isMobile || !isPortrait) {
    return null;
  }

  return (
    <div
      className="landscape-prompt fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4 text-center">
      <i className="pi pi-rotate-right text-6xl mb-4 text-primary-500"/>
      <Image src="/img/gif/landscape_device.gif" className="bg-primary rounded" alt="Landscape Prompt" width={200} height={200}/>
      <h2 className="text-xl font-bold mb-2">Cihazınızı Yatay Çevirin</h2>
      <p className="text-gray-600 mb-6">Bu sayfayı daha iyi görüntülemek için lütfen cihazınızı yatay konuma getirin.</p>
    </div>
  );
};

export default LandscapePrompt;
