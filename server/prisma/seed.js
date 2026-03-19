const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@easysauda.kz' },
    update: {},
    create: {
      email: 'admin@easysauda.kz',
      passwordHash: adminPassword,
      name: 'Дастан',
      role: 'ADMIN',
      language: 'ru',
    },
  });

  // Create demo student
  const studentPassword = await bcrypt.hash('student123', 12);
  const student = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      email: 'student@test.com',
      passwordHash: studentPassword,
      name: 'Тестовый Студент',
      role: 'STUDENT',
      language: 'ru',
    },
  });

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { slug: 'osnovy-trejdinga' },
    update: {},
    create: {
      slug: 'osnovy-trejdinga',
      titleRu: 'Основы трейдинга',
      titleKz: 'Трейдинг негіздері',
      descriptionRu: 'Полный курс для начинающих трейдеров. Вы изучите основы технического и фундаментального анализа, научитесь читать графики и управлять рисками.',
      descriptionKz: 'Жаңа бастаған трейдерлерге арналған толық курс. Сіз техникалық және фундаменталды талдаудың негіздерін үйренесіз, графиктерді оқуды және тәуекелдерді басқаруды үйренесіз.',
      shortDescriptionRu: 'Научитесь торговать с нуля за 4 недели',
      shortDescriptionKz: 'Нөлден бастап 4 аптада сауда жасауды үйреніңіз',
      price: 29990,
      originalPrice: 49990,
      level: 'BEGINNER',
      totalLessons: 8,
      totalDurationHours: 12,
      isPublished: true,
      metaTitleRu: 'Основы трейдинга — курс для начинающих | EasySauda',
      metaTitleKz: 'Трейдинг негіздері — жаңадан бастағандарға арналған курс | EasySauda',
      metaDescriptionRu: 'Научитесь торговать на бирже с нуля. Технический анализ, управление рисками, практика на реальных данных.',
      metaDescriptionKz: 'Биржада нөлден сауда жасауды үйреніңіз. Техникалық талдау, тәуекелдерді басқару, нақты деректер бойынша тәжірибе.',
    },
  });

  const course2 = await prisma.course.upsert({
    where: { slug: 'tekhnicheskij-analiz' },
    update: {},
    create: {
      slug: 'tekhnicheskij-analiz',
      titleRu: 'Технический анализ PRO',
      titleKz: 'Техникалық талдау PRO',
      descriptionRu: 'Продвинутый курс по техническому анализу. Паттерны, индикаторы, уровни поддержки и сопротивления, объёмный анализ.',
      descriptionKz: 'Техникалық талдау бойынша кеңейтілген курс. Паттерндер, индикаторлар, қолдау және қарсылық деңгейлері, көлемді талдау.',
      shortDescriptionRu: 'Освойте профессиональный технический анализ',
      shortDescriptionKz: 'Кәсіби техникалық талдауды меңгеріңіз',
      price: 49990,
      originalPrice: 79990,
      level: 'INTERMEDIATE',
      totalLessons: 12,
      totalDurationHours: 18,
      isPublished: true,
      metaTitleRu: 'Технический анализ PRO — продвинутый курс | EasySauda',
      metaTitleKz: 'Техникалық талдау PRO — кеңейтілген курс | EasySauda',
    },
  });

  const course3 = await prisma.course.upsert({
    where: { slug: 'upravlenie-riskami' },
    update: {},
    create: {
      slug: 'upravlenie-riskami',
      titleRu: 'Управление рисками и психология',
      titleKz: 'Тәуекелдерді басқару және психология',
      descriptionRu: 'Самый важный курс для трейдера. Научитесь контролировать эмоции, управлять капиталом и не терять деньги на рынке.',
      descriptionKz: 'Трейдер үшін ең маңызды курс. Эмоцияларды бақылауды, капиталды басқаруды және нарықта ақша жоғалтпауды үйреніңіз.',
      shortDescriptionRu: 'Не теряйте деньги — управляйте рисками',
      shortDescriptionKz: 'Ақша жоғалтпаңыз — тәуекелдерді басқарыңыз',
      price: 39990,
      level: 'INTERMEDIATE',
      totalLessons: 6,
      totalDurationHours: 8,
      isPublished: true,
    },
  });

  // Create lessons for course 1
  const lessons = [
    { titleRu: 'Что такое трейдинг?', titleKz: 'Трейдинг дегеніміз не?', order: 1, durationMinutes: 45, isFree: true },
    { titleRu: 'Типы рынков: акции, форекс, крипто', titleKz: 'Нарық түрлері: акциялар, форекс, крипто', order: 2, durationMinutes: 60, isFree: true },
    { titleRu: 'Как читать графики', titleKz: 'Графиктерді қалай оқу керек', order: 3, durationMinutes: 90, isFree: false },
    { titleRu: 'Свечные паттерны', titleKz: 'Шам паттерндері', order: 4, durationMinutes: 75, isFree: false },
    { titleRu: 'Уровни поддержки и сопротивления', titleKz: 'Қолдау және қарсылық деңгейлері', order: 5, durationMinutes: 60, isFree: false },
    { titleRu: 'Индикаторы: RSI, MACD, MA', titleKz: 'Индикаторлар: RSI, MACD, MA', order: 6, durationMinutes: 90, isFree: false },
    { titleRu: 'Управление рисками: основы', titleKz: 'Тәуекелдерді басқару: негіздер', order: 7, durationMinutes: 60, isFree: false },
    { titleRu: 'Практика: первая сделка', titleKz: 'Тәжірибе: бірінші мәміле', order: 8, durationMinutes: 120, isFree: false },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: { ...lesson, courseId: course1.id },
    });
  }

  console.log('Seed completed!');
  console.log(`Admin: admin@easysauda.kz / admin123`);
  console.log(`Student: student@test.com / student123`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
