import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { CharacterEntity }                         from "./character.entity";

@Entity()
export class StatsEntity {

  @PrimaryColumn()
  @OneToOne(() => CharacterEntity, c => c.stats)
  character: CharacterEntity;

  @Column('int')
  level: number;

  @Column('int')
  experience: number;

  @Column('int')
  str: number;
  @Column('int')
  dex: number;
  @Column('int')
  vit: number;
  @Column('int')
  agi: number;
  @Column('int')
  int: number;
  @Column('int')
  mnd: number;

  @Column('int')
  totalStatPoints: number;
  @Column('int')
  totalSkillPoints: number;
}
