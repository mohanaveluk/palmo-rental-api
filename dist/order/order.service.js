"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_detail_entity_1 = require("./entities/order-detail.entity");
const product_service_1 = require("../product/product.service");
const customer_service_1 = require("../customer/customer.service");
const email_service_1 = require("../common/email/email.service");
const order_confirmation_template_1 = require("../common/email/templates/order-confirmation.template");
let OrderService = class OrderService {
    constructor(orderRepository, orderDetailRepository, productService, customerService, emailService) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productService = productService;
        this.customerService = customerService;
        this.emailService = emailService;
    }
    async create(createOrderDto) {
        const customer = await this.customerService.createOrUpdate(createOrderDto.customer);
        let totalAmount = 0;
        const orderDetails = [];
        for (const detail of createOrderDto.orderDetails) {
            const product = await this.productService.findOne(detail.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${detail.productId} not found`);
            }
            totalAmount += product.price * detail.quantity;
            orderDetails.push({
                product,
                quantity: detail.quantity
            });
        }
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
        var template = (0, order_confirmation_template_1.generateOrderConfirmationTemplate)(orderDetail);
        await this.emailService.sendEmail({
            to: customer.emailId,
            subject: `Palmo - Order Confirmation: ${order.rentalStartDate}`,
            html: (0, order_confirmation_template_1.generateOrderConfirmationTemplate)(orderDetail)
        });
        await this.emailService.sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: `Order Confirmation: ${order.id}`,
            html: (0, order_confirmation_template_1.generateOrderConfirmationTemplate)(orderDetail),
        });
        return orderDetail;
    }
    async findAll() {
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
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderDetails', 'orderDetails.product']
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const customer = await this.customerService.findOne(order.customerId);
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return this.mapToResponseDto(order, customer);
    }
    mapToResponseDto(order, customer) {
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        product_service_1.ProductService,
        customer_service_1.CustomerService,
        email_service_1.EmailService])
], OrderService);
//# sourceMappingURL=order.service.js.map