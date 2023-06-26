import { AbstractEntity } from '@common/entities/abstract.entity';
import { Expose } from 'class-transformer';

export class AbstractDto {
  @Expose()
  id: number;

  createdAt: Date;

  createdBy: string;

  updatedAt: Date;

  updatedBy: string;

  constructor(entity?: AbstractEntity) {
    this.id = entity?.id;
    this.createdAt = entity.createdAt;
    this.createdBy = entity.createdBy;
    this.updatedAt = entity.updatedAt;
    this.updatedBy = entity.updatedBy;
  }
}
