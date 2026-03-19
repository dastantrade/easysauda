const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/lessons/:id — get lesson (check access)
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { course: { select: { id: true, slug: true, titleRu: true, titleKz: true } } },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }

    // Free lessons are accessible to everyone
    if (!lesson.isFree) {
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          userId: req.user.id,
          courseId: lesson.courseId,
          paymentStatus: 'COMPLETED',
        },
      });

      if (!enrollment && req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Необходимо приобрести курс' });
      }
    }

    // Get user progress for this lesson
    const progress = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: req.user.id, lessonId: lesson.id } },
    });

    // Get prev/next lessons
    const siblings = await prisma.lesson.findMany({
      where: { courseId: lesson.courseId },
      orderBy: { order: 'asc' },
      select: { id: true, order: true, titleRu: true, titleKz: true },
    });

    const currentIndex = siblings.findIndex(s => s.id === lesson.id);
    const prevLesson = currentIndex > 0 ? siblings[currentIndex - 1] : null;
    const nextLesson = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

    res.json({ lesson, progress, prevLesson, nextLesson });
  } catch (error) {
    next(error);
  }
});

// POST /api/lessons/:id/progress — update progress
router.post('/:id/progress', authenticate, async (req, res, next) => {
  try {
    const { progressPercent, watchTimeSeconds, completed } = req.body;

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: req.user.id, lessonId: req.params.id } },
      update: {
        progressPercent: progressPercent ?? undefined,
        watchTimeSeconds: watchTimeSeconds ?? undefined,
        completed: completed ?? undefined,
        lastWatchedAt: new Date(),
      },
      create: {
        userId: req.user.id,
        lessonId: req.params.id,
        progressPercent: progressPercent || 0,
        watchTimeSeconds: watchTimeSeconds || 0,
        completed: completed || false,
      },
    });

    res.json(progress);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
