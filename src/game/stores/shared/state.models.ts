export interface Entity {
  id: string
  name: string
  type: 'npc' | 'enemy' | 'object'
}

export interface Party {
  members: { [id: string]: PlayerId }
  leader: string
}

export interface PlayerIdentity extends PlayerId {
  race: 'human' | string
  gender: 'male' | 'female'
  level: number
  map: string
}

export interface PlayerDetails {
  identity: PlayerIdentity
  equipment: PlayerEquipment
  stats: PlayerStatPoints
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
  weapons: [EquipmentSlot] | [EquipmentSlot, EquipmentSlot]
  head: EquipmentSlot
  neck: EquipmentSlot
  chest: EquipmentSlot
  hands: EquipmentSlot
  waist: EquipmentSlot
  legs: EquipmentSlot
  feet: EquipmentSlot
  back: EquipmentSlot
  leftRing: EquipmentSlot
  rightRing: EquipmentSlot
}
