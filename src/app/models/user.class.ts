export class User {
    uid: string;
    name: string;
    email: string;


    constructor(obj?: any, uid?: string) {
        this.uid = uid ? uid : '';
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
