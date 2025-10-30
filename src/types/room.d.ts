export interface RoomType {
  name: string
  shortName: string
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
