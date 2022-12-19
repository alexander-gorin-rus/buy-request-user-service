import { ChildEntity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from '../user/user.entity';
import Setting from './setting.entity';
import { UserType } from './interfaces/user.interface';

@ChildEntity(UserType.SELLER)
export default class Seller extends User {
  @Column()
  company: string;

  @OneToOne(() => Setting, (setting) => setting.seller, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  setting: Setting;
}
