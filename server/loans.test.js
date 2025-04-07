import request from 'supertest';
import {app} from './app.js';


// the token variable
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoicSIsImxhc3RuYW1lIjoicSIsImNvbnRhY3RudW1iZXIiOjksImVtYWlsIjoicUBlbWFpbC5jb20iLCJhZGRyZXNzIjoicSIsInBhc3N3b3JkIjoiJDJhJDEwJGtGZWNhVG5zSmU3TkouclFOTmxIdGVabHJpT0Q3dWpkZjNHNWpIUjNLRWNlM2JTc05MS2pPIiwidXNlcm5hbWUiOiJxIiwiaWF0IjoxNzQ0MDIyNjU4LCJleHAiOjE3NDQwNDQyNTh9.yEV-UWqSBoJphc7EVbMJzd7r84z4bjPFIQA_qQedlAY';

// test authenticaiton middleware
describe('Authentication Middleware', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app).post('/loans/').expect(403);
  });
});

// test register does not require authentication; no token is needed
describe('Register API', () => {
  test('should register a new user', async () => {
    return request(app)
    .post('/register')
    .send({
        firstname: 'q',
        lastname: 'q',
        contactNumber: 1,
        email: 'q@email.com',
        address: 'q',
        username: 'q2',
        password: 'q'
    })
    .expect(200)
  });
});

// test login does not require authentication; no token is needed
// use valid username and password
describe('Login API', () => {
  test('should login a user', async () => {
    return request(app).post('/login').send({
      username: 'q',
      password: 'q'
    }).expect(200);
  });
});

// test create loan instance for a client
describe('Loans API', () => {
  test('should create a new loan instance for borrower', async () => {
    return request(app)
    .post('/loans/')
    .set('Authorization', `${token}`)
    .send({
      client_id: 1,
      type: 'personal',
      status: 'pending',
      balance: 1000,
      gross_loan: 1000,
      amort: 1000,
      terms: 12,    
      date_released: '2025-04-01',
      maturity_date: '2025-04-01',
    })
    .expect(200)
  });
});



