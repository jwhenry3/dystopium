export interface GameState {
  scene: string
  friends: { [id: string]: PlayerId }
  party?: Party
  players: { [id: string]: Player }
  playerLocations: {
    [x: number]: {
      [y: number]: { [id: string]: PlayerId }
    }
  }
}

export interface Entity {
  id: string
  name: string
  type: 'npc' | 'enemy' | 'object'
}

export interface Party {
  members: { [id: string]: PlayerId }
  leader: string
}

export interface Player {
  id: PlayerId
  race: 'human'
  gender: 'm' | 'f'
  class: PlayerClass
  location: PlayerLocation
}

export interface PlayerLocation {
  id: PlayerId
  map: string
  x: number
  y: number
}

export interface PlayerId {
  id: string
  name: string
}

export declare type EquipmentSlot = string | null;

export interface PlayerClass {
  name: string
  level: number
  equipment: PlayerEquipment
  stats: PlayerStatPoints
}

export interface PlayerStatPoints {
  strength: number
  dexterity: number
  vitality: number
  agility: number
  intelligence: number
  mind: number
  available: number
}

export interface PlayerEquipment {
  weapons: EquipmentSlot[]
  head: EquipmentSlot
  neck: EquipmentSlot
  chest: EquipmentSlot
  hands: EquipmentSlot
  legs: EquipmentSlot
  feet: EquipmentSlot
  back: EquipmentSlot
  rings: EquipmentSlot[]
}
