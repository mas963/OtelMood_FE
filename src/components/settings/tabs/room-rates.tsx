'use client';

import { RoomRate } from "@/types/room";
import { Column } from "primereact/column";
import { DataTable, DataTableSelectEvent } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { RoomService } from "@/services/RoomService";
import { ToggleButton } from "primereact/togglebutton";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const RoomRatesTab = () => {
    const [roomRates, setRoomRates] = useState<RoomRate[]>([]);
    const [selectedRoomRate, setSelectedRoomRate] = useState<RoomRate | null>(null);
    const toast = useRef<Toast>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRoomRates = async () => {
            const roomRates = await RoomService.getRoomRates();
            setRoomRates(roomRates);
        };
        fetchRoomRates();
    }, []);

    const conceptTypesBodyTemplate = (data: RoomRate) => {
        return data.conceptTypes.join(', ');
    };

    const sourcesBodyTemplate = (data: RoomRate) => {
        return data.sources.join(', ');
    };

    const activeBodyTemplate = (data: RoomRate) => {
        // togglebutton yap
        return <ToggleButton checked={data.active} />;
    };

    const onRowSelect = (event: DataTableSelectEvent) => {
        toast.current?.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.rateName}`, life: 3000 });
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="">
                <div className="flex justify-end">
                    <Button label="Temel Fiyat Oluştur" icon="pi pi-plus" onClick={() => router.push('/settings/room-rate/create')} />
                </div>
                <div className="mt-2">
                    <DataTable value={roomRates}
                        selectionMode="single"
                        selection={selectedRoomRate}
                        onSelectionChange={(e) => setSelectedRoomRate(e.value)}
                        onRowSelect={onRowSelect}
                        dataKey="rateName"
                        tableStyle={{ minWidth: '50rem' }}>
                        <Column field="rateName" header="Adı"></Column>
                        <Column field="conceptTypes" header="Konsept Türü" body={conceptTypesBodyTemplate}></Column>
                        <Column field="cancelPolicy" header="İptal Politikası"></Column>
                        <Column field="sources" header="Kaynak" body={sourcesBodyTemplate}></Column>
                        <Column field="active" header="Aktif" body={activeBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default RoomRatesTab