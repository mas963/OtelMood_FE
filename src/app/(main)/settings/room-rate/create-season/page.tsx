'use client';

import RoomRateDetailCard from "@/components/settings/room-rate-detail-card";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { RoomRateDetail } from "@/types/room";
import { RoomService } from "@/services/RoomService";
import { BreadCrumb } from "primereact/breadcrumb";
import Link from "next/link";

const CreateSeasonPage = () => {
    const [roomRateDetails, setRoomRateDetails] = useState<RoomRateDetail[]>([]);

    const items = [
        { label: 'Fiyatlandırma', template: () => <Link href="/settings/room-rate">Fiyatlandırma</Link> },
        { label: 'Sezon Fiyat Oluştur', template: () => <span className="text-primary font-semibold cursor-pointer">Sezon Fiyat Oluştur</span> },
    ];

    const handlePriceChange = (roomTypeName: string, unitPrice: number) => {
        const updatedRoomRateDetails = roomRateDetails.map(roomRate => {
            if (roomRate.name === roomTypeName) {
                return {
                    ...roomRate,
                    price: unitPrice
                };
            }
            return roomRate;
        });

        setRoomRateDetails(updatedRoomRateDetails);
    };

    useEffect(() => {
        const data = RoomService.getRoomRateDetails();
        setRoomRateDetails(data);
    }, []);

    return (
        <>
            <div>
                <BreadCrumb model={items} style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.2rem' }} />
            </div>
            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block font-medium mb-1">Temel Fiyat</label>
                        <InputText id="rateName" className="w-full" />
                    </div>

                    <div className="flex-1">
                        <label className="block font-medium mb-1">Sezon Adı</label>
                        <InputText id="rateName" className="w-full" />
                    </div>

                    <div className="flex-1">
                        <label className="block font-medium mb-1">Başlangıç Tarihi</label>
                        <InputText id="rateName" className="w-full" />
                    </div>

                    <div className="flex-1">
                        <label className="block font-medium mb-1">Bitiş Tarihi</label>
                        <InputText id="rateName" className="w-full" />
                    </div>

                </div>

                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <b>Oda Tipleri</b>
                    </div>
                </Divider>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roomRateDetails.map((roomRateDetail, index) => (
                        <RoomRateDetailCard
                            key={index}
                            name={roomRateDetail.name}
                            price={roomRateDetail.price}
                            guestSettings={roomRateDetail.guestSettings}
                            onPriceChange={handlePriceChange}
                        />
                    ))}
                </div>

                <div className="flex justify-end mt-3">
                    <Button label="Kaydet" />
                </div>
            </Card>
        </>
    )
}

export default CreateSeasonPage