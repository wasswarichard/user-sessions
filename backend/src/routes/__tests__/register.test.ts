import request from 'supertest';

import { app } from '../../app';

describe('Tests for user registration', () => {
    it('should return a 201 on successful user registration', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'John Doe',
                email: 'test@test.com',
                password: 'passw0rd'
            })
            .expect(201)
            .expect(res => {
                const { fullName, email } = res.body;
                expect(fullName).toBe('John Doe');
                expect(email).toBe('test@test.com');
            });
    });

    it('should return a 400 on providing invalid fullName', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'Jo',
                email: 'test@test.com',
                password: 'passw0rd'
            })
            .expect(400);
    });

    it('should return a 400 on providing invalid email', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'John Doe',
                email: 'test',
                password: 'passw0rd123'
            })
            .expect(400);
    });

    it('should return a 400 on providing invalid password', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'John Doe',
                email: 'test',
                password: 'pass'
            })
            .expect(400);
    });

    it('should return a 400 on providing invalid password (no digits)', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'John Doe',
                email: 'test',
                password: 'strongpassword'
            })
            .expect(400);
    });

    it('should return a 400 on providing invalid password (no alphabets)', async () => {
        return request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                fullName: 'John Doe',
                email: 'test',
                password: '12345678'
            })
            .expect(400);
    });
});
