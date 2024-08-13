import { Request, Response } from "express"
import { CustomerUpdateByIdService } from "../services/CustomerUpdateByIdService"

export class CustomerUpdateById {

    constructor(readonly service: CustomerUpdateByIdService) {
    }

    async execute(request: Request, response: Response) {
        const { id } = request.params
        const { name, password } = request.body
        const customer = await this.service.execute(id, name, password)
        response.status(200).json({customer})
    }
}