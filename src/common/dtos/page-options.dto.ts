import {
  NumberFieldOptional,
  StringFieldOptional,
} from '@decorators/field.decorators';

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page?: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 500,
    default: 10,
    int: true,
  })
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional({ maxLength: 255 })
  readonly q?: string;

  @StringFieldOptional({ maxLength: 255 })
  readonly sort?: string;
}
