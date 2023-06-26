import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ToArray,
  ToBoolean,
  ToLowerCase,
  ToUpperCase,
  Trim,
} from './transform.decorators';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { isNumber } from 'lodash';
import { ApiEnumProperty } from './property.decorators';

interface IStringFieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  swagger?: boolean;
  canEmpty?: boolean;
}

interface INumberFieldOptions {
  each?: boolean;
  minimum?: number;
  maximum?: number;
  maxDecimalPlaces?: number;
  int?: boolean;
  isPositive?: boolean;
  swagger?: boolean;
}

export function NumberField(
  options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {},
): PropertyDecorator {
  const decorators = [Type(() => Number)];

  const { each, int, minimum, maximum, maxDecimalPlaces, isPositive, swagger } =
    options;

  if (swagger !== false) {
    decorators.push(ApiProperty({ type: Number, ...options }));
  }

  if (each) {
    decorators.push(ToArray());
  }

  if (int) {
    decorators.push(IsInt({ each }));
  } else {
    decorators.push(IsNumber({ maxDecimalPlaces }, { each }));
  }
  if (isNumber(minimum)) {
    decorators.push(Min(minimum, { each }));
  }

  if (isNumber(maximum)) {
    decorators.push(Max(maximum, { each }));
  }

  if (isPositive) {
    decorators.push(IsPositive({ each }));
  }

  return applyDecorators(...decorators);
}

export function NumberFieldOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    Partial<{
      each: boolean;
      int: boolean;
      isPositive: boolean;
      maxDecimalPlaces: number;
    }> = {},
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    NumberField({ required: false, ...options }),
  );
}

export function StringField(
  options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [IsString(), Trim()];

  if (options?.canEmpty !== true) {
    decorators.push(IsNotEmpty());
  }

  if (options?.swagger !== false) {
    decorators.push(ApiProperty({ type: String, ...options }));
  }

  if (options?.minLength) {
    decorators.push(MinLength(options.minLength));
  }

  if (options?.maxLength) {
    decorators.push(MaxLength(options.maxLength));
  }

  if (options?.toLowerCase) {
    decorators.push(ToLowerCase());
  }

  if (options?.toUpperCase) {
    decorators.push(ToUpperCase());
  }

  return applyDecorators(...decorators);
}

export function StringFieldOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    IStringFieldOptions = {},
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    StringField({ required: false, canEmpty: true, ...options }),
  );
}

export function BooleanField(
  options: Omit<ApiPropertyOptions, 'type'> &
    Partial<{ swagger: boolean }> = {},
): PropertyDecorator {
  const decorators = [IsBoolean(), ToBoolean()];

  if (options?.swagger !== false) {
    decorators.push(ApiProperty({ type: Boolean, ...options }));
  }

  return applyDecorators(...decorators);
}

export function BooleanFieldOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    Partial<{ swagger: boolean }> = {},
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    BooleanField({ required: false, ...options }),
  );
}

export function EnumField<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName'> &
    Partial<{
      each: boolean;
      swagger: boolean;
    }> = {},
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enumValue = getEnum() as any;
  const decorators = [IsEnum(enumValue as object, { each: options.each })];

  if (options?.swagger !== false) {
    decorators.push(ApiEnumProperty(getEnum, options));
  }

  if (options.each) {
    decorators.push(ToArray());
  }

  return applyDecorators(...decorators);
}

export function EnumFieldOptional<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
    Partial<{ each: boolean; swagger: boolean }> = {},
): PropertyDecorator {
  return applyDecorators(
    IsOptional(),
    EnumField(getEnum, { required: false, ...options }),
  );
}
