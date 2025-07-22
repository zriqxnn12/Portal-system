// main account
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone_no: string;
  address: string;
  birth_place: string;
  birth_date: string;
  profile_file_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  student: Student;
  staff: Staff;
}

export interface Staff {
  id: number;
  user_id: number;
  role_name: string;
  status_name: string;
  role: number;
  status: number;
  note: string;
  teacher: Teacher;
  user: User;
}

export interface Student {
  id: number;
  user_id: number;
  gender: string;
  religion: string;
  school: string;
  province: string;
  city: string;
  whatsapp_number: string;
  note: string;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Teacher {
  id: number;
  type_name: string;
  staff_id: number;
  classroom_id: number;
  branch_id: number;
  type: number;
  description: string;
  qualify: string;
  staff: Staff;
  classroom: Classroom;
  branch: Branch;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
}

export interface Classroom {
  id: number;
  room: string;
  location: string;
  branch_id: number;
  branch: Branch;
}
