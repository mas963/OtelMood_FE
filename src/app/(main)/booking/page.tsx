'use client';

import { BookingService } from "@/services/BookingService";
import { Booking } from "@/types/booking";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SplitButton } from "primereact/splitbutton";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { ButtonGroup } from "primereact/buttongroup";
import { RoomType } from "@/types/room";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Toast } from "primereact/toast";

const RezervationPage = () => {
  const [booking, setBooking] = useState<Booking[]>([]);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [value, setValue] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType | null>(null);
  const roomTypes: RoomType[] = [
    { name: 'Standart', shortName: 'STD' },
    { name: 'Aile', shortName: 'Aile' },
    { name: 'Deluxe', shortName: 'Deluxe' },
    { name: 'Suite', shortName: 'Suite' },
  ];

  const [checked, setChecked] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    const data = BookingService.getRezervations();
    setBooking(data);
  }, []);

  const items = [
    {
      label: 'Deneme 1',
      command: () => {

      }
    },
    {
      label: 'Deneme 2',
      command: () => {

      }
    },
  ];

  const save = () => {
    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
  };

  const bookingProgressBody = (rowData: Booking) => {
    return (
      <div className="flex">
        <SplitButton severity="info" icon="pi pi-id-card" size="small" onClick={save} model={items} />
      </div>
    );
  };

  return (
    <>
      <div className="grid md:grid-cols-[5fr_1fr] grid-cols-1 gap-3">
        <div>
          <Card title="Rezervasyonlar">
            <DataTable value={booking} stripedRows tableStyle={{ minWidth: '50rem' }}>
              <Column header="Oda" body={(rowData: Booking) => rowData.roomNo + " - " + rowData.roomType}></Column>
              <Column field="agent" header="Acenta"></Column>
              <Column field="customerName" header="Misafir Adı"></Column>
              <Column field="arrival" header="Giriş"></Column>
              <Column field="departure" header="Çıkış"></Column>
              <Column header="Gece" body={(rowData: Booking) => {
                const arrivalTime = new Date(rowData.arrival).getTime();
                const departureTime = new Date(rowData.departure).getTime();
                const days = Math.round((departureTime - arrivalTime) / (1000 * 60 * 60 * 24));
                return `${days} Gece`;
              }}></Column>
              <Column field="rezervationId" header="Rez Id"></Column>
              <Column body={bookingProgressBody} style={{ width: "10rem" }}></Column>
            </DataTable>
          </Card>
        </div>
        <div>
          <Card title="İşlem" className="h-max">
            <Button className="w-full" label="Yeni Rezervasyon" icon="pi pi-plus" />
            <div className="flex mt-3">
              <ButtonGroup>
                <Button size="small" icon="pi pi-file-excel" />
                <Button size="small" icon="pi pi-print" />
                <Button size="small" icon="pi pi-file-pdf" />
              </ButtonGroup>
            </div>
          </Card>
          <Card title="Filtre" className="h-max mt-3">
            <div className="">
              <InputText placeholder="Ara (Oda No,Misafir Adı)" className="w-full" id="search" value={value} onChange={(e) => setValue(e.target.value)} />
              <div className="mt-3">
                <Calendar className="w-full" placeholder="Tarih Aralığı" id="dates" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection showButtonBar />
              </div>
              <div className="mt-3">
                <MultiSelect value={selectedRoomTypes} onChange={(e: MultiSelectChangeEvent) => setSelectedRoomTypes(e.value)} options={roomTypes} optionLabel="name"
                  placeholder="Oda Tipi" maxSelectedLabels={3} className="w-full md:w-20rem" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
};

export default RezervationPage