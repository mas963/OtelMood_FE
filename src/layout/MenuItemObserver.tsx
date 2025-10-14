'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { MenuContext } from './context/menucontext';
import { AppMenuItemProps } from '../types';

// Bu bileşenin tek görevi, URL değişimini dinleyip aktif menüyü ayarlamaktır.
// Ekranda herhangi bir şey göstermez (null döner).
export const MenuItemObserver = (props: { item: AppMenuItemProps['item'], parentKey: string, index: number }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setActiveMenu } = useContext(MenuContext);

    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);

    useEffect(() => {
        if (props.item!.to && props.item!.to === pathname) {
            setActiveMenu(key);
        }
    }, [pathname, searchParams, props.item, key, setActiveMenu]);

    return null; // Bu bileşen bir UI render etmez.
};