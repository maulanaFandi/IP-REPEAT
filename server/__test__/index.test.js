const request = require('supertest');
const authentication = require('../middlewares/authentication');
const { User, Transaction } = require('../models');
const app = require('../app')

describe('Global Routes', () => {
    describe('POST /register', () => {
      it('should create a new user and return a 200 status code', async () => {
        const res = await request(app)
          .post('/register')
          .send({
            email: 'testuser@example.com',
            password: 'testpassword'
          });
  
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.email).toBe('testuser@example.com');
      });
    });
  
    describe('POST /login', () => {
      it('should login a user and return a 200 status code', async () => {
        const user = await User.create({
          email: 'testuser@example.com',
          password: 'testpassword'
        });
  
        const res = await request(app)
          .post('/login')
          .send({
            email: 'testuser@example.com',
            password: 'testpassword'
          });
  
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.email).toBe('testuser@example.com');
      });
    })
})