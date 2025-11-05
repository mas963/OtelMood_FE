'use client';

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableSelectEvent } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RoomRate, RoomRateSeason } from "@/types/room";
import { RoomService } from "@/services/RoomService";
import { ToggleButton } from "primereact/togglebutton";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";

const RoomRatesSeasonTab = () => {
    const [roomRatesSeason, setRoomRatesSeason] = useState<RoomRateSeason[]>([]);
    const [selectedRoomRateSeason, setSelectedRoomRateSeason] = useState<RoomRateSeason | null>(null);
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const items = [
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                toast.current?.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
    ];

    useEffect(() => {
        const fetchRoomRates = async () => {
            const roomRatesSeason = await RoomService.getRoomRatesSeason();
            setRoomRatesSeason(roomRatesSeason);
        };
        fetchRoomRates();
    }, []);

    const onRowSelect = (event: DataTableSelectEvent) => {
        toast.current?.show({ severity: 'info', summary: 'Sezon Seçildi', detail: `Name: ${event.data.name}`, life: 3000 });
    };

    const actionBodyTemplate = (data: RoomRateSeason) => {
        return (
            <>
                <SplitButton icon="pi pi-ellipsis-v" model={items} text/>
            </>
        );
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="">
                <div className="flex justify-end">
                    <Button label="Sezonluk Fiyat Oluştur" icon="pi pi-plus" onClick={() => router.push('/settings/room-rate/create-season')} />
                </div>
                <div className="mt-2">
                    <DataTable value={roomRatesSeason}
                        selectionMode="single"
                        selection={selectedRoomRateSeason}
                        onSelectionChange={(e) => setSelectedRoomRateSeason(e.value)}
                        onRowSelect={onRowSelect}
                        dataKey="name"
                        tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Adı"></Column>
                        <Column field="from" header="Başlangıç Tarihi"></Column>
                        <Column field="to" header="Bitiş Tarihi"></Column>
                        <Column field="roomRate" header="Temel Fiyat"></Column>
                        {/* sütundakilerii sağa yasla */}
                        <Column field="" header="" body={actionBodyTemplate} alignFrozen="right"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default RoomRatesSeasonTab