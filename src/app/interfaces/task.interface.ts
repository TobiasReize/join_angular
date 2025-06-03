export interface TaskInterface {
    column: string,
    category: string,
    title: string,
    description: string,
    date: string,
    priority: 'low' | 'medium' | 'urgent',
    subtasks: {
        title: string,
        status: 'open' | 'done'
    }[],
    contacts: string[]
}
