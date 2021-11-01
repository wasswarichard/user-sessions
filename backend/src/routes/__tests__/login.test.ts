import request from 'supertest';

import { app } from '../../app';

describe('Tests for user login', () => {
    it('should return 400 on invalid email', async () => {
        return request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'idontexist@db.com',
                password: 'passw0rd'
            })
            .expect(400);
    });

    it('should return 400 on invalid password', async () => {
        return request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@test.com',
                password: ''
            })
            .expect(400);
    });
});
