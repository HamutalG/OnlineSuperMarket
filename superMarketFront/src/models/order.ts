export class Order {
    _id;
    customerId: string;
    city: string;
    street: string;
    shippingDate: Date;
    updatedAt: Date;
    last4Digits: number;
    total: number;
    productsBought;
}
