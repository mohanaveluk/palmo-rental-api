import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { emailId: email } });
  }

  async createOrUpdate(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.findByEmail(createCustomerDto.emailId);

    if (existingCustomer) {
      // Update existing customer with new information
      this.customerRepository.merge(existingCustomer, createCustomerDto);
      return this.customerRepository.save(existingCustomer);
    }

    // Create new customer if doesn't exist
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }
  
  async findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id } });
  }
}