export class User {
    id: string;
    name: string;
    email: string;


    constructor(obj?: any, id?: string) {
        this.id = id ? id : '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
    }


    toJson() {
        return {
            name: this.name,
            email: this.email,
        }
    }

}
