import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Seller from './seller.entity';

@Entity()
export default class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column({ default: true })
  emails: boolean;

  @OneToOne(() => Seller, (seller) => seller.setting)
  seller: Seller;
}
