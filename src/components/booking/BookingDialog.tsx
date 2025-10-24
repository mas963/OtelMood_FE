"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Guest } from "@/types/guest";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Room, RoomType } from "@/types/room";

export interface BookingDialogProps {
  visible: boolean;
  onHide: () => void;
  onSave: () => void;
  initialRoom?: Room;
  initialDate?: Date;
}

const BookingDialog = ({
  visible,
  onHide,
  onSave,
  initialRoom,
  initialDate
}: BookingDialogProps) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(initialRoom || null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(initialDate || null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [checked1, setChecked1] = useState<boolean>(false);

  // Set initial values when props change
  useEffect(() => {
    if (initialRoom) setSelectedRoom(initialRoom);
    if (initialDate) setCheckInDate(initialDate);
  }, [initialRoom, initialDate]);

  // Static data
  const roomTypes: RoomType[] = [
    { name: "Standart", shortName: "STD" },
    { name: "Deluxe", shortName: "Deluxe" },
    { name: "Suite", shortName: "Suite" },
  ];

  const rooms = [
    { roomName: "101" },
    { roomName: "102" },
    { roomName: "103" },
    { roomName: "201" },
    { roomName: "202" },
    { roomName: "203" },
    { roomName: "301" },
    { roomName: "302" },
  ];

  const sources = [
    { name: "Resepsiyon", code: "resepsiyon" },
    { name: "Tatilbudur", code: "tatilbudur" },
  ];

  const accommodationTypes = [
    { name: "Sadece Oda", code: "sadece-oda" },
    { name: "Her Şey Dahil", code: "her-sey-dahil" },
  ];

  // Initialize guests when component mounts or guestCount changes
  useEffect(() => {
    if (guestCount <= 0) return;

    const initialGuests: Guest[] = [{
      name: "Ahmet",
      lastName: "Yılmaz",
      nationality: "Türkiye",
      idNumber: "11111111111",
      gender: "Erkek",
      birthDate: "1990-01-01",
      phone: "5442031073",
      email: "ahmet.yilmaz@gmail.com",
    }];

    // Add additional guests based on guestCount
    for (let i = 1; i < guestCount; i++) {
      initialGuests.push({
        name: `Misafir ${i + 1}`,
        lastName: "",
        nationality: "",
        idNumber: "",
        gender: "",
        birthDate: "",
        phone: "",
        email: "",
      });
    }

    setGuests(initialGuests);
  }, [guestCount]);

  // Handle save button click
  const handleSave = () => {
    onSave();
    onHide();
  };

  // Footer content
  const footerContent = (
    <div>
      <Button
        label="Vazgeç"
        icon="pi pi-times"
        severity="secondary"
        onClick={onHide}
        className="mr-2"
      />
      <Button
        label="Oluştur"
        onClick={handleSave}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      modal
      header="Yeni Rezervasyon Oluştur"
      footer={footerContent}
      style={{ width: "75rem", maxWidth: "90vw" }}
      breakpoints={{ '640px': '100vw' }}
      onHide={onHide}
      className="p-fluid booking-dialog"
    >
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3">
        <div>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-3">
              <label htmlFor="arrival" className="block">Giriş</label>
              <Calendar
                className="w-full"
                inputId="arrival"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.value)}
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="departure" className="block">Çıkış</label>
              <Calendar className="w-full" inputId="departure" />
            </div>
            <div className="col-span-2">
              <label htmlFor="night" className="block">Gece</label>
              <InputNumber className="w-full" inputId="night" showButtons inputClassName="w-full" />
            </div>
          </div>

          <div className="grid gap-3 grid-cols-7 mt-3">
            <div className="col-span-3">
              <label htmlFor="source" className="block">Kaynak</label>
              <Dropdown className="w-full" inputId="source" options={sources} optionLabel="name" />
            </div>
            <div className="col-span-2">
              <label htmlFor="roomType" className="block">Oda Tipi</label>
              <Dropdown
                className="w-full"
                inputId="roomType"
                options={roomTypes}
                optionLabel="name"
                value={selectedRoom?.roomType || null}
                onChange={(e) => setSelectedRoom(prev => prev ? { ...prev, roomType: e.value } : null)}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="roomName" className="block">Oda No</label>
              <Dropdown
                className="w-full"
                inputId="roomName"
                options={rooms}
                optionLabel="roomName"
                value={selectedRoom?.roomName ? { roomName: selectedRoom.roomName } : null}
                onChange={(e) => setSelectedRoom(prev => prev ? { ...prev, roomName: e.value.roomName } : null)}
              />
            </div>
          </div>

          <div className="grid grid-cols-8 gap-3 mt-3">
            <div className="col-span-4">
              <label htmlFor="accommodationType" className="block">Konaklama Türü</label>
              <Dropdown
                className="w-full"
                inputId="accommodationType"
                options={accommodationTypes}
                optionLabel="name"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="adult" className="block">Yetişkin</label>
              <InputNumber
                value={guestCount}
                onChange={(e) => setGuestCount(e.value || 1)}
                className="w-full"
                inputId="adult"
                showButtons
                inputClassName="w-full"
                min={1}
                max={10}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="child" className="block">Çocuk</label>
              <InputNumber
                className="w-full"
                inputId="child"
                showButtons
                inputClassName="w-full"
                min={0}
                max={10}
              />
            </div>
          </div>

          <div className="grid grid-cols-8 gap-3 mt-3 bg-gray-100 p-3 rounded">
            <div className="col-span-4">
              <label htmlFor="mainGuestName" className="block">Adı</label>
              <InputText
                className="w-full"
                id="mainGuestName"
                value={guests?.[0]?.name || ''}
                onChange={(e) => {
                  if (guests && guests[0]) {
                    const newGuests = [...guests];
                    newGuests[0] = { ...newGuests[0], name: e.target.value };
                    setGuests(newGuests);
                  }
                }}
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="mainGuestLastName" className="block">Soyadı</label>
              <InputText
                className="w-full"
                id="mainGuestLastName"
                value={guests?.[0]?.lastName || ''}
                onChange={(e) => {
                  if (guests && guests[0]) {
                    const newGuests = [...guests];
                    newGuests[0] = { ...newGuests[0], lastName: e.target.value };
                    setGuests(newGuests);
                  }
                }}
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="mainGuestPhone" className="block">Telefon</label>
              <InputMask
                className="w-full"
                id="mainGuestPhone"
                mask="(999) 999-9999"
                placeholder="(999) 999-9999"
                value={guests?.[0]?.phone || ''}
                onChange={(e: InputMaskChangeEvent) => {
                  if (guests && guests[0]) {
                    const newGuests = [...guests];
                    newGuests[0] = { ...newGuests[0], phone: e.target.value || '' };
                    setGuests(newGuests);
                  }
                }}
              />
            </div>
            <div className="col-span-4">
              <label htmlFor="mainGuestEmail" className="block">Email</label>
              <InputText
                className="w-full"
                id="mainGuestEmail"
                value={guests?.[0]?.email || ''}
                onChange={(e) => {
                  if (guests && guests[0]) {
                    const newGuests = [...guests];
                    newGuests[0] = { ...newGuests[0], email: e.target.value };
                    setGuests(newGuests);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1">
            <TabView>
              <TabPanel header="Misafirler">
                <DataTable
                  value={guests}
                  editMode="cell"
                  tableStyle={{ minWidth: '50rem' }}
                  scrollable
                  scrollHeight="330px"
                >
                  <Column
                    field="name"
                    header="Adı"
                    style={{ minWidth: '100px' }}
                    frozen
                  />
                  <Column
                    field="lastName"
                    header="Soyadı"
                    style={{ minWidth: '100px' }}
                  />
                  <Column
                    field="nationality"
                    header="Uyruk"
                  />
                  <Column
                    field="idNumber"
                    header="Kimlik No"
                    style={{ minWidth: '100px' }}
                  />
                  <Column
                    field="gender"
                    header="Cinsiyet"
                  />
                  <Column
                    field="birthDate"
                    header="Doğum Tarihi"
                    style={{ minWidth: '120px' }}
                  />
                  <Column
                    field="phone"
                    header="Telefon"
                    style={{ minWidth: '140px' }}
                  />
                  <Column
                    field="email"
                    header="E-posta"
                  />
                </DataTable>
              </TabPanel>
              <TabPanel header="Fiyatlandırma">
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block">İndirim</label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                          <Checkbox
                            checked={checked1}
                            onChange={(e: CheckboxChangeEvent) => setChecked1(!checked1)}
                          />
                        </span>
                        <InputText placeholder="% indirim" disabled={!checked1} />
                      </div>
                    </div>

                    <div>
                      <label className="block">Manuel</label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                          <Checkbox
                            checked={checked1}
                            onChange={(e: CheckboxChangeEvent) => setChecked1(!checked1)}
                          />
                        </span>
                        <InputText placeholder="Tutar" disabled={!checked1} />
                      </div>
                    </div>

                    <div>
                      <label className="block">Para Birimi</label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                          <Checkbox
                            checked={checked1}
                            onChange={(e: CheckboxChangeEvent) => setChecked1(!checked1)}
                          />
                        </span>
                        <InputText placeholder="Tutar" disabled={!checked1} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary p-3 mt-8">
                    <label className="text-zinc-100 font-bold">Fiyat Çıktısı</label>
                    <div className="flex justify-between">
                      <label className="text-zinc-100">Toplam Tutar</label>
                      <label className="text-zinc-100">4000 ₺</label>
                    </div>
                    <div className="flex justify-between">
                      <label className="text-zinc-100">Alınan Tutar</label>
                      <label className="text-zinc-100">0 ₺</label>
                    </div>
                    <div className="flex justify-between font-bold text-xl">
                      <label className="text-zinc-100">Kalan Tutar</label>
                      <label className="text-zinc-100">4000 ₺</label>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Diğer Bilgiler">
                <p className="m-0">
                  Bu bölüme rezervasyonla ilgili ek bilgiler eklenecektir.
                </p>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingDialog;
