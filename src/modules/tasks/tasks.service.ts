import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/users.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

async create(dto: CreateTaskDto) {
  const user = await this.userRepo.findOne({
    where: { id: dto.assignedToId },
  });

  if (!user) {
    throw new Error('Assigned user not found');
  }

  const task = this.repo.create({
    title: dto.title,
    description: dto.description,
    status: dto.status,
    dueDate: dto.dueDate,
    assignedTo: user,
  });

  return this.repo.save(task);
}


  async findAll(user: any, filters: any) {
    const query = this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.assignedTo', 'user');

    // If normal user → only see own tasks
    if (user.role === Role.User) {
      query.andWhere('user.id = :id', { id: user.userId });
    }

    if (filters.status) {
      query.andWhere('task.status = :status', {
        status: filters.status,
      });
    }

    if (filters.title) {
      query.andWhere('task.title LIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    return query.getMany();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: Partial<CreateTaskDto>) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
