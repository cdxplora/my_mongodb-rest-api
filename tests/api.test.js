import request from 'supertest';
import app from '../src/app.js';
import { connectDB, closeDB } from '../src/config/mongodb.js';

describe('API Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    const db = await connectDB();
    await db.collection('users').deleteMany({});
    await db.collection('data').deleteMany({});
  });

  describe('User endpoints', () => {
    test('POST /users - should create new user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.acknowledged).toBe(true);
    });

    test('GET /users - should get all users', async () => {
      await request(app)
        .post('/users')
        .send({
          username: 'testuser1',
          password: 'password123'
        });

      const res = await request(app).get('/users');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].username).toBe('testuser1');
    });
  });

  describe('Data endpoints', () => {
    test('POST /data - should create new data', async () => {
      const res = await request(app)
        .post('/data')
        .send({
          id: '1',
          Firstname: 'John',
          Surname: 'Doe',
          userid: '123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.acknowledged).toBe(true);
    });

    test('GET /data - should get all data', async () => {
      await request(app)
        .post('/data')
        .send({
          id: '1',
          Firstname: 'John',
          Surname: 'Doe',
          userid: '123'
        });

      const res = await request(app).get('/data');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].Firstname).toBe('John');
    });

    test('GET /data/:id - should get data by id', async () => {
      await request(app)
        .post('/data')
        .send({
          id: '1',
          Firstname: 'John',
          Surname: 'Doe',
          userid: '123'
        });

      const res = await request(app).get('/data/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.Firstname).toBe('John');
      expect(res.body.Surname).toBe('Doe');
    });
  });
});