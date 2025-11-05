'use client';

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ButtonGroup } from 'primereact/buttongroup';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { RoomService } from "@/services/RoomService";
import { Room } from "@/types/room";
import { Tag } from "primereact/tag";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";

const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [visible, setVisible] = useState(false);
  const roomActive: string[] = ['Aktif', 'Pasif'];
  const [roomActiveValue, setRoomActiveValue] = useState<string>(roomActive[0]);

  const roomTypes: string[] = [
    "Standart",
    "Deluxe",
    "Suite",
  ];

  const floorPlans: string[] = [
    "1. Kat",
    "2. Kat",
    "3. Kat"
  ];

  useEffect(() => {
    const data = RoomService.getRooms();
    setRooms(data);
  }, []);

  const headerTemplate = (data: Room) => {
    return (
      <div className="flex items-center gap-2">
        <i className="pi pi-building"></i>
        <span className="font-bold">{data.roomType} Odaları</span>
      </div>
    );
  };

  const footerTemplate = (data: Room) => {
    return (
      <>
        <td colSpan={4}>
          <div className="flex justify-end font-bold">Toplam Oda: 50</div>
        </td>
      </>
    );
  };

  const activeBodyTemplate = (rowData: Room) => {
    return (
      <Tag severity={rowData.active ? 'success' : 'danger'}>{rowData.active ? 'Aktif' : 'Pasif'}</Tag>
    );
  };

  return (
    <>
      <div className="grid md:grid-cols-[5fr_1fr] grid-cols-1 gap-3">
        <div>
          <Card title="Oda Listesi">
            <DataTable value={rooms} rowGroupMode="subheader" groupRowsBy="roomType" sortMode="single"
              sortField="roomType"
              sortOrder={1} scrollable scrollHeight="650px" rowGroupHeaderTemplate={headerTemplate}
              rowGroupFooterTemplate={footerTemplate}>
              <Column field="roomName" header="Oda" bodyStyle={{ fontWeight: 'bold' }}></Column>
              <Column field="floorPlan" header="Grup"></Column>
              <Column field="active" header="Aktif" body={activeBodyTemplate}></Column>
            </DataTable>
          </Card>
        </div>

        <div className="">
          <Card title="İşlemler" className="h-max">
            <Button
              className="w-full"
              label="Oda Ekle" icon="pi pi-plus"
              onClick={() => setVisible(true)}
            />
            <div className="flex mt-3">
              <ButtonGroup>
                <Button size="small" icon="pi pi-file-excel" />
                <Button size="small" icon="pi pi-print" />
                <Button size="small" icon="pi pi-file-pdf" />
              </ButtonGroup>
            </div>
          </Card>
        </div>
      </div>

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
          <h2>Oda Ekle</h2>
          <div className="grid grid-cols-8 gap-3 mt-3">
            <div className="col-span-4">
              <label htmlFor="roomName" className="block">Oda Adı</label>
              <InputText
                className="w-full"
                id="roomName"
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="roomType" className="block">Oda Tipi</label>
              <Dropdown
                options={roomTypes}
                optionLabel="name"
                className="w-full"
                id="roomType"
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-3 mt-3">
            <div className="col-span-4">
              <label htmlFor="floorPlan" className="block">Kat Düzeni</label>
              <Dropdown
                options={floorPlans}
                optionLabel="name"
                className="w-full"
                id="floorPlan"
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="roomActive" className="block">Aktif</label>
              <SelectButton
                value={roomActiveValue}
                onChange={(e) => setRoomActiveValue(e.value)}
                options={roomActive}
                className="w-full"
                id="roomActive"
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
      </Sidebar>
    </>
  );
};

export default RoomPage