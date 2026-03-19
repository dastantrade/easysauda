const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/payments/create-checkout
router.post('/create-checkout', authenticate, async (req, res, next) => {
  try {
    const { courseId, paymentMethod } = req.body;

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findFirst({
      where: { userId: req.user.id, courseId, paymentStatus: 'COMPLETED' },
    });
    if (existing) {
      return res.status(400).json({ error: 'Вы уже приобрели этот курс' });
    }

    // Create pending enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId,
        paymentMethod: paymentMethod || 'STRIPE',
        amountPaid: course.price,
        paymentStatus: 'PENDING',
      },
    });

    // TODO: Integrate Stripe Checkout Session creation here
    // For now, return enrollment ID for manual confirmation
    res.json({
      enrollmentId: enrollment.id,
      amount: course.price,
      message: 'Оплата создана. Интеграция с платёжной системой будет добавлена.',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/payments/confirm (temporary — for development)
router.post('/confirm', authenticate, async (req, res, next) => {
  try {
    const { enrollmentId } = req.body;

    const enrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { paymentStatus: 'COMPLETED' },
    });

    res.json({ message: 'Оплата подтверждена', enrollment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
