export enum UserType {
  SELLER = 'SELLER',
  CONSUMER = 'CONSUMER',
}

export interface INewUser {
  clientAccountId: string;
  name?: string;
  surname?: string;
  userName?: string;
  company?: string;
  phone?: string;
  email: string;
  type: UserType;
  avatar?: string;
  locale?: LocaleTypes;
}

export type LocaleTypes = 'RU' | 'EN';

export interface IUser extends INewUser {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISeller extends IUser {
  setting: ISellerSetting;
}

export type IConsumer = IUser;

export interface ISellerSetting {
  id: string;
  tags: string[];
  emails: boolean;
  seller: ISeller;
}

export interface ISellerSettingRequest {
  id: string;
  tags?: string[];
  emails?: boolean;
}

export interface Error {
  code: string;
  message: Array<string>;
}

export interface IGetUserByClientAccountIdRequest {
  clientAccountId: string;
}

export interface IGetUserByIdRequest {
  userId: string;
}

export interface IGetSellersByTagsRequest {
  tags: string[];
}

export interface IGetUserByIdResponse {
  user: ISeller | IConsumer;
  error?: Error;
}

export interface IGetSellersByTagsResponse {
  users: ISeller[];
  error?: Error;
}

export interface IRegisterUserRequest {
  user: INewUser;
}

export type IRegisterUserResponse = ICommonIsSuccessResponse;

export interface ICommonIsSuccessResponse {
  isSuccess: boolean;
  error?: Error;
}

export interface IUpdateUserRequest {
  clientAccountId: string;
  surname: string;
  name: string;
  phone: string;
  userName: string;
  avatar: string;
  locale: LocaleTypes;
}

export type IUpdateConsumerRequest = IUpdateUserRequest;

export interface IUpdateSellerRequest extends IUpdateUserRequest {
  company: string;
}

export interface IUpdateSellerSettingRequest {
  userId: string;
  setting: ISellerSettingRequest;
}

export interface IUserResponse {
  user: IUser;
  error?: Error;
}
