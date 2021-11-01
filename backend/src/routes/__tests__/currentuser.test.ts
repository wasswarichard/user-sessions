import request from 'supertest';

import { app } from '../../app';

describe('Tests for fetching currentuser info', () => {
    it('should return a 200 with user info when a valid cookie is passed', async () => {
        // register a user before testing fetching the user info
        const response = await request(app)
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

        const cookie = response.get('Set-Cookie');

        return await request(app)
            .get('/api/users/currentuser')
            .set('Cookie', cookie)
            .expect(200)
            .expect(res =>
                expect(res.body.currentUser.email).toBe('test@test.com')
            );
    });

    it('should return empty user when a valid cookie is not passed', async () => {
        return await request(app)
            .get('/api/users/currentuser')
            .expect(200)
            .expect(res => expect(res.body.currentUser).toEqual({}));
    });
});
