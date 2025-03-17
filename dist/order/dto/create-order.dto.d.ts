import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
export declare class OrderDetailDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customer: CreateCustomerDto;
    rentalStartDate: Date;
    rentalEndDate: Date;
    comments?: string;
    orderDetails: OrderDetailDto[];
}
