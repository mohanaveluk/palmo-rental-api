import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../customer/entities/customer.entity';

export class OrderDetailResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: () => Product })
  product: Product;

  @ApiProperty()
  quantity: number;
}

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => Customer })
  customer: Customer;

  @ApiProperty()
  rentalStartDate: Date;

  @ApiProperty()
  rentalEndDate: Date;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ required: false })
  comments?: string;

  @ApiProperty()
  isCancelled: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [OrderDetailResponseDto] })
  orderDetails: OrderDetailResponseDto[];
}