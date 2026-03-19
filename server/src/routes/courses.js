const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/courses — public course list
router.get('/', async (req, res, next) => {
  try {
    const { level, sort } = req.query;
    const where = { isPublished: true };

    if (level) where.level = level;

    const orderBy = sort === 'price_asc' ? { price: 'asc' }
      : sort === 'price_desc' ? { price: 'desc' }
      : { createdAt: 'desc' };

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      include: {
        _count: { select: { enrollments: true, reviews: true } },
        reviews: { select: { rating: true } },
      },
    });

    const result = courses.map(course => {
      const avgRating = course.reviews.length > 0
        ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length
        : 0;
      const { reviews, ...rest } = course;
      return { ...rest, avgRating: Math.round(avgRating * 10) / 10 };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/courses/:slug — course detail
router.get('/:slug', async (req, res, next) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: req.params.slug },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: { id: true, titleRu: true, titleKz: true, order: true, durationMinutes: true, isFree: true },
        },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!course || !course.isPublished) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
