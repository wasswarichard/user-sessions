import request from 'supertest';

import { app } from '../../app';

describe('Tests for logout', () => {
    it('should return a 200 on successful logout', async () => {
        // register a user before testing logout for the user
        await request(app)
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

        return await request(app).post('/api/users/logout').expect(200);
    });
});
