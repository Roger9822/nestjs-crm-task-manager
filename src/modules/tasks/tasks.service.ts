import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/users.entity';
import { Role } from 'src/common/enums/role.enum';
import { Customer } from '../customers/customers.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

async create(dto: CreateTaskDto) {
  const user = await this.userRepo.findOne({
    where: { id: dto.assignedToId },
  });

  if (!user) throw new NotFoundException('User not found');

  const customer = await this.customerRepo.findOne({
    where: { id: dto.customerId },
  });

  if (!customer) throw new NotFoundException('Customer not found');

  const task = this.repo.create({
    title: dto.title,
    description: dto.description,
    status: dto.status,
    dueDate: dto.dueDate,
    assignedTo: user,
    customer: customer,
  });

  return this.repo.save(task);
}


  async findAll(user: any, filters: any) {
    const query = this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.assignedTo', 'user')
      .leftJoinAndSelect('task.customer', 'customer');

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

    if (filters.customerId) {
    query.andWhere('customer.id = :customerId', {
      customerId: filters.customerId,
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
