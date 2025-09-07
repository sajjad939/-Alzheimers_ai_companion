// Tests for memories endpoints
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Memory = require('../models/Memory');

let token;
let memoryId;

beforeAll(async () => {
  // Create a test user and get JWT
  await User.deleteMany({ email: 'memorytest@example.com' });
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Memory Tester', email: 'memorytest@example.com', password: 'testpass', role: 'patient' });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'memorytest@example.com', password: 'testpass' });
  token = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({ email: 'memorytest@example.com' });
  await Memory.deleteMany({});
});

describe('Memories Endpoints', () => {
  it('should create a memory', async () => {
    const res = await request(app)
      .post('/api/memories')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Memory', description: 'A test memory.' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    memoryId = res.body._id;
  });

  it('should get user memories', async () => {
    const res = await request(app)
      .get('/api/memories')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a memory', async () => {
    const res = await request(app)
      .put(`/api/memories/${memoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Memory' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Memory');
  });

  it('should delete a memory', async () => {
    const res = await request(app)
      .delete(`/api/memories/${memoryId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toMatch(/deleted/i);
  });
});
