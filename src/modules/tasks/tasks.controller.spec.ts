import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    findAll: jest.fn().mockReturnValue([
      { id: 1, title: 'Mock Task 1' },
      { id: 2, title: 'Mock Task 2' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should return tasks', () => {
    const result = controller.findAll({ userId: 1, role: 'admin' }, {});

    expect(result).toEqual([
      { id: 1, title: 'Mock Task 1' },
      { id: 2, title: 'Mock Task 2' },
    ]);

    expect(mockTasksService.findAll).toHaveBeenCalled();
  });
});