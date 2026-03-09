import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from '../users/users.entity';
import { Customer } from '../customers/customers.entity';

describe('TasksService', () => {
  let service: TasksService;

    const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([
        { id: 1, title: 'Mock Task 1' },
        { id: 2, title: 'Mock Task 2' },
    ]),
    };

    const mockTaskRepo = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };
  const mockUserRepo = {
    findOne: jest.fn(),
  };

  const mockCustomerRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should return all tasks', async () => {
    const result = await service.findAll({ role: 'admin' }, {});

    expect(result).toEqual([
      { id: 1, title: 'Mock Task 1' },
      { id: 2, title: 'Mock Task 2' },
    ]);

expect(mockTaskRepo.createQueryBuilder).toHaveBeenCalled();  });
});