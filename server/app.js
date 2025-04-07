import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { connectDatabase } from './pool.js';
import { generateJWT } from './utils/jwtGenerator.js';
import { auth } from './middlewares/auth.js';
import cors from 'cors';
const app = express();
const pool = connectDatabase()

app.use(bodyParser.json());
app.use(cors());


//* LOGIN SESSIONS
//! AUTHENTICATION ROUTES

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // console.log(req.body);
    const admin = await pool.query(
      `SELECT * FROM admins WHERE username = '${username}'`
    );

    if (admin.rows.length <= 0) {
      return res.status(401).send('Username or password is wrong');
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).send('Username or password is wrong');
    }
    const token = generateJWT(admin.rows[0]);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

app.post('/addAdmin', async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      contactNumber,
      address,
      email,
      username,
      password,
    } = req.body;

    const admin = await pool.query(
      `SELECT * FROM admins WHERE username = '${username}'`
    );

    if (admin.rows.length > 0) {
      return res.status(401).send('User already exist');
    }

    // bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newAdmin = await pool.query(
      `INSERT INTO admins (firstname, lastname, contactnumber, address, email, password, username) VALUES ('${firstname}', '${lastname}', ${contactNumber}, '${address}', '${email}', '${bcryptPassword}', '${username}') RETURNING *`
    );

    const token = generateJWT(newAdmin.rows[0]);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

//! PRIVATE ROUTES
//* ADMIN
app.post('/register', async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      contactNumber,
      address,
      email,
      username,
      password,
    } = req.body;

    const admin = await pool.query(
      `SELECT * FROM admins WHERE username = '${username}'`
    );

    if (admin.rows.length > 0) {
      return res.status(401).send('User already exist');
    }

    // bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newAdmin = await pool.query(
      `INSERT INTO admins (firstname, lastname, contactnumber, address, email, password, username) VALUES ('${firstname}', '${lastname}', ${contactNumber}, '${address}', '${email}', '${bcryptPassword}', '${username}') RETURNING *`
    );

    const token = generateJWT(newAdmin.rows[0]);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});
app.get('/profile', auth, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(err);
  }
});

app.get('/allAdmins', auth, async (req, res) => {
  try {
    const getAdmin = await pool.query(`SELECT * FROM admins`);

    return res.json(getAdmin.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete('/admins/:id', async (req, res) => {
  try {
    const id = req.params['id'];
    await pool.query(`DELETE FROM admins WHERE id = ${id}`);

    return res.json({ msg: `Deleted admin with an id of ${id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

//* CLIENTS
app.get('/allClients', auth, async (req, res) => {
  try {
    const getClient = await pool.query(`SELECT * FROM clients`);

    return res.json(getClient.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

app.get('/client/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];
    const getClient = await pool.query(
      `SELECT * FROM clients WHERE client_id = ${id};`
    );

    return res.json(getClient.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Client Email
app.get('/email/:email', auth, async (req, res) => {
  try {
    const email = req.params['email'];
    const getClient = await pool.query(
      `SELECT * FROM clients WHERE email = '${email}';`
    );

    return res.json(getClient.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// New Client
app.post('/addClient', async (req, res) => {
  try {
    const { firstname, lastname, contactNumber, address, email, username } =
      req.body;

    const user = await pool.query(
      `SELECT * FROM clients WHERE username = '${username}'`
    );

    if (user.rows.length > 0) {
      return res.status(401).send('User already exist');
    }

    const newClient = await pool.query(
      `INSERT INTO clients(firstname, lastname, contactnumber, address, email,  username) VALUES ('${firstname}', '${lastname}', ${contactNumber}, '${address}', '${email}', '${username}') RETURNING *`
    );

    return res.json(newClient);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

app.patch('/clients/:id', async (req, res) => {
  try {
    const id = req.params['id'];
    const { firstname, lastname, contactNumber, email, address } = req.body;

    // const updateClient = await pool.query(
    //   `UPDATE clients SET firstname = '${firstname}', lastname = '${lastname}', contactNumber = '${contactNumber}', email = '${email}', address = '${address}' WHERE id = ${id} RETURNING *`

    const updateClient = await pool.query(
      `UPDATE clients SET firstname = '${firstname}', lastname = '${lastname}', contactNumber = ${contactNumber}, address = '${address}', email = '${email}' WHERE client_id = ${id} RETURNING *;`
    );

    return res.json(updateClient.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

app.delete('/clients/:id', async (req, res) => {
  try {
    const id = req.params['id'];
    await pool.query(`DELETE FROM clients WHERE client_id = ${id}`);

    return res.json({ msg: `Deleted client with an id of ${id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

//* LOANS

// Get all loans
app.get('/allLoans', auth, async (req, res) => {
  try {
    const getLoans = await pool.query(
      `SELECT c.firstname, c.lastname, l.loan_id, l.type, l.gross_loan, l.amort, l.terms, l.date_released, l.maturity_date, l.balance, l.status FROM loans AS l INNER JOIN clients AS c ON l.client_id = c.client_id WHERE c.client_id = l.client_id`
    );

    return res.json(getLoans.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Get loans of one client
app.get('/loans/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const getClient = await pool.query(
      `SELECT c.firstname, c.client_id, l.loan_id, l.type, l.gross_loan, l.amort, l.terms, l.date_released, l.maturity_date, l.balance, l.status, l.client_id FROM loans AS l INNER JOIN clients AS c ON l.client_id = c.client_id WHERE c.client_id = '${id}'`
    );

    return res.json(getClient.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Get loan
app.get('/loan/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const getLoan = await pool.query(
      `SELECT c.firstname, c.lastname, l.loan_id, l.client_id, l.type, l.gross_loan, l.amort, l.terms, l.date_released, l.maturity_date, l.balance, l.status FROM loans AS l INNER JOIN clients AS c ON l.client_id = c.client_id WHERE l.loan_id = '${id}'`
    );

    return res.json(getLoan.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Get loan's maturity date
app.get('/dates', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const getLoan = await pool.query(`SELECT maturity_date FROM loans`);

    return res.json(getLoan.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Create loan for borrower page
app.post('/loans/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const {
      type,
      gross_loan,
      balance,
      amort,
      terms,
      date_released,
      maturity_date,
    } = req.body;

    const newLoan = await pool.query(
      `INSERT INTO loans(client_id, type, status, balance, gross_loan, amort, terms, date_released, maturity_date) VALUES (${id}, '${type}', 'Pending', ${balance}, ${gross_loan}, ${amort}, ${terms}, '${date_released}', '${maturity_date}') RETURNING *`
    );

    return res.json(newLoan.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Create loan for loans page
app.post('/loans/', auth, async (req, res) => {
  try {
    const {
      client_id,
      type,
      status,
      gross_loan,
      balance,
      amort,
      terms,
      date_released,
      maturity_date,
    } = req.body;

    const newLoan = await pool.query(
      `INSERT INTO loans(client_id, type, status, balance, gross_loan, amort, terms, date_released, maturity_date) VALUES (${client_id}, '${type}', '${status}',${balance}, ${gross_loan}, ${amort}, ${terms}, '${date_released}', '${maturity_date}') RETURNING *`
    );

    return res.json(newLoan.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Update loan
app.patch('/loans/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      type,
      balance,
      gross_loan,
      amort,
      terms,
      date_released,
      maturity_date,
      status,
    } = req.body;

    const updateLoan = await pool.query(
      `UPDATE loans SET type = '${type}', balance = '${balance}', gross_loan = ${gross_loan}, amort = ${amort}, terms = ${terms}, date_released = '${date_released}', maturity_date = '${maturity_date}', status = '${status}' WHERE loan_id = ${id} RETURNING *`
    );

    // If id is not the real user
    // if (updateLoan.rows.length === 0) {
    //   return res.json('This loan is not yours');
    // }

    // console.log(updateLoan.rows);
    return res.json(updateLoan.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// UPDATE LOAN PAYMENT
app.patch('/loan/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const updateLoan = await pool.query(
      `UPDATE loans SET balance = payments.new_balance FROM payments WHERE payments.loan_id = ${id} RETURNING *`
    );

    // If id is not the real user
    // if (updateLoan.rows.length === 0) {
    //   return res.json('This loan is not yours');
    // }

    // console.log(updateLoan.rows);
    return res.json(updateLoan.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Delete payment
app.delete('/payment/:id', auth, async (req, res) => {
  try {
    // const id = req.params['id'];
    const { id } = req.params;
    // console.log(id);
    // console.log(req.user.id);
    const deletePayment = await pool.query(
      `DELETE FROM payments WHERE id = ${id} RETURNING * `
    );

    if (deletePayment.rows.length === 0) {
      res.json('You are not authorize to delete loan');
    }

    return res.json({ msg: `Deleted payment with an id of ${id}` });
  } catch (error) {
    console.log(error.message);
  }
});

// Delete loan
app.delete('/loans/:id', auth, async (req, res) => {
  try {
    // const id = req.params['id'];
    const { id } = req.params;
    // console.log(id);
    // console.log(req.user.id);
    const deleteLoan = await pool.query(
      `DELETE FROM loans WHERE loan_id = ${id} RETURNING * `
    );

    if (deleteLoan.rows.length === 0) {
      res.json('You are not authorize to delete loan');
    }

    return res.json({ msg: `Deleted loan with an id of ${id}` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

//* PAYMENTS
// View all payments
app.get('/allPayments', auth, async (req, res) => {
  try {
    const getPayments = await pool.query(
      `SELECT c.firstname, c.lastname, p.id, p.amount, p.collection_date, p.new_balance, p.collected_by, p.method, p.loan_id FROM payments AS p INNER JOIN clients AS c ON p.client_id = c.client_id WHERE c.client_id = p.client_id`
    );

    return res.json(getPayments.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// View all client payments to single loan
app.get('/payments/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const getPayments = await pool.query(
      // `SELECT p.loan_id, l.type, l.gross_loan, l.amort, l.terms, l.date_released, l.maturity_date, l.balance, l.status, p.id, p.amount, p.collection_date, p.new_balance, p.collected_by, p.method FROM payments AS p INNER JOIN loans AS l ON p.loan_id = l.id WHERE l.id = ${id};`
      `SELECT * FROM payments WHERE client_id = ${id};`
    );

    return res.json(getPayments.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// Create payment for single loan
app.post('/payments/:id', auth, async (req, res) => {
  try {
    const id = req.params['id'];

    const {
      amount,
      collection_date,
      collected_by,
      new_balance,
      method,
      client_id,
    } = req.body;

    const addPayment = await pool.query(
      `INSERT INTO PAYMENTS (amount, collection_date, collected_by, new_balance, method, client_id, loan_id) VALUES (${amount}, '${collection_date}', '${collected_by}', ${new_balance}, '${method}', ${client_id}, ${id}) RETURNING *`
    );

    return res.json(addPayment.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

app.post('/loans/', auth, async (req, res) => {
  try {
    const {
      amount,
      collection_date,
      collected_by,
      new_balance,
      method,
      loan_id,
    } = req.body;

    const addPayment = await pool.query(
      `INSERT INTO payments (amount, collection_date, collected_by, new_balance, method, loan_id) VALUES (${amount}, '${collection_date}', '${collected_by}', ${new_balance}, '${method}', ${loan_id}) RETURNING *`
    );

    return res.json(addPayment.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// PAYMENT W. CLIENT ID AND LOAN ID
app.get('/payment/:client/:loan', auth, async (req, res) => {
  try {
    const client_id = req.params['client'];
    const loan_id = req.params['loan'];

    const getPayments = await pool.query(
      `SELECT * FROM payments WHERE client_id = ${client_id} AND loan_id = ${loan_id};`
    );

    return res.json(getPayments.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});


export {app, pool}
