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
  let emptyRoomType: RoomType = {
    name: "",
    shortName: "",
  };

  const [visible, setVisible] = useState(false);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomType, setRoomType] = useState<RoomType>(emptyRoomType);
  const [deleteRoomTypeDialog, setDeleteRoomTypeDialog] = useState<boolean>(false);

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
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="shortName" className="block">Kısaltma</label>
              <InputText
                className="w-full"
                id="shortName"
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
              <div className="col-span-2">
                <label className="block text-xs">1. Yetişkin Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs">2. Yetişkin Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs">3. Yetişkin Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs">4. Yetişkin Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-3 mt-3 bg-gray-100 p-3">
              <div className="col-span-2">
                <label className="block text-xs">1. Çocuk Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs">2. Çocuk Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs">3. Çocuk Çarpanı</label>
                <InputNumber
                  inputClassName="w-full"
                />
              </div>
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