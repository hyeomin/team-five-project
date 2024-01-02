export interface resolutionType {
  id: number;
  created_at: string;
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

export interface editResolutionType {
  id: number;
  content: string;
}

export interface editProgressType {
  id: number;
  progress: number;
  checkedList: [];
}
