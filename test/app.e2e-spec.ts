import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CRM API (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 1️⃣ Login Test
  it('POST /auth/login should return token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: '123456',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');

    token = res.body.access_token;
  });

  // 2️⃣ Create Task
  it('POST /tasks should create task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'E2E Task',
        description: 'Testing task creation',
        status: 'todo',
        assignedToId: 1,
        customerId: 1
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  // 3️⃣ Get Tasks
  it('GET /tasks should return tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});