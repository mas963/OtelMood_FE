'use client';

import dayjs from "dayjs";
import { Card } from "primereact/card";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState, useMemo, useRef } from "react";
import React from "react";
import { Booking } from "@/types/booking";
import { RoomService } from "@/services/RoomService";
import { BookingService } from "@/services/BookingService";
import { Room } from "@/types/room";
import "dayjs/locale/tr";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import LandscapePrompt from "@/components/ui/LandscapePrompt";
import BookingDialog from "@/components/booking/BookingDialog";
import { Toast } from "primereact/toast";

dayjs.locale("tr");
dayjs.extend(isBetween);

const BookingCalendarPage = () => {
  const toast = useRef<Toast>(null);
  const [dayCount, setDayCount] = useState<number>(14);
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState<{ room: Room | null; date: dayjs.Dayjs | null }>({
    room: null,
    date: null
  });
  // sıralama durumu
  const [sortBy, setSortBy] = useState<"roomName" | "roomType" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const calendarPeriod: number[] = [14, 21, 28];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const roomData = RoomService.getRooms();
        const bookingData = BookingService.getBookings();
        setRooms(roomData);
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const dates = Array.from({ length: dayCount }, (_, i) => startDate.startOf("day").add(i, "day"));
  // hücre genişliğini dayCount'e göre ayarla: 28 için daha küçük, 21 için orta, aksi halde varsayılan
  const cellWidth = dayCount === 28 ? 70 : dayCount === 21 ? 80 : 100;

  const scrollLeft = () => setStartDate((prev) => prev.subtract(dayCount, "day"));
  const scrollRight = () => setStartDate((prev) => prev.add(dayCount, "day"));

  const handleCellClick = (room: Room, date: dayjs.Dayjs) => {
    if (date.isBefore(dayjs().startOf("day"))) {
      toast.current?.show({ severity: "warn", summary: "Uyarı", detail: "Geçmiş tarihe rezervasyon yapılamaz" });
      return;
    }
    setSelectedBookingData({ room, date });
    setShowBookingDialog(true);
  };

  const handleBookingSave = () => {
    // Handle save logic here
    setShowBookingDialog(false);
  };

  const toggleSort = (key: "roomName" | "roomType") => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const displayedRooms = useMemo(() => {
    const copy = [...rooms];
    if (!sortBy) return copy;
    copy.sort((a, b) => {
      const aKey = sortBy === "roomName" ? a.roomName : a.roomType?.name ?? "";
      const bKey = sortBy === "roomName" ? b.roomName : b.roomType?.name ?? "";
      return aKey.localeCompare(bKey, "tr");
    });
    if (sortDir === "desc") copy.reverse();
    return copy;
  }, [rooms, sortBy, sortDir]);

  // Rezervasyonun gün sayısını hesapla
  const getDurationInDays = (start: string, end: string) =>
    dayjs(end).diff(dayjs(start), "day") + 1;

  return (
    <>
      <Toast ref={toast} />
      <Card title="Rezervasyon Takvimi">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <label>Takvim Periyodu</label>

              <SelectButton
                value={dayCount}
                onChange={(e: SelectButtonChangeEvent) => setDayCount(e.value)}
                options={calendarPeriod}
              />
            </div>
            <div className="flex gap-2">
              <Calendar
                value={startDate.toDate()}
                onChange={(e) => e.value && setStartDate(dayjs(e.value).startOf("day"))}
                showIcon
              />
              <Button icon="pi pi-angle-left" onClick={scrollLeft} outlined />
              <Button icon="pi pi-angle-right" onClick={scrollRight} outlined />
            </div>
          </div>

          {/* Takvim */}
          <div className="overflow-x-auto rounded-lg relative min-h-96">
            {isLoading ? (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
                <ProgressSpinner />
              </div>
            ) : (
              <div className="min-w-max">
                {/* Başlık Satırı (ayrı grid) */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `100px 120px repeat(${dayCount}, ${cellWidth}px)`,
                  }}
                >
                  <div
                    className="border font-semibold p-2 bg-primary text-stone-50 sticky left-0 z-10 cursor-pointer"
                    onClick={() => toggleSort("roomName")}
                  >
                    Oda No {sortBy === "roomName" ? (sortDir === "asc" ? "↑" : "↓") : "↑↓"}
                  </div>
                  <div
                    className="border font-semibold p-2 bg-primary text-stone-50 sticky left-[100px] z-10 cursor-pointer"
                    onClick={() => toggleSort("roomType")}
                  >
                    Oda Tipi {sortBy === "roomType" ? (sortDir === "asc" ? "↑" : "↓") : "↑↓"}
                  </div>
                  {dates.map((d) => (
                    <div
                      key={d.toString()}
                      className="border text-center font-semibold p-2 bg-primary text-stone-50 text-sm"
                      style={{ width: `${cellWidth}px` }}
                    >
                      {d.format("DD MMM ddd")}
                    </div>
                  ))}
                </div>

                {/* Oda Satırları - her satır kendi grid'i içinde */}
                {displayedRooms.map((room) => {
                  const roombookings = bookings.filter((r) => r.roomName === room.roomName);

                  return (
                    <div
                      key={room.roomName}
                      className="grid"
                      style={{
                        gridTemplateColumns: `100px 120px repeat(${dayCount}, ${cellWidth}px)`,
                      }}
                    >
                      <div className="border p-2 font-medium bg-primary text-stone-50 sticky left-0 z-10">
                        {room.roomName}
                      </div>
                      <div className="border p-2 bg-primary text-stone-50 sticky left-[100px] z-10">
                        {room.roomType?.name || ''}
                      </div>

                      <div
                        className="border p-0 relative"
                        style={{ gridColumn: `3 / span ${dayCount}`, minWidth: `${dayCount * cellWidth}px` }}
                      >
                        <div className="flex">
                          {dates.map((date) => {
                            const isOccupied = roombookings.some((b) => {
                              const start = dayjs(b.arrival).startOf("day");
                              const end = dayjs(b.departure).startOf("day");
                              return date.isSame(start, "day") || date.isSame(end, "day") || date.isBetween(start, end, "day", "[]");
                            });
                            return (
                              <div
                                key={`${room.roomName}-cell-${date.toString()}`}
                                className={`h-12 border-r last:border-r-0 ${isOccupied ? "bg-gray-100" : "hover:bg-green-100 cursor-pointer"
                                  } flex-shrink-0`}
                                style={{ width: `${cellWidth}px` }}
                                onClick={() => {
                                  if (!isOccupied) handleCellClick(room, date);
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Rezervasyon kutuları */}
                        {roombookings.map((b) => {
                          const bookingStart = dayjs(b.arrival).startOf("day");
                          const bookingEnd = dayjs(b.departure).startOf("day");
                          const visibleStart = dates[0].startOf("day");
                          const visibleEnd = dates[dates.length - 1].startOf("day");

                          if (bookingEnd.isBefore(visibleStart, "day") || bookingStart.isAfter(visibleEnd, "day")) {
                            return null;
                          }

                          const leftDays = Math.max(0, bookingStart.diff(visibleStart, "day"));
                          const overlapStart = bookingStart.isBefore(visibleStart) ? visibleStart : bookingStart;
                          const overlapEnd = bookingEnd.isAfter(visibleEnd) ? visibleEnd : bookingEnd;
                          const visibleDuration = overlapEnd.diff(overlapStart, "day") + 1;

                          const leftPx = leftDays * cellWidth;
                          const widthPx = visibleDuration * cellWidth;

                          return (
                            <div
                              key={`${room.roomName}-booking-${b.customerName}-${b.arrival}`}
                              className="absolute cursor-pointer top-1 left-0 h-10 bg-red-400 text-stone-50 text-xs flex items-center justify-center text-center font-medium border-2"
                              style={{
                                left: `${leftPx}px`,
                                width: `${widthPx}px`,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {b.customerName}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Card>

      <BookingDialog
        visible={showBookingDialog}
        onHide={() => setShowBookingDialog(false)}
        onSave={handleBookingSave}
        initialRoom={selectedBookingData.room}
        initialDate={selectedBookingData.date?.toDate()}
      />
    </>
  );
}

export default BookingCalendarPage