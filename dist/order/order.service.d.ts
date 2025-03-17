import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
export declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    private productService;
    private customerService;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>, productService: ProductService, customerService: CustomerService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findAll(): Promise<OrderResponseDto[]>;
    findOne(id: string): Promise<OrderResponseDto>;
    private mapToResponseDto;
}
