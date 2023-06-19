import { AbstractDto } from '@common/dtos/abstract.dto';
import { Constructor } from 'src/types';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IAbstractEntity<DTO extends AbstractDto> {
  id: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;

  toDto(): DTO;
}

export abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto>
  implements IAbstractEntity<DTO>
{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    update: false,
  })
  createdBy: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    insert: false,
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    insert: false,
  })
  updatedBy: string;

  private dtoClass: Constructor<DTO, [AbstractEntity, any]>;

  toDto(args?: any): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) to be able to call toDto function`,
      );
    }

    return new this.dtoClass(this, args);
  }
}
