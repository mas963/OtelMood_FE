import { AppMenuItemProps } from "../types";
import { Suspense, useContext, useEffect, useRef } from "react";
import { MenuContext } from "./context/menucontext";
import { CSSTransition } from "primereact/csstransition";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import Link from "next/link";
import { MenuItemObserver } from './MenuItemObserver';

const AppMenuitem = (props: AppMenuItemProps) => {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const item = props.item;
  const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
  const active = activeMenu === key || activeMenu.startsWith(key + '-');
  const onRouteChange = (url: string) => {
    if (item!.to && item!.to === url) {
      setActiveMenu(key);
    }
  };

  const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }

    if (item!.items) {
      setActiveMenu(active ? (props.parentKey as string) : key);
    } else {
      setActiveMenu(key);
    }
  };

  const subMenu = item!.items && item!.visible !== false && (
    (() => {
      const submenuRef = useRef<HTMLUListElement | null>(null);

      return (
        <CSSTransition nodeRef={submenuRef} timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
          <ul ref={submenuRef}>
            {item!.items.map((child, i) => {
              return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
            })}
          </ul>
        </CSSTransition>
      );
    })()
  );

  return (
    <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
      {/* URL'yi dinleyen ve state güncelleyen görünmez bileşenimiz */}
      <Suspense fallback={null}>
        <MenuItemObserver item={item} index={props.index ?? 0} parentKey={props.parentKey as string} />
      </Suspense>

      {props.root && item!.visible !== false && <div className="layout-menuitem-root-text">{item!.label}</div>}
      {(!item!.to || item!.items) && item!.visible !== false ? (
        <a href={item!.url} onClick={(e) => itemClick(e)} className={classNames(item!.class, 'p-ripple')} target={item!.target} tabIndex={0}>
          <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
          <Ripple />
        </a>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        // isActiveRoute kontrolünü kaldırdık, Next.js <Link> bunu zaten yönetiyor. İsterseniz bırakabilirsiniz.
        <Link href={item!.to} replace={item!.replaceUrl} target={item!.target} onClick={(e) => itemClick(e)} className={classNames(item!.class, 'p-ripple', { 'active-route': active })} tabIndex={0}>
          <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
          <Ripple />
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;