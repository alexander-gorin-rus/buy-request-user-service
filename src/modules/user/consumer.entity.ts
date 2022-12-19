import { ChildEntity } from 'typeorm';
import User from '../user/user.entity';
import { UserType } from './interfaces/user.interface';

@ChildEntity(UserType.CONSUMER)
export default class Consumer extends User {}
