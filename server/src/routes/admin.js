const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticate, requireAdmin);

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [totalStudents, totalCourses, totalEnrollments, revenue] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.course.count(),
      prisma.enrollment.count({ where: { paymentStatus: 'COMPLETED' } }),
      prisma.enrollment.aggregate({
        where: { paymentStatus: 'COMPLETED' },
        _sum: { amountPaid: true },
      }),
    ]);

    res.json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      totalRevenue: revenue._sum.amountPaid || 0,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/courses
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      include: { _count: { select: { enrollments: true, lessons: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(courses);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/courses
router.post('/courses', async (req, res, next) => {
  try {
    const course = await prisma.course.create({ data: req.body });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/courses/:id
router.put('/courses/:id', async (req, res, next) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(course);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/courses/:id
router.delete('/courses/:id', async (req, res, next) => {
  try {
    await prisma.course.delete({ where: { id: req.params.id } });
    res.json({ message: 'Курс удалён' });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/courses/:id/lessons
router.post('/courses/:id/lessons', async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.create({
      data: { ...req.body, courseId: req.params.id },
    });

    // Update course lesson count
    const count = await prisma.lesson.count({ where: { courseId: req.params.id } });
    await prisma.course.update({
      where: { id: req.params.id },
      data: { totalLessons: count },
    });

    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/lessons/:id
router.put('/lessons/:id', async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/lessons/:id
router.delete('/lessons/:id', async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: req.params.id } });
    await prisma.lesson.delete({ where: { id: req.params.id } });

    // Update course lesson count
    const count = await prisma.lesson.count({ where: { courseId: lesson.courseId } });
    await prisma.course.update({
      where: { id: lesson.courseId },
      data: { totalLessons: count },
    });

    res.json({ message: 'Урок удалён' });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/students
router.get('/students', async (req, res, next) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true, email: true, name: true, createdAt: true,
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/payments
router.get('/payments', async (req, res, next) => {
  try {
    const payments = await prisma.enrollment.findMany({
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { titleRu: true, slug: true } },
      },
      orderBy: { enrolledAt: 'desc' },
    });
    res.json(payments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
