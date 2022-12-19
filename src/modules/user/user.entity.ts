import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { LocaleTypes, UserType } from './interfaces/user.interface';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('text')
  clientAccountId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  userName: string;

  @Column()
  phone: string;

  @Column()
  type: UserType;

  @Column({ nullable: false, default: 'RU' })
  locale: LocaleTypes;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ nullable: true, default: '' })
  avatar: string;
}
