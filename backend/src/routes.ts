import { Request, Response } from 'express';
import pool from './db';

export const setupRoutes = (app: any) => {
  // POST /api/teachers - Add a teacher
  app.post('/api/teachers', async (req: Request, res: Response): Promise<Response> => {
    const { name, subject, email, contactNumber } = req.body;

    if (!name || !subject || !email || !contactNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newTeacher = await pool.query(
        'INSERT INTO teachers (name, subject, email, contactnumber) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, subject, email, contactNumber]
      );
      return res.status(201).json(newTeacher.rows[0]);
    } catch (err) {
      console.error("error adding teacher", err)
      return res.status(500).json({ error: 'Failed to add teacher' });
    }
  });

  // GET /api/teachers - List all teachers
  app.get('/api/teachers', async (req: Request, res: Response): Promise<Response> => {
    try {
      const teachers = await pool.query('SELECT * FROM teachers');
      return res.status(200).json({ data: teachers.rows });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve teachers' });
    }
  });

  // POST /api/classes - Add a new class
  app.post('/api/classes', async (req: Request, res: Response): Promise<Response> => {
    const { level, name, teacherEmail } = req.body;

    if (!level || !name || !teacherEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Check if teacher exists
      const teacherResult = await pool.query('SELECT id FROM teachers WHERE email = $1', [teacherEmail]);
      if (teacherResult.rows.length === 0) {
        return res.status(400).json({ error: 'Teacher not found' });
      }

      const teacherId = teacherResult.rows[0].id;

      // Check if teacher is already assigned as a form teacher
      const existingClass = await pool.query('SELECT * FROM classes WHERE teacherId = $1', [teacherId]);
      if (existingClass.rows.length > 0) {
        return res.status(400).json({ error: 'Teacher is already a form teacher for another class' });
      }

      // Add the class
      const newClass = await pool.query(
        'INSERT INTO classes (level, name, teacherId) VALUES ($1, $2, $3) RETURNING *',
        [level, name, teacherId]
      );
      return res.status(201).json(newClass.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add class' });
    }
  });

  // GET /api/classes - List all classes
  app.get('/api/classes', async (req: Request, res: Response): Promise<Response> => {
    try {
      const classes = await pool.query(
        'SELECT c.level, c.name, t.name AS formTeacher FROM classes c LEFT JOIN teachers t ON c.teacherId = t.id'
      );
      return res.status(200).json({ data: classes.rows });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve classes' });
    }
  });
};
