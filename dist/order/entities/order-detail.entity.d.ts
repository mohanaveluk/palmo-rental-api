import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';
export declare class OrderDetail {
    id: string;
    orderId: string;
    order: Order;
    product: Product;
    quantity: number;
}
