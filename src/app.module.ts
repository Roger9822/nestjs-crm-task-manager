import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CustomersModule } from './modules/customers/customers.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  TypeOrmModule.forRoot(dataSource.options),
  AuthModule,
  UsersModule,
  TasksModule,
  CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
