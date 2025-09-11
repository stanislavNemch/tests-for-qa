# QA Pro Test Platform GoIT

Цей проєкт є інтерактивною платформою для тестування знань QA інженерів. Користувачі можуть реєструватися, проходити тести з технічних навичок та теорії тестування, а також переглядати свої результати у зручному форматі.

This project is an interactive platform for testing the knowledge of QA engineers. Users can register, take tests on technical skills and testing theory, and view their results in a convenient format.

---

## 🇺🇦 Українська версія

### 🎯 Призначення проєкту

Цей застосунок створено як навчальний проєкт для демонстрації навичок розробки сучасних веб-інтерфейсів. Він дозволяє користувачам оцінити свій рівень знань у сфері QA та визначити теми, які потребують додаткового вивчення.

### 🚀 Основний функціонал

-   **Автентифікація:** Реєстрація та вхід користувача за допомогою email та пароля.
-   **Вибір тесту:** Можливість обрати один з двох типів тестування: "Технічна підготовка QA" або "Теорія тестування".
-   **Проходження тесту:** Інтерактивний інтерфейс для відповідей на запитання з можливістю навігації між ними.
-   **Збереження прогресу:** Автоматичне збереження сесії тестування у `localStorage`. Якщо користувач випадково закриє вкладку, він зможе продовжити з того ж місця.
-   **Сторінка результатів:** Візуалізація результатів тесту у вигляді діаграми та текстового звіту.
-   **Адаптивний дизайн:** Коректне відображення на десктопних, планшетних та мобільних пристроях.

### 🛠️ Технологічний стек

-   **React:** Основна бібліотека для побудови користувацького інтерфейсу.
-   **TypeScript:** Для типізації коду, що підвищує його надійність та полегшує розробку.
-   **Vite:** Сучасний та швидкий збирач проєктів.
-   **React Router:** Для реалізації навігації між сторінками.
-   **Axios:** Для виконання HTTP-запитів до backend-сервісу.
-   **React Hot Toast:** Для відображення сповіщень (повідомлення про успіх, помилки).
-   **CSS Modules:** Для інкапсуляції стилів та уникнення конфліктів імен класів.

### 🏗️ Структура Проєкту та Компонентів

Ось графічне представлення структури ключових компонентів у папці `src/` та їх призначення.

```
src/
├── assets/              # SVG іконки та інші статичні ресурси
│
├── components/          # Основна папка з React-компонентами
│   │
│   ├── App/             # Головний компонент застосунку, містить маршрутизацію (роутинг)
│   │
│   ├── AuthPage/        # Сторінка авторизації/реєстрації
│   │   └── AuthForm/    # Форма для вводу email та пароля
│   │
│   ├── Header/          # "Шапка" сайту з навігацією
│   │   └── Navigation/  # Компонент, що відповідає за логіку навігаційних посилань
│   │
│   ├── HomePage/        # Домашня сторінка з вибором тестів
│   │
│   ├── TestPage/        # Сторінка проходження тесту
│   │   └── QuestionCard/# Картка, що відображає одне питання та варіанти відповідей
│   │
│   ├── ResultsPage/     # Сторінка з результатами тесту
│   │   └── Diagram/     # Компонент для відображення кругової діаграми результатів
│   │
│   ├── ContactsPage/    # Сторінка з інформацією про команду розробників
│   │   └── ContactCard/ # Картка одного розробника
│   │
│   ├── UsefulInfoPage/  # Сторінка з корисною літературою та посиланнями
│   │
│   ├── Footer/          # "Підвал" сайту
│   │
│   ├── Loader/          # Компонент спінера завантаження
│   │
│   ├── PrivateRoute/    # Компонент-обгортка для захисту приватних маршрутів
│   │
│   ├── context/
│   │   └── AuthContext.tsx # Глобальний контекст для керування станом автентифікації
│   │
│   ├── services/
│   │   └── authService.ts  # Функції для взаємодії з API (реєстрація, логін, запит питань)
│   │
│   └── types/
│       └── auth.ts         # TypeScript-типи та інтерфейси для даних
│
├── main.tsx             # Головний файл, точка входу в React-застосунок
│
└── index.css            # Глобальні стилі
```

### ⚙️ Встановлення та запуск

1.  **Клонуйте репозиторій:**

    ```bash
    git clone https://github.com/your-username/tests-for-qa.git
    cd tests-for-qa
    ```

2.  **Встановіть залежності:**

    ```bash
    npm install
    ```

3.  **Запустіть проєкт у режимі розробки:**

    ```bash
    npm run dev
    ```

    Після цього проєкт буде доступний за адресою `http://localhost:5173`.

---

## 🇬🇧 English Version

### 🎯 Project Purpose

This application was created as a learning project to demonstrate skills in developing modern web interfaces. It allows users to assess their level of knowledge in the QA field and identify topics that require further study.

### 🚀 Core Features

-   **Authentication:** User registration and login using email and password.
-   **Test Selection:** Ability to choose one of two test types: "QA Technical Training" or "Testing Theory".
-   **Test-Taking Process:** An interactive interface for answering questions with the ability to navigate between them.
-   **Progress Persistence:** The testing session is automatically saved to `localStorage`. If a user accidentally closes the browser tab, they can resume from where they left off.
-   **Results Page:** Visualization of test results in the form of a diagram and a text summary.
-   **Responsive Design:** The application displays correctly on desktop, tablet, and mobile devices.

### 🛠️ Technology Stack

-   **React:** The primary library for building the user interface.
-   **TypeScript:** For code typing, which enhances reliability and simplifies development.
-   **Vite:** A modern and fast project bundler.
-   **React Router:** For implementing client-side routing and navigation.
-   **Axios:** For making HTTP requests to the backend service.
-   **React Hot Toast:** For displaying user notifications (success messages, errors).
-   **CSS Modules:** For encapsulating styles and avoiding class name conflicts.

### 🏗️ Project and Component Structure

Here is a visual representation of the key component structure within the `src/` folder and their responsibilities.

```
src/
├── assets/              # SVG icons and other static assets
│
├── components/          # Main directory for React components
│   │
│   ├── App/             # Main application component, contains all routing logic
│   │
│   ├── AuthPage/        # Authorization/Registration page
│   │   └── AuthForm/    # The form for email and password input
│   │
│   ├── Header/          # Site header with navigation
│   │   └── Navigation/  # Component responsible for the navigation links logic
│   │
│   ├── HomePage/        # Home page with test selection options
│   │
│   ├── TestPage/        # The page where the user takes the test
│   │   └── QuestionCard/# Card that displays a single question and its answers
│   │
│   ├── ResultsPage/     # Page displaying the test results
│   │   └── Diagram/     # Component for rendering the results pie chart
│   │
│   ├── ContactsPage/    # "Our Team" page with developer information
│   │   └── ContactCard/ # Card for a single developer
│   │
│   ├── UsefulInfoPage/  # Page with useful literature and resources
│   │
│   ├── Footer/          # Site footer
│   │
│   ├── Loader/          # Loading spinner component
│   │
│   ├── PrivateRoute/    # Wrapper component to protect private routes
│   │
│   ├── context/
│   │   └── AuthContext.tsx # Global context for managing authentication state
│   │
│   ├── services/
│   │   └── authService.ts  # Functions for interacting with the API (register, login, fetching questions)
│   │
│   └── types/
│       └── auth.ts         # TypeScript types and interfaces for data structures
│
├── main.tsx             # The main entry point of the React application
│
└── index.css            # Global styles
```

### ⚙️ Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/tests-for-qa.git
    cd tests-for-qa
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the project in development mode:**

    ```bash
    npm run dev
    ```

    The project will be available at `http://localhost:5173`.
