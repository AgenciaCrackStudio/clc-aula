-- App-wide role catalog. Only 'student' authenticates in this repo (the student aula);
-- the rest exist for the separate admin platform (coordinator/teacher/director panels).
create type public.app_role as enum ('student', 'teacher', 'coordinator', 'director', 'admin');
