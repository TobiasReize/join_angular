import { TaskInterface } from '../interfaces/task.interface';

export class Task {
    id: string;
    column: string;
    category: string;
    title: string;
    description: string;
    date: string;
    priority: 'low' | 'medium' | 'urgent';
    subtasks: {
        title: string,
        status: 'open' | 'done',
        id: string
    }[];
    contacts: string[];


    constructor(obj?: any, id?: string) {
        this.id = id ? id : '';
        this.column = obj ? obj.column : '';
        this.category = obj ? obj.category : '';
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.date = obj ? obj.date : '';
        this.priority = obj ? obj.priority : 'medium';
        this.subtasks = obj.subtasks ? obj.subtasks : [];
        this.contacts = obj.contacts ? obj.contacts : [];
    }


    toJson(): TaskInterface {
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
