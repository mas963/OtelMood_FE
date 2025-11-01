import {Booking} from "@/types/booking";

export const BookingService = {
  getBookings(): Booking[] {
    return [
      {
        roomName: "101",
        roomType: "Standart",
        source: "Resepsiyon",
        customerName: "Mustafa Yılmaz",
        arrival: "2025-10-18",
        departure: "2025-10-21",
        bookingId: "123123",
      },
      {
        roomName: "102",
        source: "Resepsiyon",
        customerName: "Mehmet Eren",
        arrival: "2025-10-17",
        departure: "2025-10-19",
        roomType: "Standart",
        bookingId: "124125",
      },
      {
        roomName: "103",
        source: "Tatilbudur",
        customerName: "Can Çelik",
        arrival: "2025-10-19",
        departure: "2025-10-20",
        roomType: "Standart",
        bookingId: "124126",
      },
      {
        roomName: "201",
        source: "Tatilbudur",
        customerName: "İbrahim Kar",
        arrival: "2025-10-20",
        departure: "2025-10-21",
        roomType: "Deluxe",
        bookingId: "124137",
      },
      {
        roomName: "203",
        source: "Booking",
        customerName: "Alexandar Ludwig",
        arrival: "2025-10-16",
        departure: "2025-10-24",
        roomType: "Deluxe",
        bookingId: "124178",
      },
    ];
  },
}