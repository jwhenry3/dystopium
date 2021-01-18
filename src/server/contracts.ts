export interface CreateCharacterData {
  name: string
  race: 'human' | string
  gender: 'male' | 'female' | string
}

export enum Stance {
  IDLE = 'idle',
  IDLE_BATTLE = 'idle:battle'
}

export enum Movement {
  WALKING = 'walk',
  RUNNING = 'run',
}

export enum Battle {
  ATTACKING = 'attack',
  DEFENDING = 'defend',
  CASTING = 'cast',
  TAKING_DAMAGE = 'hurt',
  USING_SKILL = 'skill' // animations would be determined by the skill being used (battle skills, life skills, etc)
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export type Actions = Stance | Movement | Battle | Direction;
