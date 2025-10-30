import {AppMenuItem} from "../types";
import AppMenuitem from "./AppMenuitem";
import {MenuProvider} from "./context/menucontext";

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Genel Durum',
          icon: 'pi pi-fw pi-home', to: '/'
        }
      ]
    },
    {
      label: 'Ön Büro',
      items: [
        {
          label: 'Rezervasyon Listesi',
          icon: 'pi pi-fw pi-list',
          to: '/booking'
        },
        {
          label: 'Rezervasyon Takvimi',
          icon: 'pi pi-fw pi-calendar',
          to: '/booking/calendar'
        },
        {
          label: 'Room Rack',
          icon: 'pi pi-fw pi-th-large',
          to: '/roomrack'
        },
      ]
    },
    {
      label: 'Misafirler',
      items: [
        {
          label:
            'Misafir Listesi',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
      ]
    },
    {
      label: 'Faturalandırma',
      items: [
        {
          label: 'Açık Hesaplar',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
        {
          label: 'Kasa Hareketleri',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
      ]
    },
    {
      label: 'Raporlar',
      items: [
        {
          label: 'Doluluk Raporu',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
        {
          label: 'Günlük Gelir Raporu',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
        {
          label: 'Giriş/Çıkış Listesi Raporu',
          icon: 'pi pi-fw pi-list',
          to: '/guest'
        },
      ]
    },
    {
      label: 'Ayarlar',
      items: [
        {
          label: 'Otel Bilgileri',
          icon: 'pi pi-fw pi-info-circle',
        },
        {
          label: 'Odalar',
          icon: 'pi pi-fw pi-objects-column',
          to: '/room',
          items: [
            {
              label: 'Oda Listesi',
              icon: 'pi pi-fw pi-list',
              to: '/room'
            },
            {
              label:
                'Oda Tipleri',
              icon: 'pi pi-fw pi-sitemap',
              to: '/room/type'
            },
            {
              label: 'Kat Düzeni',
              icon: 'pi pi-fw pi-building',
              to: '/room/plan'
            },
          ]
        },
        {
          label: 'Fiyatlandırma',
          icon: 'pi pi-fw pi-money-bill',
          to: '/settings/room-rate'
        },
        {
          label: 'Kanal Yönetimi',
          icon: 'pi pi-fw pi-sitemap',
          to: '/settings/channel-management'
        },
        {
          label: 'Kullanıcılar',
          icon: 'pi pi-fw pi-users',
          to: '/settings/user-management'
        },
      ]
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label}/> :
            <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
}

export default AppMenu;