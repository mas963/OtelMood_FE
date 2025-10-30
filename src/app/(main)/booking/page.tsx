"use client";

import { BookingService } from "@/services/BookingService";
import { Booking } from "@/types/booking";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import {
  DataTable,
  DataTableFilterEvent,
  DataTableFilterMeta,
  DataTablePageEvent,
  DataTableSortEvent
} from "primereact/datatable";
import { SplitButton } from "primereact/splitbutton";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { RoomType } from "@/types/room";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import BookingDialog from "@/components/booking/BookingDialog";

interface LazyTableState {
  first: number;
  rows: number;
  page: number;
  sortField?: string;
  sortOrder?: number;
  filters: DataTableFilterMeta;
}

interface TableType {
  name: string;
  value: string;
}

const BookingPage = () => {
  const [booking, setBooking] = useState<Booking[]>([]);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [value, setValue] = useState("");
  const [bookingDialog, setBookingDialog] = useState<boolean>(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<RoomType | null>(null);
  const toast = useRef<Toast>(null);
  const [lazyState, setLazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      'roomName': { value: '', matchMode: 'contains' },
      'roomType': { value: [], matchMode: 'in' },
      'source': { value: [], matchMode: 'in' },
      'customerName': { value: '', matchMode: 'contains' },
      'arrival': { value: '', matchMode: 'contains' },
      'departure': { value: '', matchMode: 'contains' },
      'bookingId': { value: '', matchMode: 'contains' },
    }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const tableTypes: TableType[] = [
    { name: "Beklenenler", value: "beklenenler" },
    { name: "Konaklayanlar", value: "konaklayanlar" },
    { name: "Ayrılacaklar", value: "ayrilacaklar" },
    { name: "Tümü", value: "tumu" },
  ];

  const roomTypes: RoomType[] = [
    { name: "Standart", shortName: "STD" },
    { name: "Deluxe", shortName: "DLX" },
    { name: "Suite", shortName: "SUI" },
  ];

  const sources = [
    { name: "Resepsiyon", code: "resepsiyon" },
    { name: "Tatilbudur", code: "tatilbudur" },
  ];

  const [tableType, setTableType] = useState<string>(tableTypes[3].value);

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
      command: () => {
      },
    },
    {
      label: "Deneme 2",
      command: () => {
      },
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

  const handleSaveBooking = () => {
    // Handle save booking logic here
    toast.current?.show({
      severity: "success",
      summary: "Başarılı",
      detail: "Rezervasyon başarıyla oluşturuldu",
    });
  };

  const sourceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={sources}
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

  const roomNameFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
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
        <Tag>{days} Gün</Tag>
      </div>
    );
  };

  const headerTemplate = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="w-full overflow-x-auto pb-2">
          <div className="inline-flex min-w-max">
            <SelectButton
              value={tableType}
              onChange={(e: SelectButtonChangeEvent) => setTableType(e.value)}
              optionLabel="name"
              options={tableTypes}
              optionValue="value"
              className="flex-nowrap"
            />
          </div>
        </div>
        <div className="w-full sm:w-auto flex-shrink-0">
          <Button
            label="Rezervasyon Ekle"
            icon="pi pi-plus"
            onClick={() => setBookingDialog(true)}
            className="whitespace-nowrap min-w-fit w-full sm:w-auto"
            size="small"
          />
        </div>
      </div>
    )
  }

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
            header={headerTemplate}
          >
            <Column
              field="roomName"
              header="Oda No"
              sortable
              filter
              filterField="roomName"
              showFilterMenu={false}
              filterElement={roomNameFilterTemplate}
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
              field="source"
              header="Kaynak"
              sortable
              filter
              filterField="source"
              showFilterMenu={false}
              filterElement={sourceFilterTemplate}
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

      <BookingDialog
        visible={bookingDialog}
        onHide={() => setBookingDialog(false)}
        onSave={handleSaveBooking}
      />
    </>
  );
};

export default BookingPage;
