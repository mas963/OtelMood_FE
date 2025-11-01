'use client';

import { RoomRateDetail } from "@/types/room";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { RoomService } from "@/services/RoomService";

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
                        <label className="block font-medium mb-1">Konsept Türü</label>
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
                    {roomRateDetails.map((roomRateDetail) => (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
                            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <h4 className="text-lg font-semibold">{roomRateDetail.name}</h4>
                                <div className="w-full sm:w-auto">
                                    <InputNumber
                                        placeholder="Birim Fiyatı"
                                        className="w-full"
                                        mode="currency"
                                        currency="TRY"
                                        locale="tr-TR"
                                        value={roomRateDetail.price}
                                        onValueChange={(e) => handlePriceChange(roomRateDetail.name, e.value || 0)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="grid grid-cols-3 gap-2 font-semibold">
                                        <div>Misafir</div>
                                        <div className="text-center">Çarpan</div>
                                        <div className="text-right">Tutar</div>
                                    </div>
                                    {roomRateDetail.guestSettings.adultGuestMultiplier.map((item, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2">
                                            <div className="">{item.count} Yetişkin</div>
                                            <div className="text-center text-gray-500">{item.multiplier}×</div>
                                            {/* ondalık kısımda sadece 2 basamak al */}
                                            <div className="text-right font-medium">{Math.round(item.multiplier * roomRateDetail.price)} ₺</div>
                                        </div>
                                    ))}

                                    {roomRateDetail.guestSettings.childGuestMultiplier.map((item, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2">
                                            <div className="">{item.count} Çocuk</div>
                                            <div className="text-center text-gray-500">{item.multiplier}×</div>
                                            <div className="text-right font-medium">{Math.round(item.multiplier * roomRateDetail.price)} ₺</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="gap-2 justify-center bg-gray-100 p-2 mt-3 rounded text-sm">
                                    <div className="grid grid-cols-2 gap-2 justify-items-center">
                                        <div className="flex gap-2">
                                            <span>Min Misafir:</span>
                                            <b>{roomRateDetail.guestSettings.guestCount.minGuests}</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Misafir:</span>
                                            <b>{roomRateDetail.guestSettings.guestCount.maxGuests}</b>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 justify-items-center">
                                        <div className="flex gap-2">
                                            <span>Min Yetişkin:</span>
                                            <b>{roomRateDetail.guestSettings.guestCount.minAdults}</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Yetişkin:</span>
                                            <b>{roomRateDetail.guestSettings.guestCount.maxAdults}</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Çocuk:</span>
                                            <b>{roomRateDetail.guestSettings.guestCount.maxChildren}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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