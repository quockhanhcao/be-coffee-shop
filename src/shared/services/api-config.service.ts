import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (value == null) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' environment variable is not a boolean');
    }
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get typeORMConfig(): TypeOrmModuleOptions {
    return {
      type: this.getString('DB_TYPE') as any,
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      entities: ['dist/modules/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      subscribers: ['dist/subscribers/*.subscriber.js'],
      // Using migrations, synchronization should be set to false
      synchronize: false,
      // Run migrations automatically, if prefer
      migrationsRun: false,
      logging: this.getBoolean('ORM_ENABLE_LOG'),
      extra: {
        max: this.getNumber('ORM_POOL_SIZE'),
      },
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      cors: {
        origin: this.getString('CORS_ORIGIN'),
      },
      enableApiDoc: this.getBoolean('ENABLE_API_DOC'),
      frontendHost: this.getString('FRONTEND_HOST'),
    };
  }
}
