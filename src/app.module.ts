import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
  ConfigModule.forRoot ({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync ({
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),

      autoLoadEntities: true,
      synchronize: true,
    }),
  }),
  UsersModule,
  AuthModule,
  ServicesModule,
  BookingsModule,
],

controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
