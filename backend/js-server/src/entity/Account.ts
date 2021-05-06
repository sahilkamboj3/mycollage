import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 50,
    nullable: true,
  })
  uuid?: string;

  @Column({
    length: 50,
    nullable: true,
  })
  firstName?: string;

  @Column({
    length: 50,
    nullable: true,
  })
  lastName?: string;

  @Column({
    length: 50,
    nullable: true,
    unique: true,
  })
  username?: string;

  @Column({
    length: 100,
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    length: 100,
    nullable: true,
  })
  password?: string;
}
