import { OrderDetail } from './order-detail.entity';
export declare class Order {
    id: string;
    customerId: string;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalAmount: number;
    comments: string;
    isCancelled: boolean;
    createdAt: Date;
    updatedAt: Date;
    orderDetails: OrderDetail[];
}
