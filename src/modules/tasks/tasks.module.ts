import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from '../users/users.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Customer } from '../customers/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Customer])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
