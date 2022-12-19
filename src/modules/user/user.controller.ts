import { Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICommonIsSuccessResponse,
  IGetSellersByTagsRequest,
  IGetSellersByTagsResponse,
  IGetUserByClientAccountIdRequest,
  IGetUserByIdRequest,
  IGetUserByIdResponse,
  IRegisterUserRequest,
  IRegisterUserResponse,
  IUpdateConsumerRequest,
  IUpdateSellerRequest,
  IUpdateSellerSettingRequest,
  IUserResponse,
} from './interfaces/user.interface';
import { ConsumerService } from './consumer.service';
import { SellerService } from './seller.service';
import { UserService } from './user.service';
import { SettingService } from './setting.service';

@Injectable()
@Controller()
export class UserController {
  constructor(
    private consumerService: ConsumerService,
    private sellerService: SellerService,
    private userService: UserService,
    private settingService: SettingService,
  ) {}

  @GrpcMethod('UserService')
  async getUserByClientAccountId(
    data: IGetUserByClientAccountIdRequest,
  ): Promise<IUserResponse> {
    return await this.userService.getUserByClientAccountId(data);
  }

  @GrpcMethod('UserService')
  async getUserById(data: IGetUserByIdRequest): Promise<IGetUserByIdResponse> {
    return await this.userService.getUserById(data);
  }

  @GrpcMethod('UserService')
  async getConsumerByClientAccountId(
    data: IGetUserByClientAccountIdRequest,
  ): Promise<IUserResponse> {
    return await this.consumerService.getConsumerByClientAccountId(data);
  }

  @GrpcMethod('UserService')
  async getSellerByClientAccountId(
    data: IGetUserByClientAccountIdRequest,
  ): Promise<IUserResponse> {
    return await this.sellerService.getSellerByClientAccountId(data);
  }

  @GrpcMethod('UserService')
  async getSellersByTags(
    data: IGetSellersByTagsRequest,
  ): Promise<IGetSellersByTagsResponse> {
    const { tags } = data;
    return await this.sellerService.getSellersByTags(tags);
  }

  @GrpcMethod('UserService')
  async registerConsumer(
    request: IRegisterUserRequest,
  ): Promise<IRegisterUserResponse> {
    return await this.consumerService.registerConsumer(request);
  }

  @GrpcMethod('UserService')
  async registerSeller(
    request: IRegisterUserRequest,
  ): Promise<IRegisterUserResponse> {
    return await this.sellerService.registerSeller(request);
  }

  @GrpcMethod('UserService')
  async updateConsumer(
    request: IUpdateConsumerRequest,
  ): Promise<IUserResponse> {
    return await this.consumerService.updateConsumer(request);
  }

  @GrpcMethod('UserService')
  async updateSeller(request: IUpdateSellerRequest): Promise<IUserResponse> {
    return await this.sellerService.updateSeller(request);
  }

  @GrpcMethod('UserService')
  async updateSellerSetting(
    request: IUpdateSellerSettingRequest,
  ): Promise<ICommonIsSuccessResponse> {
    return await this.settingService.updateSellerSetting(request);
  }
}
