import { User, userStore } from '../models/user';

const store = new userStore()

describe("User model", () => {
    let insertResult: User

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should create method should add a book', async () => {
        const user: User = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: '123'
        }
        const result = await store.create(user);
        expect(result).toBeTruthy();
        insertResult = result
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        expect(result).toEqual(insertResult);
    });
    it('should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([insertResult]);
    });

})