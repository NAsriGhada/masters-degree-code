-- ================================
-- Step 2: SQL Table Creation (3NF)
-- Target DB: PostgreSQL (minor tweaks needed for MySQL)
-- ================================

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS students;

-- ========== Students ==========
CREATE TABLE students (
  student_id  SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  age         INT NOT NULL CHECK (age > 17)
);

-- ========== Instructors ==========
CREATE TABLE instructors (
  instructor_id  SERIAL PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  department     VARCHAR(100) NOT NULL
);

-- ========== Courses ==========
CREATE TABLE courses (
  course_id      SERIAL PRIMARY KEY,
  title          VARCHAR(150) NOT NULL UNIQUE,
  credits        INT NOT NULL CHECK (credits BETWEEN 1 AND 6),
  instructor_id  INT NOT NULL,
  CONSTRAINT fk_courses_instructor
    FOREIGN KEY (instructor_id)
    REFERENCES instructors(instructor_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ========== Enrollments (M:N) ==========
CREATE TABLE enrollments (
  student_id  INT NOT NULL,
  course_id   INT NOT NULL,
  grade       VARCHAR(2),
  PRIMARY KEY (student_id, course_id),

  CONSTRAINT fk_enrollments_student
    FOREIGN KEY (student_id)
    REFERENCES students(student_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_enrollments_course
    FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  -- allow NULL when not graded yet
  CONSTRAINT chk_grade
    CHECK (grade IS NULL OR grade IN ('A','B','C','D','E','F'))
);


-- ================================
-- Step 3: Insert Sample Data
-- (3 students, 3 instructors, 3 courses, 4 enrollments)
-- ================================

-- Instructors
INSERT INTO instructors (name, department) VALUES
('Dr. Amina Ben Salah', 'Computer Science'),
('Dr. Karim Haddad', 'Information Systems'),
('Dr. Leila Trabelsi', 'Mathematics');

-- Courses
INSERT INTO courses (title, credits, instructor_id) VALUES
('Database Systems', 3, 1),
('Web Development', 4, 2),
('Discrete Mathematics', 3, 3);

-- Students
INSERT INTO students (name, email, age) VALUES
('Med Yosri Nasri', 'yosri.nasri@example.com', 23),
('Sara Bouazizi', 'sara.bouazizi@example.com', 20),
('Ahmed Jridi', 'ahmed.jridi@example.com', 19);

-- Enrollments (student_id, course_id, grade)
INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A'),    -- Yosri in Database Systems
(1, 2, 'B'),    -- Yosri in Web Development
(2, 1, 'B'),    -- Sara in Database Systems
(3, 3, NULL);   -- Ahmed in Discrete Math, not graded yet


-- ================================
-- Step 4: Query Execution
-- ================================

-- 1) Retrieve all students enrolled in the course "Database Systems"
SELECT s.student_id, s.name, s.email, s.age
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
JOIN courses c ON c.course_id = e.course_id
WHERE c.title = 'Database Systems'
ORDER BY s.student_id;

-- 2) List all courses along with the names of their instructors
SELECT c.course_id, c.title, c.credits, i.name AS instructor_name, i.department
FROM courses c
JOIN instructors i ON i.instructor_id = c.instructor_id
ORDER BY c.course_id;

-- 3) Find students who are not enrolled in any course
SELECT s.student_id, s.name, s.email
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.student_id
WHERE e.student_id IS NULL
ORDER BY s.student_id;

-- 4) Update the email address of a student (example: student_id = 2)
UPDATE students
SET email = 'sara.new@example.com'
WHERE student_id = 2;

-- Verify update (optional)
SELECT student_id, name, email FROM students WHERE student_id = 2;

-- 5) Delete a course by its ID (example: course_id = 2)
-- Note: enrollments for this course will be deleted automatically due to ON DELETE CASCADE.
DELETE FROM courses
WHERE course_id = 2;

-- Verify delete (optional)
SELECT * FROM courses ORDER BY course_id;

