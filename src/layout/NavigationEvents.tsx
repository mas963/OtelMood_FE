'use client';

import { useContext, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutContext } from './context/layoutcontext';
import { LayoutState } from '@/types';

// Bu bileşen ekranda hiçbir şey göstermeyecek, sadece arkaplanda çalışacak
export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setLayoutState } = useContext(LayoutContext);

  useEffect(() => {
    // Menüleri kapatan state güncelleme mantığı
    setLayoutState((prev: LayoutState) => ({
      ...prev,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      profileSidebarVisible: false,
    }));
  }, [pathname, searchParams, setLayoutState]);

  return null; // Bu bileşen UI render etmez
}