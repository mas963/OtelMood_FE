'use client';

import { RoomService } from "@/services/RoomService";
import { HousekeepingList } from "@/types/room";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

const Housekeeping = () => {
    const [roomList, setRoomList] = useState<string[]>([]);
    const [roomTypeList, setRoomTypeList] = useState<string[]>([]);
    const [floorPlanList, setFloorPlanList] = useState<string[]>([]);
    const [housekeepingList, setHousekeepingList] = useState<HousekeepingList[]>([]);

    const housekeepingStatus: string[] = [
        "Temiz",
        "Kirli",
        "Servis Dışı"
    ];

    useEffect(() => {
        const data = RoomService.getHousekeepingList();
        const roomTypeData = RoomService.getRoomTypes();
        const roomData = RoomService.getRooms();
        const floorPlanData = RoomService.getFloorPlans();


        setHousekeepingList(data);
        setRoomTypeList(roomTypeData.map(roomType => roomType.name));
        setRoomList(roomData.map(room => room.roomName));
        setFloorPlanList(floorPlanData);
    }, []);

    const statusBodyTemplate = (data: HousekeepingList) => {
        return (
            <Dropdown
                options={housekeepingStatus}
                value={data.status}
                optionLabel="name"
                className={`w-full`}
                id="housekeepingStatus"
                placeholder="Durum"
                itemTemplate={statusOptionTemplate}
                valueTemplate={(value) => statusOptionTemplate(value as string)}
                dropdownIcon="pi pi-chevron-down"
            />
        )
    };

    const getStatusColorClasses = (status: string) => {
        if (status === 'Kirli') return 'text-red-600';
        if (status === 'Temiz') return 'text-green-600';
        if (status === 'Servis Dışı') return 'text-yellow-600';
        return 'text-gray-600';
    };

    const statusOptionTemplate = (option: string) => {
        return (
            <span className={`${getStatusColorClasses(option)} font-semibold p-0 m-0`}>
                {option}
            </span>
        )
    };

    return (
        <div className="grid md:grid-cols-[5fr_1fr] grid-cols-1 gap-3">
            <div className="">
                <Card title="Housekeeping Listesi">
                    <DataTable value={housekeepingList}>
                        <Column field="roomName" header="Oda Adı"></Column>
                        <Column field="roomType" header="Oda Tipi"></Column>
                        <Column field="floorPlan" header="Kat"></Column>
                        <Column field="status" header="Durum" body={statusBodyTemplate}></Column>
                        <Column field="serviceNote" header="Servis Notu"></Column>
                    </DataTable>
                </Card>
            </div>
            <Card title="İşlemler" className="h-max">
                <div className="grid gap-3">
                    <Dropdown
                        options={roomList}
                        optionLabel="name"
                        className="w-full"
                        id="roomList"
                        placeholder="Oda"
                    />
                    <Dropdown
                        options={housekeepingStatus}
                        optionLabel="name"
                        className="w-full"
                        id="housekeepingStatus"
                        placeholder="Durum"
                    />
                    <Dropdown
                        options={roomTypeList}
                        optionLabel="name"
                        className="w-full"
                        id="roomTypeList"
                        placeholder="Oda Tipi"
                    />
                    <Dropdown
                        options={floorPlanList}
                        optionLabel="name"
                        className="w-full"
                        id="floorPlanList"
                        placeholder="Kat"
                    />
                </div>

            </Card>
        </div>
    )
};

export default Housekeeping;