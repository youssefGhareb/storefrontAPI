import { Order, orderStore } from '../models/order';
import { PurchasedProduct, purchasedProductStore } from '../models/purchasedProduct';

const store = new orderStore()
const store2 = new purchasedProductStore()


describe("Order model", () => {

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should return the correct Order', async () => {
        await store.create({
            id: null,
            user_id:1,
            status:'pending',
            products:null
        })

        await store2.create({
            id: undefined,
            order_id: 1,
            product_id:1,
            quantity:3
        })

        const result = await store.show('1')

        expect(result).toEqual({
            id: 1,
            user_id:1,
            status: 'pending',
            products: [
                {
                    id: undefined,
                    order_id:undefined,
                    product_id:1,
                    quantity:3
                }
            ]
        });
    });

})