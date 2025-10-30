'use client';

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";

const RoomRateCreatePage = () => {
    const [selectedConceptTypes, setSelectedConceptTypes] = useState<string[]>([]);

    const conceptTypes: string[] = [
        "Her Şey Dahil",
        "Sadece Kahvaltı",
    ];
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
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h4 className="text-lg font-semibold">Standart</h4>
                            <div className="w-full sm:w-auto">
                                <InputNumber
                                    placeholder="Birim Fiyatı"
                                    className="w-full"
                                    mode="currency"
                                    currency="TRY"
                                    locale="tr-TR"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-2 font-semibold">
                                <div>Misafir</div>
                                <div className="text-center">Çarpan</div>
                                <div className="text-right">Tutar</div>
                            </div>
                            {[
                                { guests: '1 Yetişkin', multiplier: '1', price: '1,000' },
                                { guests: '2 Yetişkin', multiplier: '1.9', price: '1,900' },
                                { guests: '3 Yetişkin', multiplier: '2.7', price: '2,700' },
                                { guests: '1 Çocuk', multiplier: '0,7', price: '700' },
                                { guests: '2 Çocuk', multiplier: '1,4', price: '1,400' },
                            ].map((item, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2">
                                    <div className="">{item.guests}</div>
                                    <div className="text-center text-gray-500">{item.multiplier}×</div>
                                    <div className="text-right font-medium">{item.price} ₺</div>
                                </div>
                            ))}
                            <div>
                                <div className="gap-2 justify-center bg-gray-100 p-2 mt-3 rounded text-sm">
                                    <div className="grid grid-cols-2 gap-2 justify-items-center">
                                        <div className="flex gap-2">
                                            <span>Min Misafir:</span>
                                            <b>1</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Misafir:</span>
                                            <b>3</b>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 justify-items-center">
                                        <div className="flex gap-2">
                                            <span>Min Yetişkin:</span>
                                            <b>1</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Yetişkin:</span>
                                            <b>3</b>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Max Çocuk:</span>
                                            <b>2</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h4 className="text-lg font-semibold">Deluxe</h4>
                            <div className="w-full sm:w-auto">
                                <InputNumber
                                    placeholder="Birim Fiyatı"
                                    className="w-full"
                                    mode="currency"
                                    currency="TRY"
                                    locale="tr-TR"
                                />
                            </div>
                        </div>
                        <div className="text-gray-500 italic">Fiyatlandırma bilgisi eklenmemiş</div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h4 className="text-lg font-semibold">Suite</h4>
                            <div className="w-full sm:w-auto">
                                <InputNumber
                                    placeholder="Birim Fiyatı"
                                    className="w-full"
                                    mode="currency"
                                    currency="TRY"
                                    locale="tr-TR"
                                />
                            </div>
                        </div>
                        <div className="text-gray-500 italic">Fiyatlandırma bilgisi eklenmemiş</div>
                    </div>
                </div>
                <div className="flex justify-end mt-3">
                    <Button label="Kaydet" />
                </div>
            </Card>
        </>
    )
}

export default RoomRateCreatePage