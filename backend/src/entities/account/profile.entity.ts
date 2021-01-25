import { Column, Entity, OneToOne } from "typeorm";
import { AccountEntity }            from "./account.entity";

@Entity()
export class ProfileEntity {
  @OneToOne(() => AccountEntity, a => a.profile)
  account: AccountEntity;

  @Column('string')
  firstName?: string;
  @Column('string')
  lastName?: string;
  @Column('string')
  email?: string;

}
