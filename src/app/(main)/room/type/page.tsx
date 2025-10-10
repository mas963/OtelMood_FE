'use client';

import { RoomService } from "@/services/RoomService";
import { RoomType } from "@/types/room";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

const RoomTypePage = () => {
  let emptyRoomType: RoomType = {
    name: "",
    shortName: "",
  };

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomType, setRoomType] = useState<RoomType>(emptyRoomType);
  const [deleteRoomTypeDialog, setDeleteRoomTypeDialog] = useState<boolean>(false);
  const [roomTypeDialog, setRoomTypeDialog] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

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
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRoomTypeDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteRoomType} />
    </div>
  );

  useEffect(() => {
    const data = RoomService.getRoomTypes();
    setRoomTypes(data);
  }, []);

  const roomProgressBody = (rowData: RoomType) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-cog" severity="secondary" rounded outlined />
        <Button icon="pi pi-trash" severity="danger" onClick={() => confirmDeleteRoomType(rowData)} rounded outlined />
      </div>
    );
  };

  const hideDialog = () => {
    setRoomTypeDialog(false);
  };

  const roomTypeDialogFooter = (
    <div>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" />
    </div>
  );

  const openNew = () => {
    setRoomType(emptyRoomType);
    setSubmitted(false);
    setRoomTypeDialog(true);
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
              <Column body={roomProgressBody} style={{ width: "10rem" }}></Column>
            </DataTable>
          </Card>
        </div>
        <Card title="İşlemler" className="h-max">
          <Button className="w-full" label="Oda Tipi Ekle" onClick={openNew} />
        </Card>
      </div>

      <Dialog visible={deleteRoomTypeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRoomTypeDialogFooter} onHide={hideDeleteRoomTypeDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {roomType && (
            <span>
              Are you sure you want to delete <b>{roomType.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog visible={roomTypeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Room Type Details" modal className="p-fluid" footer={roomTypeDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">
            Tip Adı
          </label>
          <InputText id="name" value={roomType.name} required autoFocus className={classNames({ 'p-invalid': submitted && !roomType.name })} />
          {submitted && !roomType.name && <small className="p-error">Name is required.</small>}
        </div>

        <div className="field mt-3">
          <label htmlFor="shortName">
            Kısaltma
          </label>
          <InputText id="shortName" value={roomType.shortName} required autoFocus className={classNames({ 'p-invalid': submitted && !roomType.shortName })} />
          {submitted && !roomType.shortName && <small className="p-error">Short Name is required.</small>}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="field col">
            <label htmlFor="price">
              Ücret
            </label>
            <InputNumber id="price" mode="currency" currency="USD" locale="en-US" />
          </div>
          <div className="field col">
            <label htmlFor="quantity">
              Kapasite
            </label>
            <InputNumber id="quantity"  />
          </div>
        </div>
      </Dialog>
    </>
  )
};

export default RoomTypePage