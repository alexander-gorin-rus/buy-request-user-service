import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import {
  IGetSellersByTagsResponse,
  IGetUserByClientAccountIdRequest,
  IRegisterUserRequest,
  IRegisterUserResponse,
  ISeller,
  IUpdateSellerRequest,
  IUserResponse,
  IUser,
} from './interfaces/user.interface';
import Seller from './seller.entity';
import { CommonService } from '../../common/common.service';
import User from './user.entity';

@Injectable()
export class SellerService extends CommonService {
  constructor(
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
  ) {
    super(sellerRepository);
  }

  async getSellerByClientAccountId(
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

  async getSellersByTags(tags: string[]): Promise<IGetSellersByTagsResponse> {
    try {
      const users = await this.findByCriteria<ISeller>({
        where: {
          setting: {
            tags: Raw(
              (tagsAlias) => `${tagsAlias} && ARRAY[:...tags]::varchar[]`,
              { tags },
            ),
          },
        },
        relations: ['setting'],
      });
      return {
        users,
      };
    } catch (error) {
      return {
        users: [],
        error,
      };
    }
  }

  async registerSeller(
    request: IRegisterUserRequest,
  ): Promise<IRegisterUserResponse> {
    try {
      const {
        user: {
          clientAccountId,
          company,
          type,
          email,
          name,
          surname,
          userName,
          phone,
          locale,
        },
      } = request;

      await this.serviceRepo.save({
        clientAccountId,
        company,
        type,
        email,
        setting: { tags: [], emails: false },
        name,
        surname,
        userName,
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

  async updateSeller(request: IUpdateSellerRequest): Promise<IUserResponse> {
    try {
      const {
        company,
        clientAccountId,
        surname,
        name,
        phone,
        userName,
        avatar,
        locale,
      } = request;
      const user = await this.findOneByCriteria<Seller>({
        where: { clientAccountId },
      });
      user.company = company;
      user.surname = surname;
      user.name = name;
      user.phone = phone;
      user.userName = userName;
      user.avatar = avatar;
      user.locale = locale;
      const newUser = await this.save<IUser, ISeller>(user);

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
