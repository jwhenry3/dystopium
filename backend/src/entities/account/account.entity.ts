import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ProfileEntity }                                            from "./profile.entity";

@Unique('idxAccountName', ['name'])
@Entity()
export class AccountEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('string')
  name: string;
  @Column('password')
  password: string;

  @Column('boolean')
  isAdmin:boolean;

  @OneToOne(() => ProfileEntity, p => p.account)
  profile: ProfileEntity;

}
