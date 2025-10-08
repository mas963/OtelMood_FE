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

const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const data = RoomService.getRooms();
    setRooms(data);
  }, []);

  const headerTemplate = (data: Room) => {
    return (
      <div className="flex items-center gap-2">
        <i className="pi pi-equals"></i>
        <span className="font-bold">{data.roomType.name} Odaları</span>
      </div >
    );
  };

  const footerTemplate = (data: Room) => {
    return (
      <>
        <td colSpan="4">
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
    <div className="grid md:grid-cols-[5fr_1fr] grid-cols-1 gap-3">
      <div>
        <Card title="Oda Listesi">
          <DataTable value={rooms} rowGroupMode="subheader" groupRowsBy="roomType.name" sortMode="single" sortField="roomType.name"
            sortOrder={1} scrollable scrollHeight="650px" rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
            <Column field="roomName" header="Oda" bodyStyle={{ fontWeight: 'bold' }}></Column>
            <Column field="groupName" header="Grup"></Column>
            <Column field="status" header="Durum"></Column>
            <Column field="active" header="Aktif" body={activeBodyTemplate}></Column>
          </DataTable>
        </Card>
      </div>

      <div className="">
        <Card title="İşlemler" className="h-max">
          <Button className="w-full" label="Oda Ekle" icon="pi pi-plus" />
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
  );
};

export default RoomPage