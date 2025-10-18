import { Room, RoomType } from "@/types/room";

export const RoomService = {
  getRoomTypes(): RoomType[] {
    return [
      { name: 'Standart', shortName: 'STD' },
      { name: 'Aile', shortName: 'Aile' },
      { name: 'Kral', shortName: 'Kral' },
    ];
  },

  getRooms(): Room[] {
    return [
      { roomName: '101', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Temiz", active: true },
      { roomName: '102', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Temiz", active: false },
      { roomName: '103', roomType: { name: 'Standart', shortName: 'STD' }, groupName: 'Kat 1', status: "Kirli", active: true },
      { roomName: '201', roomType: { name: 'Kral', shortName: 'Kral' }, groupName: 'Kat 2', status: "Temiz", active: false },
      { roomName: '202', roomType: { name: 'Kral', shortName: 'Kral' }, groupName: 'Kat 2', status: "Temiz", active: true },
      { roomName: '203', roomType: { name: 'Kral', shortName: 'Kral' }, groupName: 'Kat 2', status: "Kirli", active: true },
      { roomName: '301', roomType: { name: 'Aile', shortName: 'Aile' }, groupName: 'Kat 3', status: "Temiz", active: true },
      { roomName: '302', roomType: { name: 'Aile', shortName: 'Aile' }, groupName: 'Kat 3', status: "Temiz", active: true },
    ];
  }
}