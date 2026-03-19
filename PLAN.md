# EasySauda — План разработки платформы

## Обзор проекта

**EasySauda** — платформа обучения трейдингу для начинающих (рынок СНГ).
Трейдер-практик обучает новичков через видеокурсы, разборы сделок и менторство.

- **Языки интерфейса:** Русский + Казахский
- **Целевая аудитория:** Начинающие трейдеры СНГ (преимущественно KZ/RU)
- **Монетизация:** Freemium + подписка + разовые покупки курсов

### Ключевые требования
- **SEO:** Отличная индексация в Google (SSR/SSG)
- **Мобильное приложение:** Архитектура, позволяющая легко сделать мобильное приложение
- **Личный кабинет:** Полноценный дашборд студента

---

## Технический стек

| Компонент | Технология | Почему |
|-----------|------------|--------|
| Фронтенд | **Next.js 14** (App Router) | SSR/SSG для SEO, автоматическая оптимизация |
| Стили | Tailwind CSS 3 | Быстрая разработка, mobile-first |
| Стейт | Zustand | Лёгкий, совместим с SSR |
| i18n | next-intl | Нативная интеграция с Next.js, SEO-friendly URL (/ru, /kz) |
| Бэкенд | Node.js + Express (отдельный API) | Переиспользуемый API для веба И мобильного приложения |
| БД | PostgreSQL + Prisma ORM | Надёжная БД, типизированные запросы |
| Аутентификация | JWT + bcrypt | Работает и на вебе, и в мобильном приложении |
| Оплата | Stripe + Kaspi QR | Международная + казахстанская оплата |
| Хостинг видео | YouTube (unlisted) / Kinescope | Защита контента |
| Деплой | Docker + VPS (или Vercel + Railway) | Гибкий деплой |

### Почему Next.js вместо React+Vite?
1. **SEO:** Серверный рендеринг (SSR) — Google видит полностью загруженную страницу
2. **Производительность:** Автоматическая оптимизация изображений, шрифтов, бандлов
3. **Роутинг:** Встроенный файловый роутинг с поддержкой i18n
4. **Метаданные:** Встроенная система `metadata` для title, description, Open Graph

### Почему отдельный API-сервер?
Когда вы решите сделать мобильное приложение (React Native), оно будет использовать тот же API.
Нет нужды переписывать бэкенд — только фронтенд (мобильный).

---

## Структура проекта

```
easysauda/
├── client/                       # Next.js фронтенд
│   ├── app/                      # App Router (Next.js 14)
│   │   ├── [locale]/             # Мультиязычный роутинг (/ru, /kz)
│   │   │   ├── layout.jsx        # Корневой layout с Header/Footer
│   │   │   ├── page.jsx          # Главная (лендинг)
│   │   │   ├── courses/
│   │   │   │   ├── page.jsx      # Каталог курсов
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx  # Детали курса
│   │   │   ├── lessons/
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx  # Видеоурок
│   │   │   ├── auth/
│   │   │   │   ├── login/page.jsx
│   │   │   │   └── register/page.jsx
│   │   │   ├── dashboard/        # Личный кабинет студента
│   │   │   │   ├── page.jsx      # Обзор (мои курсы, прогресс)
│   │   │   │   ├── courses/page.jsx    # Мои курсы
│   │   │   │   ├── progress/page.jsx   # Прогресс обучения
│   │   │   │   ├── certificates/page.jsx # Сертификаты
│   │   │   │   └── settings/page.jsx    # Настройки профиля
│   │   │   ├── admin/            # Админ-панель
│   │   │   │   ├── page.jsx      # Дашборд (статистика)
│   │   │   │   ├── courses/page.jsx    # Управление курсами
│   │   │   │   ├── students/page.jsx   # Студенты
│   │   │   │   └── payments/page.jsx   # Оплаты
│   │   │   └── checkout/
│   │   │       └── [courseId]/page.jsx
│   │   └── api/                  # Next.js API Routes (прокси, если нужен)
│   ├── components/
│   │   ├── layout/               # Header, Footer, Sidebar, DashboardLayout
│   │   ├── landing/              # Hero, About, CourseCards, Testimonials
│   │   ├── courses/              # CourseCard, CourseList, VideoPlayer
│   │   ├── dashboard/            # ProgressChart, CourseProgress, Stats
│   │   ├── auth/                 # LoginForm, RegisterForm
│   │   └── ui/                   # Button, Input, Card, Modal, Badge
│   ├── lib/
│   │   ├── api.js                # Axios клиент к Express API
│   │   ├── auth.js               # JWT утилиты
│   │   └── utils.js
│   ├── store/                    # Zustand stores
│   │   ├── authStore.js
│   │   ├── courseStore.js
│   │   └── uiStore.js
│   ├── messages/                 # Переводы (next-intl)
│   │   ├── ru.json
│   │   └── kz.json
│   ├── public/
│   │   ├── images/
│   │   └── fonts/
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                       # Express API (отдельный сервер)
│   ├── prisma/
│   │   ├── schema.prisma         # Схема БД
│   │   └── seed.js               # Начальные данные
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── courses.js
│   │   │   ├── lessons.js
│   │   │   ├── payments.js
│   │   │   ├── dashboard.js      # Эндпоинты личного кабинета
│   │   │   └── admin.js          # Эндпоинты админки
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT верификация
│   │   │   ├── admin.js          # Проверка роли admin
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── courseService.js
│   │   │   ├── paymentService.js
│   │   │   ├── userService.js
│   │   │   └── progressService.js
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml            # PostgreSQL + API + Next.js
├── .gitignore
├── PLAN.md
└── README.md
```

---

## Схема базы данных

```
User
├── id (UUID, PK)
├── email (unique)
├── password_hash
├── name
├── phone (nullable)
├── avatar_url
├── role (STUDENT | ADMIN)
├── language (ru | kz)
├── created_at
└── updated_at

Course
├── id (UUID, PK)
├── slug (unique)              # URL-friendly имя для SEO
├── title_ru / title_kz
├── description_ru / description_kz
├── short_description_ru / short_description_kz
├── price (decimal)
├── original_price (decimal)   # Для отображения скидки
├── level (BEGINNER | INTERMEDIATE | ADVANCED)
├── thumbnail_url
├── total_lessons (int)
├── total_duration_hours (decimal)
├── is_published (boolean)
├── meta_title_ru / meta_title_kz         # SEO
├── meta_description_ru / meta_description_kz  # SEO
├── created_at
└── updated_at

Lesson
├── id (UUID, PK)
├── course_id (FK → Course)
├── title_ru / title_kz
├── description_ru / description_kz
├── video_url
├── order (int)
├── duration_minutes (int)
├── is_free (boolean)          # Бесплатные уроки для привлечения
└── created_at

Enrollment (покупка курса)
├── id (UUID, PK)
├── user_id (FK → User)
├── course_id (FK → Course)
├── payment_status (PENDING | COMPLETED | REFUNDED)
├── payment_method (STRIPE | KASPI)
├── payment_id (external payment ID)
├── amount_paid (decimal)
├── enrolled_at
└── expires_at (nullable)

LessonProgress (прогресс ученика)
├── id (UUID, PK)
├── user_id (FK → User)
├── lesson_id (FK → Lesson)
├── completed (boolean)
├── progress_percent (int)
├── watch_time_seconds (int)
└── last_watched_at

Review (отзывы)
├── id (UUID, PK)
├── user_id (FK → User)
├── course_id (FK → Course)
├── rating (1-5)
├── comment
├── is_approved (boolean)
└── created_at
```

---

## Личный кабинет студента (Dashboard)

### Страницы личного кабинета

1. **Обзор** (`/dashboard`)
   - Приветствие с именем
   - Мои текущие курсы (карточки с прогресс-баром)
   - "Продолжить обучение" — последний незавершённый урок
   - Общая статистика: часы обучения, пройдено уроков, сертификаты

2. **Мои курсы** (`/dashboard/courses`)
   - Список купленных курсов
   - Прогресс по каждому (прогресс-бар, % завершения)
   - Фильтр: в процессе / завершённые / все

3. **Прогресс** (`/dashboard/progress`)
   - Детальная статистика обучения
   - График активности (по дням/неделям)
   - Достижения / бейджи (за прохождение модулей)

4. **Настройки** (`/dashboard/settings`)
   - Редактирование профиля (имя, аватар, email)
   - Смена пароля
   - Выбор языка
   - История платежей

---

## SEO стратегия

### Технический SEO (встроен в архитектуру)
- **SSR/SSG:** Все публичные страницы рендерятся на сервере → Google видит полный контент
- **Metadata API:** Динамические title, description для каждой страницы
- **Structured Data (JSON-LD):** Schema.org разметка для курсов (Course, Review)
- **Sitemap.xml:** Автогенерация через Next.js
- **robots.txt:** Правильная настройка
- **URL-структура:** `/ru/courses/osnovy-trejdinga` (читаемые slug на русском)
- **Canonical URLs:** Предотвращение дублирования контента ru/kz
- **Open Graph + Twitter Cards:** Красивые превью при шаринге

### Контентный SEO
- Каждый курс — отдельная SEO-оптимизированная страница
- Бесплатные уроки индексируются (привлекают органический трафик)
- Мета-описания на обоих языках
- Alt-теги для всех изображений

---

## Стратегия мобильного приложения

### Текущая архитектура готовит к мобильному приложению:
1. **Отдельный API сервер** — мобильное приложение будет использовать те же эндпоинты
2. **JWT аутентификация** — работает и в браузере, и в мобильном приложении
3. **REST API** — универсальный формат для любого клиента
4. **Zustand stores** — логику стейта можно переиспользовать в React Native

### Когда делать мобильное приложение:
- После MVP, когда будет 100+ активных студентов
- Используя **React Native** (Expo) с общим API
- Затраты на мобильное приложение: только UI слой (40% от оригинальной работы)

---

## Этапы разработки (MVP)

### Фаза 1: Фундамент
1. **Инициализация проекта**
   - Настройка Next.js 14 + Tailwind CSS
   - Настройка Express + Prisma + PostgreSQL
   - Docker Compose для локальной разработки
   - Конфигурация next-intl (рус/каз)
   - Базовая структура папок
   - .gitignore, ESLint, Prettier

2. **Дизайн-система**
   - Цветовая палитра (тёмная тема)
   - Базовые UI компоненты: Button, Input, Card, Modal, Badge
   - Адаптивная сетка (mobile-first)
   - Шрифты: Inter (латиница) + системный для кириллицы

### Фаза 2: Лендинг + SEO
3. **Главная страница (SSG)**
   - Hero секция с CTA
   - Секция "О преподавателе"
   - Каталог курсов (карточки)
   - Программа обучения
   - Отзывы студентов
   - FAQ секция
   - Footer с контактами
   - Переключатель языка (RU/KZ)
   - SEO: metadata, JSON-LD, Open Graph
   - sitemap.xml, robots.txt

### Фаза 3: Аутентификация
4. **Регистрация и вход**
   - Форма регистрации (email + пароль)
   - Форма входа
   - JWT токены (access + refresh)
   - Защищённые роуты (middleware в Next.js)
   - Сброс пароля (email)

### Фаза 4: Курсы и уроки
5. **Каталог курсов (SSG)**
   - Страница списка курсов с фильтрами
   - Детальная страница курса (SSR для динамических данных)
   - Бесплатные превью-уроки (SEO-индексируемые)

6. **Видеоплеер и прогресс**
   - Встроенный видеоплеер
   - Отслеживание прогресса
   - Навигация по урокам
   - Отметка "Урок пройден"

### Фаза 5: Личный кабинет
7. **Dashboard студента**
   - Обзор: мои курсы, прогресс, статистика
   - Список купленных курсов с прогресс-барами
   - Настройки профиля
   - История платежей

### Фаза 6: Оплата
8. **Система оплаты**
   - Интеграция Stripe Checkout
   - Заглушка для Kaspi QR
   - Страница успешной оплаты
   - Автоматический доступ после оплаты

### Фаза 7: Админ-панель
9. **Управление контентом**
   - CRUD курсов и уроков
   - Просмотр студентов
   - Статистика: выручка, студенты, популярные курсы

### Фаза 8: Полировка
10. **Финальная доработка**
    - Все тексты на RU и KZ
    - Анимации (Framer Motion)
    - Оптимизация Core Web Vitals
    - Тестирование на мобильных
    - Подготовка к деплою

---

## API Эндпоинты

### Auth
```
POST   /api/auth/register          # Регистрация
POST   /api/auth/login             # Вход
POST   /api/auth/refresh           # Обновление токена
POST   /api/auth/forgot-password   # Сброс пароля
GET    /api/auth/me                # Текущий пользователь
```

### Courses (публичные)
```
GET    /api/courses                 # Список курсов
GET    /api/courses/:slug           # Детали курса (по slug для SEO)
GET    /api/courses/:slug/lessons   # Уроки курса (бесплатные без авторизации)
```

### Lessons (требуют авторизации)
```
GET    /api/lessons/:id             # Детали урока (проверка доступа/оплаты)
POST   /api/lessons/:id/progress    # Обновить прогресс просмотра
```

### Dashboard (личный кабинет)
```
GET    /api/dashboard/overview      # Обзор: курсы, прогресс, статистика
GET    /api/dashboard/courses       # Мои купленные курсы
GET    /api/dashboard/progress      # Детальный прогресс
PUT    /api/dashboard/profile       # Обновить профиль
PUT    /api/dashboard/password      # Сменить пароль
GET    /api/dashboard/payments      # История платежей
```

### Payments
```
POST   /api/payments/create-checkout   # Создать сессию оплаты
POST   /api/payments/webhook           # Stripe webhook
POST   /api/payments/kaspi-confirm     # Kaspi подтверждение
```

### Admin
```
GET    /api/admin/stats                # Общая статистика
GET    /api/admin/courses              # Все курсы (включая неопубликованные)
POST   /api/admin/courses              # Создать курс
PUT    /api/admin/courses/:id          # Обновить курс
DELETE /api/admin/courses/:id          # Удалить курс
POST   /api/admin/courses/:id/lessons  # Добавить урок
PUT    /api/admin/lessons/:id          # Обновить урок
DELETE /api/admin/lessons/:id          # Удалить урок
GET    /api/admin/students             # Список студентов
GET    /api/admin/payments             # Все оплаты
```

### Reviews
```
GET    /api/courses/:slug/reviews      # Отзывы о курсе
POST   /api/reviews                    # Оставить отзыв
```

---

## Дизайн и UX

### Цветовая схема (тёмная тема — как торговый терминал)
- **Фон:** #0D1117
- **Карточки/панели:** #161B22
- **Бордеры:** #30363D
- **Акцент (зелёный):** #00C853 (рост, прибыль, CTA)
- **Предупреждение (красный):** #FF5252
- **Текст основной:** #E6EDF3
- **Текст вторичный:** #8B949E
- **Ссылки:** #58A6FF

### Ключевые UX принципы
- Mobile-first (70%+ трафика с телефонов)
- Быстрая загрузка (Core Web Vitals — зелёная зона)
- Минимум кликов до покупки
- Прозрачные цены
- Прогресс-бар на каждом курсе (мотивация)
- "Продолжить обучение" — всегда на виду

---

## Будущие фичи (после MVP)
- Виртуальный симулятор торговли с реальными данными
- Блог с аналитикой рынка (SEO-трафик)
- Telegram-бот для уведомлений
- Вебинары в реальном времени
- Реферальная программа
- **Мобильное приложение (React Native + Expo)**
- Сертификаты об окончании курса
- Gamification (бейджи, streak)
