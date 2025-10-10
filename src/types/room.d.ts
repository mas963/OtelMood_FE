export interface RoomType {
  name: string
  shortName: string
} 

export interface Room {
  roomName: string
  roomType: RoomType
  groupName: string
  status: RoomStatus
  active: boolean
}

export enum RoomStatus {
  Clean = 'Clean',
  Dirty = 'Dirty',
}