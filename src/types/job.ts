export type JobStatus = 'pending' | 'in_progress' | 'done' | 'fail';
export const JOB_STATUS = {
  pending: 'Đang thực hiện',
  in_progress: 'Đang thực hiện',
  done: 'Đã hoàn tất',
  fail: 'Thất bại',
};

export interface Job {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  data: string;
  status: JobStatus;
  session_id: string;
  error: string;
}
