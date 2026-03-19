const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// All dashboard routes require authentication
router.use(authenticate);

// GET /api/dashboard/overview
router.get('/overview', async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id, paymentStatus: 'COMPLETED' },
      include: {
        course: {
          include: {
            lessons: { select: { id: true }, orderBy: { order: 'asc' } },
          },
        },
      },
    });

    const progress = await prisma.lessonProgress.findMany({
      where: { userId: req.user.id },
    });

    const progressMap = new Map(progress.map(p => [p.lessonId, p]));

    const courses = enrollments.map(enrollment => {
      const totalLessons = enrollment.course.lessons.length;
      const completedLessons = enrollment.course.lessons.filter(
        l => progressMap.get(l.id)?.completed
      ).length;

      return {
        ...enrollment.course,
        completedLessons,
        totalLessons,
        progressPercent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      };
    });

    const totalWatchTime = progress.reduce((sum, p) => sum + p.watchTimeSeconds, 0);
    const totalCompleted = progress.filter(p => p.completed).length;

    res.json({
      courses,
      stats: {
        totalCourses: enrollments.length,
        totalWatchTimeHours: Math.round(totalWatchTime / 3600 * 10) / 10,
        completedLessons: totalCompleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/courses
router.get('/courses', async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id, paymentStatus: 'COMPLETED' },
      include: {
        course: {
          include: { lessons: { select: { id: true } } },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    const progress = await prisma.lessonProgress.findMany({
      where: { userId: req.user.id },
    });

    const progressMap = new Map(progress.map(p => [p.lessonId, p]));

    const courses = enrollments.map(e => {
      const completedLessons = e.course.lessons.filter(
        l => progressMap.get(l.id)?.completed
      ).length;

      return {
        ...e.course,
        enrolledAt: e.enrolledAt,
        completedLessons,
        progressPercent: e.course.lessons.length > 0
          ? Math.round((completedLessons / e.course.lessons.length) * 100)
          : 0,
      };
    });

    res.json(courses);
  } catch (error) {
    next(error);
  }
});

// PUT /api/dashboard/profile
router.put('/profile', async (req, res, next) => {
  try {
    const { name, phone, language } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        language: language || undefined,
      },
      select: { id: true, email: true, name: true, phone: true, role: true, language: true, avatarUrl: true },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// PUT /api/dashboard/password
router.put('/password', async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Новый пароль должен быть не менее 6 символов' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValid) {
      return res.status(400).json({ error: 'Неверный текущий пароль' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { passwordHash },
    });

    res.json({ message: 'Пароль успешно изменён' });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/payments
router.get('/payments', async (req, res, next) => {
  try {
    const payments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: { course: { select: { titleRu: true, titleKz: true, slug: true } } },
      orderBy: { enrolledAt: 'desc' },
    });

    res.json(payments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
