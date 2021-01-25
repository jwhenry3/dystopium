import { Column, Entity, OneToOne, PrimaryColumn, Unique } from "typeorm";
import { CharacterEntity }                                 from "./character.entity";

@Unique('idxCharacterInventorySlot', ['character', 'type', 'slot'])
@Entity()
export class InventoryEntity {

  @PrimaryColumn()
  @OneToOne(() => CharacterEntity, c => c.inventory)
  character: CharacterEntity;
  @Column('string')
  type: string;
  @Column('int')
  slot: number;
  @Column('int')
  itemId: number;
  @Column('int')
  quantity: number;
}
