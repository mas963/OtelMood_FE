"use client";

import { BookingService } from "@/services/BookingService";
import { Booking } from "@/types/booking";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterEvent, DataTableFilterMeta, DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { SplitButton } from "primereact/splitbutton";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { ButtonGroup } from "primereact/buttongroup";
import { RoomType } from "@/types/room";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

interface LazyTableState {
  first: number;
  rows: number;
  page: number;
  sortField?: string;
  sortOrder?: number;
  filters: DataTableFilterMeta;
}

const BookingPage = () => {
  const [bookingDialog, setBookingDialog] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking[]>([]);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [value, setValue] = useState("");
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType | null>(
    null,
  );
  const roomTypes: RoomType[] = [
    { name: "Standart", shortName: "Standart" },
    { name: "Deluxe", shortName: "Deluxe" },
    { name: "Suite", shortName: "Suite" },
  ];
  const agentList: Agent[] = [
    { name: "Tatilbudur" },
    { name: "Walkin" },
  ];
  const [lazyState, setLazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      'roomNo': { value: '', matchMode: 'contains' },
      'roomType': { value: [], matchMode: 'in' },
      'agent': { value: [], matchMode: 'in' },
      'customerName': { value: '', matchMode: 'contains' },
      'arrival': { value: '', matchMode: 'contains' },
      'departure': { value: '', matchMode: 'contains' },
      'bookingId': { value: '', matchMode: 'contains' },
    }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const loadLazyData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const data = BookingService.getBookings();
    setBooking(data);
    setLoading(false);
  }

  const onPage = (event: DataTablePageEvent) => {
    setLazyState(event);
  }

  const onSort = (event: DataTableSortEvent) => {
    setLazyState(event);
  };

  const onFilter = (event: DataTableFilterEvent) => {
    event['first'] = 0;
    setLazyState(event);
  };

  const items = [
    {
      label: "Deneme 1",
      command: () => { },
    },
    {
      label: "Deneme 2",
      command: () => { },
    },
  ];

  const save = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Data Saved",
    });
  };

  const bookingProgressBody = (rowData: Booking) => {
    return (
      <div className="flex">
        <SplitButton
          icon="pi pi-id-card"
          size="small"
          onClick={save}
          model={items}
        />
      </div>
    );
  };

  const bookingFooterContent = (
    <div>
      <Button
        label="Vazgeç"
        icon="pi pi-times"
        severity="info"
        onClick={() => setBookingDialog(false)}
      />
      <Button
        label="Oluştur"
        icon="pi pi-check"
        onClick={() => setBookingDialog(false)}
      />
    </div>
  );

  const agentFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={agentList}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Tümü"
        maxSelectedLabels={1}
        display="chip"
      />
    );
  };

  const roomTypeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={roomTypes}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Tümü"
        maxSelectedLabels={1}
        display="chip"
      />
    );
  };

  const roomNoFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        placeholder="Ara"
        className="min-w-[5rem] max-w-[5rem]"
      />
    );
  };

  const customerNameFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        placeholder="Ara"
        className="min-w-[5rem]"
      />
    );
  };

  const arrivalFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Tarih"
        className="min-w-[5rem] max-w-[5rem]"
      />
    );
  };

  const departureFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Tarih"
        className="min-w-[5rem] max-w-[5rem]"
      />
    );
  };

  const bookingIdFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        placeholder="Ara"
        className="min-w-[5rem] max-w-[5rem]"
      />
    );
  };

  const departureBodyTemplate = (rowData: Booking) => {
    const arrivalTime = new Date(rowData.arrival).getTime();
    const departureTime = new Date(rowData.departure).getTime();
    const days = Math.round(
      (departureTime - arrivalTime) / (1000 * 60 * 60 * 24),
    );

    return (
      <div className="flex items-center">
        <span className="mr-2">{rowData.departure}</span>
        <Tag severity="info">{days} Gün</Tag>
      </div>
    );
  };

  return (
    <>
      <div>
        <Card title="Rezervasyon Listesi">
          <DataTable
            value={booking}
            lazy
            filterDisplay="row"
            dataKey="bookingId"
            paginator
            first={lazyState.first}
            rows={10}
            totalRecords={totalRecords}
            onPage={onPage}
            onSort={onSort}
            sortField={lazyState.sortField}
            sortOrder={lazyState.sortOrder}
            onFilter={onFilter}
            filters={lazyState.filters}
            loading={loading}
            emptyMessage="Rezervasyon bulunamadı"
          >
            <Column
              field="roomNo"
              header="Oda No"
              sortable
              filter
              filterField="roomNo"
              showFilterMenu={false}
              filterElement={roomNoFilterTemplate}
              filterMatchMode="in"
            ></Column>
            <Column
              field="roomType"
              header="Oda Tipi"
              sortable
              filter
              filterField="roomType"
              showFilterMenu={false}
              filterElement={roomTypeFilterTemplate}
              filterMatchMode="in"
            ></Column>
            <Column
              field="agent"
              header="Acenta"
              sortable
              filter
              filterField="agent"
              showFilterMenu={false}
              filterElement={agentFilterTemplate}
              filterMatchMode="in"
            ></Column>
            <Column
              field="customerName"
              header="Misafir Adı"
              sortable
              filter
              filterField="customerName"
              showFilterMenu={false}
              filterElement={customerNameFilterTemplate}
              filterMatchMode="contains"
            ></Column>
            <Column
              field="arrival"
              header="Giriş"
              sortable
              filter
              filterField="arrival"
              showFilterMenu={false}
              filterElement={arrivalFilterTemplate}
            ></Column>
            <Column
              header="Çıkış"
              body={departureBodyTemplate}
              sortable
              filter
              filterField="departure"
              showFilterMenu={false}
              filterElement={departureFilterTemplate}
            ></Column>
            <Column
              field="bookingId"
              header="Rez Id"
              sortable
              filter
              filterField="bookingId"
              showFilterMenu={false}
              filterElement={bookingIdFilterTemplate}
              filterMatchMode="in"
            ></Column>
            <Column
              body={bookingProgressBody}
              style={{ width: "10rem" }}
            ></Column>
          </DataTable>
        </Card>
      </div>

      <Dialog
        visible={bookingDialog}
        modal
        header="Yeni Rezervasyon Oluştur"
        footer={bookingFooterContent}
        style={{ width: "75rem" }}
        onHide={() => {
          if (!bookingDialog) return;
          setBookingDialog(false);
        }}
      >
        <div className="flex gap-3">
          <div>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name1" className="block">
                  Name
                </label>
                <InputText id="name1" type="text" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="name1" className="block">
                  Name
                </label>
                <InputText id="name1" type="text" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="name1" className="block">
              Name
            </label>
            <InputText id="name1" type="text" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BookingPage;
