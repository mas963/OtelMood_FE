'use client';

import { RoomService } from "@/services/RoomService";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { RoomType } from "@/types/room";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";

const RoomTypePage = () => {
  const [visible, setVisible] = useState(false);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomType, setRoomType] = useState<RoomType | undefined>();
  const [deleteRoomTypeDialog, setDeleteRoomTypeDialog] = useState<boolean>(false);
  const [newRoomType, setNewRoomType] = useState<RoomType>({
    name: '',
    shortName: '',
    guestSettings: {
      guestCount: {
        minGuests: 1,
        maxGuests: 2,
        minAdults: 1,
        maxAdults: 2,
        maxChildren: 0
      },
      adultGuestMultiplier: [],
      childGuestMultiplier: []
    }
  });

  const toast = useRef<Toast>(null);

  const confirmDeleteRoomType = (roomType: RoomType) => {
    setRoomType(roomType);
    setDeleteRoomTypeDialog(true);
  };

  const hideDeleteRoomTypeDialog = () => {
    setDeleteRoomTypeDialog(false);
  };

  const deleteRoomType = () => {
    setDeleteRoomTypeDialog(false);
    toast.current?.show({ severity: "success", summary: "Successful", detail: "Room Type Deleted", life: 3000 });
  };

  const onNewRoomTypeChange = (value: any, name: string) => {
    const keys = name.split('.');
    setNewRoomType(prev => {
      const newState = { ...prev };
      let current: any = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const onChildMultiplierChange = (value: number | null | undefined, index: number) => {
    setNewRoomType(prev => {
      const newMultipliers = [...prev.guestSettings.childGuestMultiplier];
      newMultipliers[index] = { ...newMultipliers[index], multiplier: value || 0 };

      return {
        ...prev,
        guestSettings: {
          ...prev.guestSettings,
          childGuestMultiplier: newMultipliers
        }
      };
    });
  };

  const onMultiplierChange = (value: number | null | undefined, index: number) => {
    setNewRoomType(prev => {
      const newMultipliers = [...prev.guestSettings.adultGuestMultiplier];
      newMultipliers[index] = { ...newMultipliers[index], multiplier: value || 0 };

      return {
        ...prev,
        guestSettings: {
          ...prev.guestSettings,
          adultGuestMultiplier: newMultipliers
        }
      };
    });
  };

  useEffect(() => {
    const min = newRoomType.guestSettings.guestCount.minAdults || 1;
    const max = newRoomType.guestSettings.guestCount.maxAdults || 1;
    const existingMultipliers = newRoomType.guestSettings.adultGuestMultiplier;
    const newMultipliers: RoomType['guestSettings']['adultGuestMultiplier'] = [];

    for (let i = min; i <= max; i++) {
      const existing = existingMultipliers.find(m => m.count === i);
      if (existing) {
        newMultipliers.push(existing);
      } else {
        newMultipliers.push({ count: i, multiplier: 0 });
      }
    }

    setNewRoomType(prev => ({
      ...prev,
      guestSettings: {
        ...prev.guestSettings,
        adultGuestMultiplier: newMultipliers
      }
    }));
  }, [newRoomType.guestSettings.guestCount.minAdults, newRoomType.guestSettings.guestCount.maxAdults]);

  useEffect(() => {
    const max = newRoomType.guestSettings.guestCount.maxChildren || 0;
    const existingMultipliers = newRoomType.guestSettings.childGuestMultiplier;
    const newMultipliers: RoomType['guestSettings']['childGuestMultiplier'] = [];

    for (let i = 1; i <= max; i++) {
      const existing = existingMultipliers.find(m => m.count === i);
      if (existing) {
        newMultipliers.push(existing);
      } else {
        newMultipliers.push({ count: i, multiplier: 0 });
      }
    }

    setNewRoomType(prev => ({
      ...prev,
      guestSettings: {
        ...prev.guestSettings,
        childGuestMultiplier: newMultipliers
      }
    }));
  }, [newRoomType.guestSettings.guestCount.maxChildren]);

  const generateChildMultipliers = () => {
    return newRoomType.guestSettings.childGuestMultiplier.map((multiplier, index) => (
      <div className="col-span-2" key={multiplier.count}>
        <label className="block text-xs">{multiplier.count}. Çocuk Çarpanı</label>
        <InputNumber
          inputClassName="w-full"
          value={multiplier.multiplier}
          onValueChange={(e) => onChildMultiplierChange(e.value, index)}
        />
      </div>
    ));
  };

  const generateAdultMultipliers = () => {
    return newRoomType.guestSettings.adultGuestMultiplier.map((multiplier, index) => (
      <div className="col-span-2" key={multiplier.count}>
        <label className="block text-xs">{multiplier.count}. Yetişkin Çarpanı</label>
        <InputNumber
          inputClassName="w-full"
          value={multiplier.multiplier}
          onValueChange={(e) => onMultiplierChange(e.value, index)}
        />
      </div>
    ));
  };

  const deleteRoomTypeDialogFooter = (
    <div>
      <Button label="İptal" icon="pi pi-times" outlined onClick={hideDeleteRoomTypeDialog} />
      <Button label="Onayla" icon="pi pi-check" severity="danger" onClick={deleteRoomType} />
    </div>
  );

  useEffect(() => {
    const data = RoomService.getRoomTypes();
    setRoomTypes(data);
  }, []);

  const roomTypeOperationsBody = (rowData: RoomType) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pen-to-square" severity="secondary" rounded outlined />
        <Button icon="pi pi-trash" severity="danger" onClick={() => confirmDeleteRoomType(rowData)} rounded outlined />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="grid md:grid-cols-[5fr_1fr] grid-cols-1 gap-3">
        <div className="">
          <Card title="Oda Tipleri">
            <DataTable value={roomTypes}>
              <Column field="name" header="Adı"></Column>
              <Column field="shortName" header="Kısa Adı"></Column>
              <Column body={roomTypeOperationsBody} style={{ width: "10rem" }}></Column>
            </DataTable>
          </Card>
        </div>
        <Card title="İşlemler" className="h-max">
          <Button className="w-full" icon="pi pi-plus" label="Oda Tipi Ekle" onClick={() => setVisible(true)} />
        </Card>
      </div>

      <Dialog visible={deleteRoomTypeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Oda Tipi Sil" modal footer={deleteRoomTypeDialogFooter} onHide={hideDeleteRoomTypeDialog}>
        <div className="flex items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {roomType && (
            <span>
              <b>{roomType.name}</b> adlı oda tipini silmek istediğinize emin misiniz?
            </span>
          )}
        </div>
      </Dialog>

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        style={{
          width: '30rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <h2>Oda Tipi Ekle</h2>

          <div className="grid grid-cols-8 gap-3 mt-3">
            <div className="col-span-4">
              <label htmlFor="name" className="block">Oda Tipi Adı *</label>
              <InputText
                className="w-full"
                id="name"
                value={newRoomType.name}
                onChange={(e) => onNewRoomTypeChange(e.target.value, 'name')}
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="shortName" className="block">Kısaltma</label>
              <InputText
                className="w-full"
                id="shortName"
                value={newRoomType.shortName}
                onChange={(e) => onNewRoomTypeChange(e.target.value, 'shortName')}
              />
            </div>
          </div>


          <div className="mt-3">
            <Divider align="left">
              <div className="flex items-center">
                <i className="pi pi-user mr-2"></i>
                <b>Kişi Bilgisi</b>
              </div>
            </Divider>
            <div className="grid grid-cols-8 gap-3">
              <div className="col-span-4">
                <label htmlFor="minGuest" className="block">Min Kişi</label>
                <InputNumber
                  id="minGuest"
                  inputClassName="w-full"
                  min={1}
                  max={10}
                  showButtons
                  value={newRoomType.guestSettings.guestCount.minGuests}
                  onValueChange={(e) => onNewRoomTypeChange(e.value, 'guestSettings.guestCount.minGuests')}
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="maxGuest" className="block">Max Kişi *</label>
                <InputNumber
                  id="maxGuest"
                  inputClassName="w-full"
                  min={1}
                  max={10}
                  showButtons
                  value={newRoomType.guestSettings.guestCount.maxGuests}
                  onValueChange={(e) => onNewRoomTypeChange(e.value, 'guestSettings.guestCount.maxGuests')}
                />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-3">
              <div className="col-span-4">
                <label htmlFor="minAdult" className="block">Min Yetişkin</label>
                <InputNumber
                  id="minAdult"
                  inputClassName="w-full"
                  min={1}
                  max={10}
                  showButtons
                  value={newRoomType.guestSettings.guestCount.minAdults}
                  onValueChange={(e) => onNewRoomTypeChange(e.value, 'guestSettings.guestCount.minAdults')}
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="maxAdult" className="block">Max Yetişkin</label>
                <InputNumber
                  id="maxAdult"
                  inputClassName="w-full"
                  min={1}
                  max={10}
                  showButtons
                  value={newRoomType.guestSettings.guestCount.maxAdults}
                  onValueChange={(e) => onNewRoomTypeChange(e.value, 'guestSettings.guestCount.maxAdults')}
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-3">
              <div className="col-span-4">
                <label htmlFor="maxChild" className="block">Max Çocuk</label>
                <InputNumber
                  id="maxChild"
                  inputClassName="w-full"
                  min={1}
                  max={10}
                  showButtons
                  value={newRoomType.guestSettings.guestCount.maxChildren}
                  onValueChange={(e) => onNewRoomTypeChange(e.value, 'guestSettings.guestCount.maxChildren')}
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Divider align="left">
              <div className="flex items-center">
                <i className="pi pi-money-bill mr-2"></i>
                <b>Fiyat Çarpanları</b>
              </div>
            </Divider>

            <div className="grid grid-cols-8 gap-3 mt-3 bg-gray-100 p-3">
              {generateAdultMultipliers()}
            </div>

            <div className="grid grid-cols-8 gap-3 mt-3 bg-gray-100 p-3">
              {generateChildMultipliers()}
            </div>

          </div>

          <div className="mt-auto pt-4">
            <Button
              label="Kaydet"
              icon="pi pi-check"
              onClick={() => setVisible(false)}
              className="w-full"
            />
          </div>
        </div>

      </Sidebar>
    </>
  )
};

export default RoomTypePage