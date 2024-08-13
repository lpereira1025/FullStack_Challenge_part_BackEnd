import knex, { Knex } from 'knex';
import { Customer } from '../../../model/Customer';
import { CustomerRepository } from '../../../model/repository/CustomerRepository';
import { development } from './KnexConfig';
import { Uuid } from '../../../model/Uuid';
import { CustomerUpdateDTO } from '../../../controller/dtos/CustomerUpdateDTO';

export class CustomerRepositoryDatabase implements CustomerRepository {
    private connection: Knex

    constructor() {
        this.connection = knex(development)
    }

    async save(customer: Customer): Promise<void> {
        await this.connection('customer').insert({
            'id': customer.getId().getValue(),
            'name': customer.getName(),
            'password': customer.getPassword()
        })
    }

    async getAll(): Promise<Customer[]> {
        const customerCollection: Array<Customer> = []

        const customers = await this.connection('customer').select('*')

        for (var i = 0; i < customers.length; i++) {
            const customer = customers[i]
            const id = customer['id']
            const name = customer['name']
            const password = customer['password']
            customerCollection.push(Customer.create(name, password, id))
        }
        return customerCollection
    }
    
    async getById(id: Uuid): Promise<Customer> {
        const customer: any = await this.connection('customer').select('*').where({'id': id.getValue()}).limit(1)
        if (!customer) {
            throw new Error(`Customer not found: ${id.getValue()}`)
        }
        return Customer.create(customer[0]['name'], customer[0]['password'], customer[0]['id'])
    }

    async remove(id: Uuid): Promise<void> {
        await this.connection('customer').where({'id': id.getValue()}).delete()
    }

    async update(id: Uuid, customerDto: CustomerUpdateDTO): Promise<Customer> {
        await this.connection('customer').where({'id': id.getValue()}).update({
            'name': customerDto.name,
            'password': customerDto.password
        })
        return await this.getById(id)        
    }
}