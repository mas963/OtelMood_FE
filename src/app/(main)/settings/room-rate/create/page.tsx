'use client';

import { RoomRateDetail } from "@/types/room";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { RoomService } from "@/services/RoomService";
import RoomRateDetailCard from "@/components/settings/room-rate-detail-card";

const RoomRateCreatePage = () => {
    const [selectedConceptTypes, setSelectedConceptTypes] = useState<string[]>([]);
    const [roomRateDetails, setRoomRateDetails] = useState<RoomRateDetail[]>([]);

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

    const conceptTypes: string[] = [
        "Her Şey Dahil",
        "Sadece Kahvaltı",
    ];

    useEffect(() => {
        const data = RoomService.getRoomRateDetails();
        setRoomRateDetails(data);
    }, []);

    return (
        <>
            <Card title="Temel Fiyat Oluştur">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block font-medium mb-1">Fiyatlandırma Adı</label>
                        <InputText id="rateName" className="w-full" />
                    </div>

                    <div className="flex-1">
                        <label className="block font-medium mb-1">Konsept Türleri</label>
                        <MultiSelect
                            options={conceptTypes}
                            value={selectedConceptTypes}
                            onChange={(e) => setSelectedConceptTypes(e.value)}
                            placeholder="Seçiniz"
                            maxSelectedLabels={3}
                            className="w-full"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block font-medium mb-1">İptal Politikaları</label>
                        <MultiSelect
                            options={conceptTypes}
                            value={selectedConceptTypes}
                            onChange={(e) => setSelectedConceptTypes(e.value)}
                            placeholder="Seçiniz"
                            maxSelectedLabels={3}
                            className="w-full"
                        />
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

export default RoomRateCreatePage