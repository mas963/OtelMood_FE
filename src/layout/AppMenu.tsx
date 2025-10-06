import {AppMenuItem} from "../types";
import AppMenuitem from "./AppMenuitem";
import {MenuProvider} from "./context/menucontext";

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: 'Dashboard',
      items: [{label: 'Genel Durum', icon: 'pi pi-fw pi-home', to: '/'}]
    },
    {
      label: 'Rezervasyonlar',
      items: [
        {label: 'Yeni Rezervasyon', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Rezervasyon Listesi', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Odalar',
      items: [
        {label: 'Oda Listesi', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Oda Durumları', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Müşteriler',
      items: [
        {label: 'Müşteri Listesi', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Yeni Müşteri Ekle', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Finans & Faturalama',
      items: [
        {label: 'Fatura Oluştur', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Gelir / Gider Kayıtları', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Housekeeping',
      items: [
        {label: 'Oda Temizlik Durumu', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Personel Görev Atama', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Stok & Envanter',
      items: [
        {label: 'Stok Listesi', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Malzeme Giriş / Çıkış', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Personel',
      items: [
        {label: 'Personel Listesi', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Vardiye Planı', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Raporlama',
      items: [
        {label: 'Doluluk Oranları', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Gelir / Gider Analizi', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
    {
      label: 'Yönetim & Ayarlar',
      items: [
        {label: 'Kullanıcı Yönetimi', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout'},
        {label: 'Oda Tipi & Fiyatlandırma', icon: 'pi pi-fw pi-check-square', to: '/uikit/input'},
      ]
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
}

export default AppMenu;