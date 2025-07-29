import {
  Student,
  Teacher,
} from '@features/user-profile/interfaces/user-profile';

export interface CourseSchedule {
  id: number;
  status_name: string;
  status: number;
  course_id: number;
  teacher_id: number;
  classroom_id: number;
  duration: number;
  date: string;
  date_start: string;
  date_end: string;
  day: number;
  start_time: string;
  end_time: string;
  course: Course;
  teacher: Teacher;
  attendance: Attendance;
}

export interface Course {
  id: number;
  student_id: number;
  course_package_id: number;
  instrument_id: number;
  music_genre_id: number;
  branch_id: number;
  description: string;
  student: Student;
}

export interface Attendance {
  id: number;
  status_name: string;
  status: number;
  course_schedule_id: number;
  file_path: string;
  note: string;
}
