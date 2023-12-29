export interface resolutionType {
  id: number;
  title: string;
  content: string;
  dueDate: string;
  progress: number;
  user: string;
}

export type Form = {
  title: string;
  content: string;
  dueDate: Date;
};