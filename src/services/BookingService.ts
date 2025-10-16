import { Booking } from "@/types/booking";

export const BookingService = {
  getBookings(): Booking[] {
    return [
      {
        roomNo: "101",
        agent: "Walkin",
        customerName: "Mustafa Yılmaz",
        arrival: "2025-10-07",
        departure: "2025-10-09",
        roomType: "Standart",
        bookingId: "1",
      },
      {
        roomNo: "102",
        agent: "Walkin",
        customerName: "Mehmet Eren, Kadriye Eren, Özlem Eren",
        arrival: "2025-10-07",
        departure: "2025-10-10",
        roomType: "Standart",
        bookingId: "2",
      },
      {
        roomNo: "103",
        agent: "Tatilbudur",
        customerName: "Can Çelik, Canan Çelik",
        arrival: "2025-10-12",
        departure: "2025-10-15",
        roomType: "Standart",
        bookingId: "3",
      },
    ];
  }
}