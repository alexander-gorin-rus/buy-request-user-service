import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class CommonService {
  protected serviceRepo: Repository<any>;
  constructor(service: Repository<any>) {
    this.serviceRepo = service;
  }

  public findOne<R>(id: string): Promise<R> {
    return this.serviceRepo.findOne(id);
  }

  public findByCriteria<R>(criteria: FindManyOptions): Promise<R[]> {
    return this.serviceRepo.find(criteria);
  }

  public findOneByCriteria<R>(criteria: FindOneOptions): Promise<R> {
    return this.serviceRepo.findOne(criteria);
  }

  public async remove(id: string): Promise<void> {
    await this.serviceRepo.delete(id);
  }

  public async save<O, R>(object: O): Promise<R> {
    return this.serviceRepo.save(object);
  }
}
