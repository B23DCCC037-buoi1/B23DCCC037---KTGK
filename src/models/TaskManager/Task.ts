export type Priority = 'Thấp' | 'Trung bình' | 'Cao';
export type Status = 'Chưa làm' | 'Đang làm' | 'Đã xong';

export interface Task {
  id: string;
  name: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
}

