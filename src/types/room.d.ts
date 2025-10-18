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