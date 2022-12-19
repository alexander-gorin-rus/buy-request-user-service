import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IConsumer,
  IGetUserByClientAccountIdRequest,
  IUserResponse,
  IGetUserByIdRequest,
  IGetUserByIdResponse,
  ISeller,
} from './interfaces/user.interface';
import { CommonService } from '../../common/common.service';
import User from './user.entity';

@Injectable()
export class UserService extends CommonService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async getUserByClientAccountId(
    data: IGetUserByClientAccountIdRequest,
  ): Promise<IUserResponse> {
    try {
      const { clientAccountId } = data;
      const user = await this.findOneByCriteria<User>({
        where: {
          clientAccountId,
        },
      });
      return {
        user,
      };
    } catch (error) {
      return {
        user: null,
        error,
      };
    }
  }

  async getUserById(data: IGetUserByIdRequest): Promise<IGetUserByIdResponse> {
    try {
      const { userId } = data;
      const user = await this.findOneByCriteria<ISeller | IConsumer>({
        where: {
          id: userId,
        },
      });
      return {
        user,
      };
    } catch (error) {
      return {
        user: null,
        error,
      };
    }
  }
}
