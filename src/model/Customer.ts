import { Uuid } from "./Uuid"

export class Customer {
    private id: Uuid;
    private name: string;
    private password: string;

    constructor(name: string, password: string, id?: string) {
        this.id = id ? new Uuid(id) : Uuid.randomGenerator();
        this.name = name;
        this.password = password;
    }

    static create(name: string, password: string, id?: string): Customer {
        return new Customer(name, password, id);
    }

    public getId(): Uuid {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPassword(): string {
        return this.password;
    }

}