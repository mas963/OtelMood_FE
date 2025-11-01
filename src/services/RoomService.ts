import { Room, RoomRate, RoomType, RoomRateDetail } from "@/types/room";

export const RoomService = {
  getRoomTypes(): RoomType[] {
    return [
      { name: 'Standart', shortName: 'STD' },
      { name: 'Aile', shortName: 'Aile' },
      { name: 'Deluxe', shortName: 'Deluxe' },
      { name: 'Suite', shortName: 'Suite' },
    ];
  },

  getRoomRateDetails(): RoomRateDetail[] {
    return [
      {
        name: 'Standart',
        shortName: 'STD',
        guestSettings: {
          guestCount: {
            minGuests: 1,
            maxGuests: 3,
            minAdults: 1,
            maxAdults: 3,
            maxChildren: 2
          },
          adultGuestMultiplier: [
            {
              count: 1,
              multiplier: 1
            },
            {
              count: 2,
              multiplier: 1.9
            },
            {
              count: 3,
              multiplier: 2.7
            }
          ],
          childGuestMultiplier: [
            {
              count: 1,
              multiplier: 0.7
            },
            {
              count: 2,
              multiplier: 1.3
            }
          ]
        },
        price: 1000
      },

      {
        name: 'Aile',
        shortName: 'Aile',
        guestSettings: {
          guestCount: {
            minGuests: 2,
            maxGuests: 4,
            minAdults: 2,
            maxAdults: 4,
            maxChildren: 3
          },
          adultGuestMultiplier: [
            {
              count: 2,
              multiplier: 1
            },
            {
              count: 3,
              multiplier: 1.9
            },
            {
              count: 4,
              multiplier: 2.7
            }
          ],
          childGuestMultiplier: [
            {
              count: 1,
              multiplier: 0.75
            },
            {
              count: 2,
              multiplier: 1.4
            },
            {
              count: 3,
              multiplier: 1.95
            }
          ]
        },
        price: 2000
      },
    ];
  },

  getRooms(): Room[] {
    return [
      { roomName: '101', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Temiz", active: true },
      { roomName: '102', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Temiz", active: false },
      { roomName: '103', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Kirli", active: true },
      { roomName: '201', roomType: { name: 'Deluxe', shortName: 'Deluxe' }, groupName: 'Kat 2', status: "Temiz", active: false },
      { roomName: '202', roomType: { name: 'Deluxe', shortName: 'Deluxe' }, groupName: 'Kat 2', status: "Temiz", active: true },
      { roomName: '203', roomType: { name: 'Deluxe', shortName: 'Deluxe' }, groupName: 'Kat 2', status: "Kirli", active: true },
      { roomName: '301', roomType: { name: 'Suite', shortName: 'Suite' }, groupName: 'Kat 3', status: "Temiz", active: true },
      { roomName: '302', roomType: { name: 'Suite', shortName: 'Suite' }, groupName: 'Kat 3', status: "Temiz", active: true },
    ];
  },

  getRoomRates(): RoomRate[] {
    return [
      {
        rateName: 'Fiyatlandırma 1',
        conceptTypes: ['Her Şey Dahil', 'Sadece Kahvaltı'],
        cancelPolicy: 'OtelMood',
        sources: ['OtelMood', 'Channel Manager'],
        active: true
      },
    ];
  },
}