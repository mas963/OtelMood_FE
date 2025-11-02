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

export interface RoomType {
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

export interface Room {
  roomName: string
  roomType: RoomType
  groupName: string
  status: string
  active: boolean
}

export interface RoomRate {
  rateName: string
  conceptTypes: string[]
  cancelPolicy: string
  sources: string[]
  active: boolean
}