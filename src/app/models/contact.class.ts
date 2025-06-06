import { ContactInterface } from '../interfaces/contact.interface';

export class Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    color: string;


    constructor(obj?: any, id?: string) {
        this.id = id ? id : '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.color = obj ? obj.color : '';
    }


    toJson(): ContactInterface {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            color: this.color,
        }
    }

}
