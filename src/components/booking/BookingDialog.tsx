"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { Column, ColumnEditorOptions, ColumnEvent } from "primereact/column";
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

  // Reset form when dialog is closed
  useEffect(() => {
    if (!visible) {
      // Reset all form fields
      setSelectedRoom(initialRoom || null);
      setCheckInDate(initialDate || null);
      setGuestCount(1);
      setChecked1(false);
      // Reset guests to just the default one
      setGuests([{
        name: "Ahmet",
        lastName: "Yılmaz",
        nationality: "Türk",
        idNumber: "11111111111",
        gender: "Erkek",
        birthDate: "1990-01-01",
        phone: "5442031073",
        email: "ahmet.yilmaz@gmail.com",
      }]);
    }
  }, [visible]);

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

  const genders = [
    { name: "Erkek", code: "erkek" },
    { name: "Kadın", code: "kadın" },
  ];

  const nationalities = [
    { name: "Türk", code: "turkish" },
    { name: "İngiliz", code: "english" },
    { name: "Rus", code: "russian" },
    { name: "Alman", code: "german" },
    { name: "Arap", code: "arabic" },
    { name: "Kore", code: "korean" },
    { name: "Japon", code: "japanese" },
    { name: "Çin", code: "chinese" },
    { name: "İtalyan", code: "italian" },
    { name: "Fransız", code: "french" },
    { name: "İspanyol", code: "spanish" },
  ];

  // Initialize or update guests when component mounts or guestCount changes
  useEffect(() => {
    if (guestCount <= 0) return;

    setGuests(prevGuests => {
      // If we have existing guests, use them as a base
      if (prevGuests.length > 0) {
        const newGuests = [...prevGuests];
        
        // If we need to add more guests
        while (newGuests.length < guestCount) {
          newGuests.push({
            name: `Misafir ${newGuests.length + 1}`,
            lastName: "",
            nationality: "",
            idNumber: "",
            gender: "",
            birthDate: "",
            phone: "",
            email: "",
          });
        }
        
        // If we need to remove guests
        if (newGuests.length > guestCount) {
          return newGuests.slice(0, guestCount);
        }
        
        return newGuests;
      }
      
      // Initial load - create first guest with default values
      return [{
        name: "Ahmet",
        lastName: "Yılmaz",
        nationality: "Türk",
        idNumber: "11111111111",
        gender: "Erkek",
        birthDate: "1990-01-01",
        phone: "5442031073",
        email: "ahmet.yilmaz@gmail.com",
      }];
    });
  }, [guestCount]);

  // Handle save button click
  const handleSave = () => {
    onSave();
    onHide();
  };

  const handleHide = () => {
    onHide();
    // The form will be reset by the useEffect when visible becomes false
  };

  // Footer content
  const footerContent = (
    <div>
      <Button
        label="Vazgeç"
        icon="pi pi-times"
        severity="secondary"
        onClick={handleHide}
        className="mr-2"
      />
      <Button
        label="Oluştur"
        onClick={handleSave}
      />
    </div>
  );

  const cellEditor = (options: ColumnEditorOptions) => {
    switch (options.field) {
      case 'nationality':
        return nationalityEditor(options);
      case 'gender':
        return genderEditor(options);
      case 'birthDate':
        return birthDateEditor(options);
      default:
        return textEditor(options);
    }
  };

  const onCellEditComplete = (e: ColumnEvent) => {
    const { rowData, newValue, field } = e;

    if (newValue !== null && newValue !== undefined) {
      setGuests(prevGuests => {
        return prevGuests.map(guest => 
          guest === rowData ? { ...guest, [field]: newValue } : guest
        );
      });
    }
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const nationalityEditor = (options: ColumnEditorOptions) => {
    const selectedNationality = nationalities.find(n => n.name === options.value) || null;

    return (
      <Dropdown
        value={selectedNationality}
        options={nationalities}
        optionLabel="name"
        onChange={(e: DropdownChangeEvent) => {
          options.editorCallback(e.value ? e.value.name : '');
        }}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Seçiniz"
        className="w-full"
      />
    );
  };

  const genderEditor = (options: ColumnEditorOptions) => {
    const selectedGender = genders.find(g => g.name === options.value) || null;

    return (
      <Dropdown
        value={selectedGender}
        options={genders}
        optionLabel="name"
        onChange={(e: DropdownChangeEvent) => {
          options.editorCallback(e.value ? e.value.name : '');
        }}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Seçiniz"
        className="w-full"
      />
    );
  };

  const birthDateEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="date"
        value={options.value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

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
            <span className="col-span-8 font-semibold">Birincil Misafir</span>
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
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="lastName"
                    header="Soyadı"
                    style={{ minWidth: '100px' }}
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="nationality"
                    header="Uyruk"
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="idNumber"
                    header="Kimlik No"
                    style={{ minWidth: '150px' }}
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="gender"
                    header="Cinsiyet"
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="birthDate"
                    header="Doğum Tarihi"
                    style={{ minWidth: '120px' }}
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="phone"
                    header="Telefon"
                    style={{ minWidth: '140px' }}
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
                  />
                  <Column
                    field="email"
                    header="E-posta"
                    style={{ minWidth: '150px' }}
                    editor={(options) => cellEditor(options)}
                    onCellEditComplete={onCellEditComplete}
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
