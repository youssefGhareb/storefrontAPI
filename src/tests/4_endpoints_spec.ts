import app from "../server";
import supertest from 'supertest';
import jwt from 'jsonwebtoken'

describe('Testing all the API endpoints', () => {
    const request = supertest(app)

    it('Users index route should return array of users', async () => {
        const response = await request
            .get('/users')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
        expect(response.status).toBe(200)
        expect(response.body[0].firstname).toEqual('John')
        expect(response.body[0].lastname).toEqual('Doe')
        expect(response.body[0].id).toEqual(1)
    })

    it('users create should return valid token', async () => {
        const response = await request
            .post('/users')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "firstName": "Mark",
                "lastName": "Micheal",
                "password": "wfgwgwwgas"
            })
        expect(response.status).toBe(200)
        const token = response.body
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        expect(decoded).toBeTruthy()
    });
    it('users show should return correct data', async () => {
        const response = await request
            .get('/users/:id')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "id": "1"
            })
        expect(response.status).toBe(200)
        expect(response.body.firstname).toEqual('John')
        expect(response.body.lastname).toEqual('Doe')
        expect(response.body.id).toEqual(1)
    });
    it('users login should authorize created user', async () => {
        const response = await request
            .post('/users/login')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "firstname": "Mark",
                "password": "wfgwgwwgas"
            })
        expect(response.status).toBe(200)
        expect(response.body.password).toBeTruthy()
    });
    it('products index should return correct array of products', async () => {
        const response = await request
            .get('/products')
            .set('Accept', 'application/json')
        expect(response.status).toBe(200)
        expect(response.body[0].name).toEqual('Playstation 5')
        expect(response.body[0].price).toEqual(500)
        expect(response.body[0].id).toEqual(1)
    });
    it('products show should return correct data', async () => {
        const response = await request
            .get('/products/:id')
            .set('Accept', 'application/json')
            .send({
                "id": "1"
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toEqual('Playstation 5')
        expect(response.body.price).toEqual(500)
        expect(response.body.id).toEqual(1)
    });
    it('products create should create new product', async () => {
        const response = await request
            .post('/products')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "name": "Jordan 1s",
                "price": "1000"
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toEqual('Jordan 1s')
        expect(response.body.price).toEqual(1000)
        expect(response.body.id).toEqual(2)
    });
    it('Orders show should return correct order information', async () => {
        const response = await request
            .get('/orders/:id')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "user_id": "1"
            })
        expect(response.status).toBe(200)
        expect(response.body.id).toEqual(1)
        expect(response.body.user_id).toEqual(1)
        expect(response.body.status).toEqual('pending')
        expect(response.body.products[0].product_id).toEqual(1)
        expect(response.body.products[0].quantity).toEqual(3)
    })
    it('Orders create should create new order', async () => {
        const response = await request
            .post('/orders')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "user_id": "2",
                "status": "pending"
            })
        expect(response.status).toBe(200)
        expect(response.body.id).toEqual(2)
        expect(response.body.user_id).toEqual(2)
        expect(response.body.status).toEqual('pending')
    })
    it('Orders add to product should add product to order', async () => {
        const response = await request
            .post('/orders/add')
            .set('Accept', 'application/json')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RuYW1lIjoidG9rYSIsImxhc3RuYW1lIjoiRG9lIiwicGFzc3dvcmQiOiIkMmIkMTAkU0Rpd29ENGVWeFRHVmFkSkFpRVZnTy5ULjRWRDU3d3pwTVFxSHI4YmJWTUROYS5VTmpFZ2kifSwiaWF0IjoxNjY3NDgzNDgyfQ.VVogz-XSLbS2ITg4_xNBVJ2gILxD0DzJQqjSDt7fPUs', { type: 'bearer' })
            .send({
                "order_id": "2",
                "product_id": "2",
                "quantity": "4"
            })
        expect(response.status).toBe(200)
        expect(response.body.purchase_id).toEqual(2)
        expect(response.body.order_id).toEqual(2)
        expect(response.body.product_id).toEqual(2)
        expect(response.body.quantity).toEqual(4)
    })
});