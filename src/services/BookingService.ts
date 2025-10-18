import { Booking } from "@/types/booking";

export const BookingService = {
  getBookings(): Booking[] {
    return [
      {
        roomName: "101",
        agent: "Walkin",
        customerName: "Mustafa Yılmaz",
        arrival: "2025-10-18",
        departure: "2025-10-21",
        roomType: "Standart",
        bookingId: "123123",
      },
      {
        roomName: "102",
        agent: "Walkin",
        customerName: "Mehmet Eren",
        arrival: "2025-10-17",
        departure: "2025-10-19",
        roomType: "Standart",
        bookingId: "124125",
      },
      {
        roomName: "103",
        agent: "Tatilbudur",
        customerName: "Can Çelik",
        arrival: "2025-10-19",
        departure: "2025-10-20",
        roomType: "Standart",
        bookingId: "124126",
      },
      {
        roomName: "201",
        agent: "Tatilbudur",
        customerName: "İbrahim Kar",
        arrival: "2025-10-20",
        departure: "2025-10-21",
        roomType: "Deluxe",
        bookingId: "124137",
      },
      {
        roomName: "203",
        agent: "Booking",
        customerName: "Alexandar Ludwig",
        arrival: "2025-10-16",
        departure: "2025-10-24",
        roomType: "Deluxe",
        bookingId: "124178",
      },
    ];
  }
}