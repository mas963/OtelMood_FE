import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { RoomRateDetail } from '@/types/room';

type GuestSettings = RoomRateDetail['guestSettings'];

type RoomRateDetailCardProps = {
  name: string;
  price: number;
  guestSettings: GuestSettings;
  onPriceChange: (name: string, price: number) => void;
};

const RoomRateDetailCard: React.FC<RoomRateDetailCardProps> = ({
  name,
  price,
  guestSettings,
  onPriceChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h4 className="text-lg font-semibold">{name}</h4>
        <div className="w-full sm:w-auto">
          <InputNumber
            placeholder="Birim Fiyatı"
            className="w-full"
            mode="currency"
            currency="TRY"
            locale="tr-TR"
            value={price}
            onValueChange={(e) => onPriceChange(name, e.value || 0)}
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
          {guestSettings.adultGuestMultiplier.map((item, index) => (
            <div key={`adult-${index}`} className="grid grid-cols-3 gap-2">
              <div>{item.count} Yetişkin</div>
              <div className="text-center text-gray-500">{item.multiplier}×</div>
              <div className="text-right font-medium">
                {Math.round(item.multiplier * price)} ₺
              </div>
            </div>
          ))}

          {guestSettings.childGuestMultiplier.map((item, index) => (
            <div key={`child-${index}`} className="grid grid-cols-3 gap-2">
              <div>{item.count} Çocuk</div>
              <div className="text-center text-gray-500">{item.multiplier}×</div>
              <div className="text-right font-medium">
                {Math.round(item.multiplier * price)} ₺
              </div>
            </div>
          ))}
        </div>
        <div className="gap-2 justify-center bg-gray-100 p-2 mt-3 rounded text-sm">
          <div className="grid grid-cols-2 gap-2 justify-items-center">
            <div className="flex gap-2">
              <span>Min Misafir:</span>
              <b>{guestSettings.guestCount.minGuests}</b>
            </div>
            <div className="flex gap-2">
              <span>Max Misafir:</span>
              <b>{guestSettings.guestCount.maxGuests}</b>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 justify-items-center">
            <div className="flex gap-2">
              <span>Min Yetişkin:</span>
              <b>{guestSettings.guestCount.minAdults}</b>
            </div>
            <div className="flex gap-2">
              <span>Max Yetişkin:</span>
              <b>{guestSettings.guestCount.maxAdults}</b>
            </div>
            <div className="flex gap-2">
              <span>Max Çocuk:</span>
              <b>{guestSettings.guestCount.maxChildren}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomRateDetailCard;
