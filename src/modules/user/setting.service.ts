import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import Setting from './setting.entity';
import {
  ICommonIsSuccessResponse,
  ISellerSetting,
  IUpdateSellerSettingRequest,
} from './interfaces/user.interface';

@Injectable()
export class SettingService extends CommonService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {
    super(settingRepository);
  }

  async updateSellerSetting(
    request: IUpdateSellerSettingRequest,
  ): Promise<ICommonIsSuccessResponse> {
    try {
      const {
        setting: { emails, tags },
        userId,
      } = request;
      const setting = await this.findOneByCriteria<ISellerSetting>({
        where: { seller: { id: userId } },
        relations: ['seller'],
      });
      await this.save<ISellerSetting, ISellerSetting>({
        ...setting,
        ...(emails !== undefined ? { emails } : {}),
        ...(tags ? { tags } : {}),
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
}
