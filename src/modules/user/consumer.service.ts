import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IConsumer,
  IGetUserByClientAccountIdRequest,
  IRegisterUserRequest,
  IRegisterUserResponse,
  IUpdateConsumerRequest,
  IUserResponse,
} from './interfaces/user.interface';
import Consumer from './consumer.entity';
import { CommonService } from '../../common/common.service';

@Injectable()
export class ConsumerService extends CommonService {
  constructor(
    @InjectRepository(Consumer)
    private consumerRepository: Repository<Consumer>,
  ) {
    super(consumerRepository);
  }

  async getConsumerByClientAccountId(
    data: IGetUserByClientAccountIdRequest,
  ): Promise<IUserResponse> {
    try {
      const { clientAccountId } = data;
      const user = await this.findOneByCriteria<IConsumer>({
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

  async registerConsumer(
    request: IRegisterUserRequest,
  ): Promise<IRegisterUserResponse> {
    try {
      const {
        user: {
          locale,
          clientAccountId,
          name,
          surname,
          userName,
          email,
          type,
          phone,
        },
      } = request;

      await this.serviceRepo.save({
        clientAccountId,
        name,
        surname,
        userName,
        email,
        type,
        phone,
        locale,
      });

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async updateConsumer(
    request: IUpdateConsumerRequest,
  ): Promise<IUserResponse> {
    try {
      const {
        locale,
        name,
        surname,
        clientAccountId,
        phone,
        userName,
        avatar,
      } = request;
      const user = await this.findOneByCriteria<Consumer>({
        where: { clientAccountId },
      });
      user.name = name;
      user.surname = surname;
      user.phone = phone;
      user.userName = userName;
      user.avatar = avatar;
      user.locale = locale;
      const newUser = await this.save<IConsumer, IConsumer>(user);

      return {
        user: newUser,
      };
    } catch (error) {
      return {
        user: null,
        error,
      };
    }
  }
}
