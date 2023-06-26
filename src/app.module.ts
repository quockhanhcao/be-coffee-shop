import { TagModule } from '@modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from '@shared/services/api-config.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.typeORMConfig,
    }),
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
