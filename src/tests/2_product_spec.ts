import { Product, productStore } from '../models/product';

const store = new productStore()

describe("Product model", () => {

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should create method should add a Product', async () => {
        const product: Product = {
            id: 1,
            name: 'Playstation 5',
            price: 500
        }
        const result = await store.create(product);
        expect(result).toEqual({
            id: 1,
            name: 'Playstation 5',
            price: 500
        });
    });

    it('show method should return the correct Product', async () => {
        const result = await store.show("1");

        expect(result).toEqual({
            id: 1,
            name: 'Playstation 5',
            price: 500
        });
    });
    it('should return a list of Products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'Playstation 5',
            price: 500
        }]);
    });

})