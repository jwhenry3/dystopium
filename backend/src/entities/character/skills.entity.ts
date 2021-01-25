import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { CharacterEntity }                         from "./character.entity";

@Entity()
export class SkillsEntity {

  @PrimaryColumn()
  @OneToOne(() => CharacterEntity, c => c.skills)
  character: CharacterEntity;
  @Column('int')
  skillId: number;
  @Column('int')
  level: number;
}
