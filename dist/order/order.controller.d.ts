import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(): Promise<OrderResponseDto[]>;
    findOne(id: string): Promise<OrderResponseDto>;
}
