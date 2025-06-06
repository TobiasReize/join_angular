import { TaskInterface } from '../interfaces/task.interface';

export class Task {
    column: string;
    category: string;
    title: string;
    description: string;
    date: string;
    priority: 'low' | 'medium' | 'urgent';
    subtasks: {
        title: string,
        status: 'open' | 'done'
    }[];
    contacts: string[];


    constructor(obj?: any) {
        this.column = obj ? obj.column : '';
        this.category = obj ? obj.category : '';
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.date = obj ? obj.date : '';
        this.priority = obj ? obj.priority : 'medium';
        this.subtasks = obj ? obj.subtasks : [];
        this.contacts = obj ? obj.contacts : [];
    }


    toJson():TaskInterface {
        return {
            column: this.column,
            category: this.category,
            title: this.title,
            description: this.description,
            date: this.date,
            priority: this.priority,
            subtasks: this.subtasks,
            contacts: this.contacts
        }
    }

}
