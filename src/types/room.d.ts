export interface RoomRateDetail {
  name: string
  shortName: string
  guestSettings: {
    guestCount: {
      minGuests?: number,
      maxGuests: number,
      minAdults?: number,
      maxAdults?: number,
      maxChildren?: number
    },
    adultGuestMultiplier: Array<{ count: number, multiplier: number }>,
    childGuestMultiplier: Array<{ count: number, multiplier: number }>,
  }
  price: number
}

export interface RoomTypeDetail {
  name: string
  shortName: string
  guestSettings: {
    guestCount: {
      minGuests?: number,
      maxGuests: number,
      minAdults?: number,
      maxAdults?: number,
      maxChildren?: number
    },
    adultGuestMultiplier: Array<{ count: number, multiplier: number }>,
    childGuestMultiplier: Array<{ count: number, multiplier: number }>,
  }
}

export interface RoomType {
  name: string
  shortName: string
}

export interface Room {
  roomName: string
  roomType: string
  floorPlan: string
  active: boolean
}

export interface RoomRate {
  rateName: string
  conceptTypes: string[]
  cancelPolicy: string
  sources: string[]
  active: boolean
}

export interface RoomRateSeason {
  name: string
  from: string
  to: string
  roomRate: string
}

export interface HousekeepingList {
  roomName: string
  roomType: string
  floorPlan: string
  status: string
  serviceNote: string
}