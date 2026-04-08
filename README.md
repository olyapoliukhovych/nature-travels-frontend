# Nature Travels Frontend

Frontend частина застосунку **Nature Travels**, побудована на **Next.js 16** з **App Router**, **TypeScript** та **React 19**. Проєкт реалізує публічні сторінки каталогу історій, сторінки авторизації, особистий кабінет користувача, створення нових історій та роботу зі збереженими матеріалами.

Демо: `nature-travels-frontend.vercel.app`

## Основний стек

- **Next.js 16.2.1**
- **React 19.2.4**
- **TypeScript 5**
- **@tanstack/react-query** для роботи з API та кешування запитів
- **Axios** для HTTP-запитів
- **Formik + Yup** для форм і валідації
- **Zustand** для локального стану
- **Swiper** для слайдерів
- **react-hot-toast** для повідомлень
- **react-select** для кастомних select-компонентів

## Структура проєкту

```bash
app/
  (main)/
    page.tsx              # головна сторінка
    stories/
      page.tsx            # список історій
      [id]/               # сторінка окремої історії
      new/                # створення нової історії
    travellers/           # сторінка travellers
  auth/
    login/                # сторінка входу
    register/             # сторінка реєстрації
  profile/
    page.tsx              # профіль
    my-stories/           # мої історії
    saved/                # збережені історії
  api/                    # клієнтські route handlers / proxy logic
  layout.tsx
  not-found.tsx

components/
  AddStoryForm/
  AppLink/
  AppSelect/
  AuthBar/
  Button/
  CategoriesFilter/
  Header/
  Hero/
  MessageNoStories/
  Modal/
  Pagination/
  PopularStories/
  ProfileStories/
  ProfileTabs/
  ...

lib/
  api/                    # клієнтська робота з бекендом
  store/                  # Zustand store

types/
  auth.ts
  category.ts
  stories.ts
  user.ts
```

## Основний функціонал

- перегляд списку історій;
- перегляд окремої історії;
- фільтрація історій за категоріями;
- створення нової історії;
- реєстрація та вхід користувача;
- особистий кабінет;
- перегляд власних історій;
- перегляд збережених історій;
- базовий захист приватних маршрутів.

## Захищені маршрути

У проєкті реалізовано проксі-рівень для контролю доступу та оновлення сесії.

Приватні маршрути:

- `/profile`
- `/stories/new`

Публічні auth-маршрути:

- `/auth/login`
- `/auth/register`

Якщо `accessToken` відсутній, але є `refreshToken` і `sessionId`, застосунок намагається оновити сесію через бекенд. Якщо користувач неавторизований і відкриває приватний маршрут, виконується редірект на `/auth/login`.

## Змінні середовища

Створи файл `.env` на основі `.env.example`:

```env
NEXT_PUBLIC_API_URL=
BACKEND_API_URL=
```

Рекомендовано заповнювати обидві змінні явно, щоб уникнути плутанини між клієнтськими та серверними викликами.

## Встановлення та запуск

### 1. Клонування репозиторію

```bash
git clone https://github.com/olyapoliukhovych/nature-travels-frontend.git
cd nature-travels-frontend
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування змінних середовища

Створи `.env`:

```Emample .env
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_API_URL=http://localhost:3001
```

Підстав реальні адреси твого backend API.

### 4. Запуск dev-сервера

```bash
npm run dev
```

Після запуску застосунок буде доступний за адресою:

```bash
http://localhost:3000
```

## Доступні команди

```bash
npm run dev      # запуск у режимі розробки
npm run build    # production build
npm run start    # запуск production build
npm run lint     # перевірка ESLint
```

## Робота з API

Frontend використовує клієнтські API-обгортки з папки `lib/api`. Для асинхронних запитів і кешу використовується **React Query**, тому ключі запитів (`queryKey`) треба тримати послідовними, особливо для:

- історій за категоріями;
- рекомендованих історій;
- профільних списків;
- збережених історій.

## Робота із зображеннями

У `next.config.ts` дозволені віддалені джерела зображень:

- `https://ftp.goit.study/img/**`
- `https://res.cloudinary.com/**`
- `https://ac.goit.global`

Також увімкнено формати оптимізації:

- `image/avif`
- `image/webp`

## UI та компоненти

У проєкті вже є базові перевикористовувані компоненти, які варто повторно застосовувати замість дублювання розмітки:

- `AppLink`
- `Button`
- `AppSelect`
- `Pagination`
- `PopularStories`
- `MessageNoStories`
- `Modal`

Практично це означає одне: нові сторінки краще добудовувати через композицію наявних компонентів, а не плодити майже однакові блоки.

## Рекомендації для розробки

- не змішувати доменні типи API і пропси конкретних компонентів в одному файлі без потреби;
- для навігації використовувати `AppLink` / `Link`, а не `button`;
- для дій (`save`, `delete`, `submit`) використовувати `Button`;
- для повторного використання секцій зі story cards краще керувати контентом через props;
- для сторінок профілю та історій уважно слідкувати за `queryKey` у React Query;
- якщо змінюється логіка авторизації, перевіряти також `proxy.ts`, а не лише UI-форму.

## Можливі точки покращення

- додати повноцінний розділ тестування;
- винести константи маршрутів в окремий модуль;
- додати README для API-шару або документацію ендпоінтів;
- формалізувати UI-kit для перевикористовуваних компонентів.

## Deployment

Проєкт придатний для деплою на **Vercel**. Перед деплоєм потрібно:

1. коректно задати environment variables;
2. перевірити доступність backend API;
3. переконатися, що cookie/session flow працює в потрібному середовищі;
4. перевірити redirect-логіку для auth та private routes.

## Репозиторій

GitHub: `https://github.com/olyapoliukhovych/nature-travels-frontend`
