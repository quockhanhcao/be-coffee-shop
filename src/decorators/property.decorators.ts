import { getVariableName } from '@common/utils';
import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';

export function ApiBooleanProperty(
  options: Omit<ApiPropertyOptions, 'type'> = {},
): PropertyDecorator {
  return ApiProperty({ type: Boolean, ...options });
}

export function ApiBooleanPropertyOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> = {},
): PropertyDecorator {
  return ApiBooleanProperty({ required: false, ...options });
}

export function ApiEnumProperty<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enumValue = getEnum() as any;

  return ApiProperty({
    type: 'enum',
    // throw error during the compilation of swagger
    // isArray: options.each,
    enum: enumValue,
    enumName: getVariableName(getEnum),
    ...options,
  });
}

export function ApiEnumPropertyOptional<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'required'> & {
    each?: boolean;
  } = {},
): PropertyDecorator {
  return ApiEnumProperty(getEnum, { required: false, ...options });
}
