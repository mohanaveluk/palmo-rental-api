import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../customer/entities/customer.entity';
export declare class OrderDetailResponseDto {
    id: string;
    orderId: string;
    product: Product;
    quantity: number;
}
export declare class OrderResponseDto {
    id: string;
    customer: Customer;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalAmount: number;
    comments?: string;
    isCancelled: boolean;
    createdAt: Date;
    updatedAt: Date;
    orderDetails: OrderDetailResponseDto[];
}
