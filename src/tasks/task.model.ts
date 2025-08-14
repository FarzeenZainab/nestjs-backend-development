export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
}

// we will create enum for statuses becuase
// tasks statuses are limited and do not change often.
// enum is used to acheive this
export enum TaskStatuses {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
