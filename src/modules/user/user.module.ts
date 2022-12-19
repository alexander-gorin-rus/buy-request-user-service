import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerService } from './consumer.service';
import { SellerService } from './seller.service';
import Seller from './seller.entity';
import Consumer from './consumer.entity';
import User from './user.entity';
import { UserService } from './user.service';
import Setting from './setting.entity';
import { SettingService } from './setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Seller, Consumer, Setting])],
  controllers: [UserController],
  providers: [
    UserController,
    ConsumerService,
    SellerService,
    UserService,
    SettingService,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
