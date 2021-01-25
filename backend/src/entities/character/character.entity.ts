import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { StatsEntity }                             from "./stats.entity";
import { InventoryEntity }                         from "./inventory.entity";
import { SkillsEntity }                            from "./skills.entity";

@Entity()
export class CharacterEntity {
  @Column('int')
  accountId: number;
  @Column('int')
  serverId: number;

  @PrimaryColumn('string', { unique: true })
  name: string;

  @Column('string')
  race: string;

  @Column('string')
  gender: string;

  @Column('boolean')
  isGameMaster: boolean;

  @OneToOne(() => StatsEntity, s => s.character)
  stats: StatsEntity;
  @OneToOne(() => SkillsEntity, i => i.character)
  skills: SkillsEntity;
  @OneToOne(() => InventoryEntity, i => i.character)
  inventory: InventoryEntity;
}
