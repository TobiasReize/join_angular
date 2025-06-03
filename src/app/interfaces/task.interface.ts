export interface TaskInterface {
    column: string,
    category: string,
    title: string,
    description: string,
    subtasks: {
        title: string,
        status: 'open' | 'done'
    }[],
    contacts: string[]
}
