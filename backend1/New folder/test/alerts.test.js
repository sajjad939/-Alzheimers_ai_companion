// Tests for alerts endpoints
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Alert = require('../models/Alert');

let token;
let alertId;

beforeAll(async () => {
  // Connect to test DB if needed
  // await mongoose.connect(process.env.MONGO_URI);
  // Create a test user and get JWT
  await User.deleteMany({ email: 'alerttest@example.com' });
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Alert Tester', email: 'alerttest@example.com', password: 'testpass', role: 'patient' });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'alerttest@example.com', password: 'testpass' });
  token = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({ email: 'alerttest@example.com' });
  await Alert.deleteMany({});
  // await mongoose.connection.close();
});

describe('Alerts Endpoints', () => {
  it('should create an alert', async () => {
    const res = await request(app)
      .post('/api/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'Test alert', type: 'reminder' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    alertId = res.body._id;
  });

  it('should get user alerts', async () => {
    const res = await request(app)
      .get('/api/alerts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update alert status', async () => {
    const res = await request(app)
      .put(`/api/alerts/${alertId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ sent: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.sent).toBe(true);
  });
});
