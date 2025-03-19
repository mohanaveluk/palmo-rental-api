import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findByEmail(email: string): Promise<Customer | null>;
    createOrUpdate(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findOne(id: string): Promise<Customer>;
}
