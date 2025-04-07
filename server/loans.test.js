import request from 'supertest';
import {app} from './app.js';


// the token variable - change this according to the user to test
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoicSIsImxhc3RuYW1lIjoicSIsImNvbnRhY3RudW1iZXIiOjksImVtYWlsIjoicUBlbWFpbC5jb20iLCJhZGRyZXNzIjoicSIsInBhc3N3b3JkIjoiJDJhJDEwJGtGZWNhVG5zSmU3TkouclFOTmxIdGVabHJpT0Q3dWpkZjNHNWpIUjNLRWNlM2JTc05MS2pPIiwidXNlcm5hbWUiOiJxIiwiaWF0IjoxNzQ0MDIyNjU4LCJleHAiOjE3NDQwNDQyNTh9.yEV-UWqSBoJphc7EVbMJzd7r84z4bjPFIQA_qQedlAY';

// test authenticaiton middleware
describe('Authentication Middleware', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app)
    .post('/loans/')
    .expect(403);
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
    .expect(401)
  });
});

// test login; no token is needed
// use valid username and password
describe('Login API', () => {
  test('should login a user', async () => {
    return request(app).post('/login').send({
      username: 'q',
      password: 'q'
    }).expect(200);
  });
});

// test invalid login details - user who does not exist
describe('Invalid Login API', () => {
  test('should return 401 if invalid username or password', async () => {
    return request(app).post('/login').send({
      username: 'inexistent_username sjnd',
      password: 'any password'
    }).expect(401);
  });
});

// test invalid login details - wrong password
describe('Invalid Login API', () => {
  test('should return 401 if invalid username or password', async () => {
    return request(app).post('/login').send({
      username: 'q',
      password: 'wrong password for valid user'
    }).expect(401);
  });
});

// test add a new admin
describe('Add Admin API', () => {
  test('should add a new admin', async () => {
    return request(app).post('/addAdmin').send({
      firstname: 'admin',
      lastname: 'admin',
      contactNumber: 1,
      email: 'admin_22@email.com',
      address: 'admin',
      username: 'admin_22',
      password: 'admin'
    }).expect(200);
  });
});


// test duplicated username admin
describe('Add Admin API', () => {
  test('should return 401 if username is already used', async () => {
    return request(app).post('/addAdmin').send({
      firstname: 'admin',
      lastname: 'admin',
      contactNumber: 1,
      email: 'admin_22@email.com',
      address: 'admin',
      username: 'admin_22',
      password: 'admin'
    }).expect(401);
  });
});

// fetch user profile
describe('Fetch User Profile API', () => {
  test('should fetch user profile', async () => {
    return request(app)
    .get('/profile')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// fetch all admins
describe('Fetch All Admins API', () => {
  test('should fetch all admins', async () => {
    return request(app)
    .get('/allAdmins')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// delete an admin
describe('Delete an Admin API', () => {
  test('should delete admin by id', async () => {
    return request(app)
    .delete('/admins/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});


// delete an admin test for no authentication
describe('Delete an Admin API', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app)
    .delete('/admins/1')
    .expect(403);
  });
});

// fetch all clients
describe('Fetch All Clients API', () => {
  test('should fetch all clients', async () => {
    return request(app)
    .get('/allClients')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// fetch all loans
describe('Fetch All Loans API', () => {
  test('should fetch all loans', async () => {
    return request(app)
    .get('/allLoans')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// fetch a client by id
describe('Fetch Client by ID API', () => {
  test('should fetch a client by id', async () => {
    return request(app)
    .get('/client/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// fetch a loan by id
describe('Fetch Loan by ID API', () => {
  test('should fetch a loan by id', async () => {
    return request(app)
    .get('/loan/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// fetch loans of one client
describe('Fetch Loans of One Client API', () => {
  test('should fetch loans of one client', async () => {
    return request(app)
    .get('/loans/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// update a loan
describe('Update Loan API', () => {
  test('should update a loan', async () => {
    return request(app)
    .patch('/loans/1')
    .set('Authorization', `${token}`)
    .send({
      type: 'personal',
      status: 'pending',
    })
    .expect(500);
  });
});

//get all dates of loans
describe('Get All Maturity Dates of Loans API', () => {
  test('should get all dates of loans', async () => {
    return request(app)
    .get('/dates')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// delete a loan
describe('Delete Loan API', () => {
  test('should delete a loan', async () => {
    return request(app)
    .delete('/loans/1')
    .set('Authorization', `${token}`)
    .expect(500);
  });
});

// update a client
describe('Update Client API', () => {
  test('should update a client', async () => {
    return request(app)
    .patch('/clients/1')
    .set('Authorization', `${token}`)
    .send({
      firstname: 'new_firstname',
      address: 'new_add',
      email: 'new_email@email.com',
      contactNumber: 1,
      lastname: 'new_lastname'

    })
    .expect(200);
  });
});

// update a client test authentication required
describe('Update Client API - validate id', () => {
  test('should return 404 if invalid user id is given', async () => {
    return request(app)
    .patch('/clients/12huis')
    .set('Authorization', `${token}`)
    .send({
      firstname: 'new_firstname',
      address: 'new_add',
      email: 'new_email@email.com',
      contactNumber: 1,
      lastname: 'new_lastname'
    })
    .expect(404);
  });
});


// delete a client
describe('Delete Client API', () => {
  test('should delete a client', async () => {
    return request(app)
    .delete('/clients/1')
    .set('Authorization', `${token}`)
    .expect(500);
  });
});

// delete a client test for valid client id
describe('Delete Client API', () => {
  test('should return 404 if client id is invalid', async () => {
    return request(app)
    .delete('/clients/invalidIdUndefiend')
    .set('Authorization', `${token}`)
    .expect(404);
  });
});


// delete a client test authentication required
describe('Delete Client API - require authentication', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app)
    .delete('/clients/1')
    .expect(403);
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

// add a new client/ borrower
describe('Add Client API', () => {
  test('should add a new client', async () => {
    return request(app)
    .post('/addClient')
    // .set('Authorization', `${token}`)
    .send({
      firstname: 'new_firstname',
      lastname: 'new_lastname',
      contactNumber: 1,
      address: 'new_address',
      email: 'new_email@email.com',
      username: 'new_username',
    })
    .expect(401);
  });
});

// fetch client by email
describe('Fetch Client by Email API', () => {
  test('should fetch client by email', async () => {
    return request(app)
    .get('/email/new_email@email.com')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});


// add a payment
describe('Add Payment For Loan API', () => {
  test('should add a payment', async () => {
    return request(app).post('/payments/1')
    .set('Authorization', `${token}`)
    .send({
      amount: 1000,
      collection_date: '2025-04-01',
      collected_by: 'admin',
      new_balance: 1000,
      method: 'ATM',
      client_id: 1, 
    })
    .expect(200);
  });
});


// Test for unauthenticated user
describe('Add Payment For Loan API', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app).post('/payments/1')
    .send({
      amount: 1000,
      collection_date: '2025-04-01',
      collected_by: 'admin',
      new_balance: 1000,
      method: 'ATM',
      client_id: 1, 
    })
    .expect(403);
  });
});

// fetch all payments for a single loan
describe('Fetch All Payments for a single loan API', () => {
  test('should fetch all payments', async () => {
    return request(app)
    .get('/payments/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// get payments of one loan
describe('Get Payments of One Loan for client API', () => {
  test('should get payments of one loan', async () => {
    return request(app)
    .get('/payment/1/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});


// test for invalid client id
describe('Get Payments of One Loan for client API', () => {
  test('should return 404 if invalid client id is given', async () => {
    return request(app)
    .get('/payment/UndefinedClient/1')
    .set('Authorization', `${token}`)
    .expect(404);
  });
});


// get all payments
describe('Get All Payments API', () => {
  test('should get all payments', async () => {
    return request(app)
    .get('/allPayments')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});

// delete a payment
describe('Delete Payment API', () => {
  test('should delete a payment', async () => {
    return request(app)
    .delete('/payment/1')
    .set('Authorization', `${token}`)
    .expect(200);
  });
});


// delete a payment test for no authentication
describe('Delete Payment API', () => {
  test('should return 403 if no token is provided', async () => {
    return request(app)
    .delete('/payment/1')
    .expect(403);
  });
});



