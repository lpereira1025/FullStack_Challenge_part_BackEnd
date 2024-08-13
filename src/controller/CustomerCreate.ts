import { Request, Response } from "express"
import { CustomerCreateService } from "../services/CustomerCreateService"

export class CustomerCreate {

    constructor(readonly service: CustomerCreateService) {
    }

    async execute(request: Request, response: Response) {
        const { name, password } = request.body
        const customer = await this.service.execute(name, password)
        response.status(201).json({customer})
    }
}