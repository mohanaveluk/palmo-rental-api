import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
import { EmailService } from 'src/common/email/email.service';
import { generateOrderConfirmationTemplate } from 'src/common/email/templates/order-confirmation.template';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private productService: ProductService,
    private customerService: CustomerService,
    private emailService: EmailService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    // Create customer first
    const customer = await this.customerService.createOrUpdate(createOrderDto.customer);

    let totalAmount = 0;
    const orderDetails = [];

    // Calculate total amount and create order details
    for (const detail of createOrderDto.orderDetails) {
      const product = await this.productService.findOne(detail.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${detail.productId} not found`);
      }

      totalAmount += product.price * detail.quantity;
      orderDetails.push({
        product,
        quantity: detail.quantity
      });
    }

    // Create order
    const order = this.orderRepository.create({
      customerId: customer.id,
      rentalStartDate: createOrderDto.rentalStartDate,
      rentalEndDate: createOrderDto.rentalEndDate,
      comments: createOrderDto.comments,
      totalAmount,
      isCancelled: false,
      orderDetails: orderDetails
    });

    const savedOrder = await this.orderRepository.save(order);
    var orderDetail = this.mapToResponseDto(savedOrder, customer);

    //Send order confirmation email
    var template = generateOrderConfirmationTemplate(orderDetail);

    await this.emailService.sendEmail({
      to: customer.emailId,
      subject: `Palmo - Order Confirmation: ${order.rentalStartDate}`,
      html: generateOrderConfirmationTemplate(orderDetail)
    }); 

    await this.emailService.sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Order Confirmation: ${order.id}`,
      html: generateOrderConfirmationTemplate(orderDetail),
    }); 


    return orderDetail;
  }

  async findAll(): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({
      relations: ['orderDetails', 'orderDetails.product']
    });

    const orderResponses = [];
    for (const order of orders) {
      const customer = await this.customerService.findOne(order.customerId);
      orderResponses.push(this.mapToResponseDto(order, customer));
    }
    
    return orderResponses;
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.product']
    });
    
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const customer = await this.customerService.findOne(order.customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    
    return this.mapToResponseDto(order, customer);
  }

  private mapToResponseDto(order: Order, customer: any): OrderResponseDto {
    return {
      id: order.id,
      customer,
      rentalStartDate: order.rentalStartDate,
      rentalEndDate: order.rentalEndDate,
      totalAmount: order.totalAmount,
      comments: order.comments,
      isCancelled: order.isCancelled,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderDetails: order.orderDetails
    };
  }
}