# Diploma Project: Playwright Tests with Allure Reporting

Этот проект содержит автоматизированные тесты для UI и API, написанные на **Playwright** с интеграцией **Allure TestOps**. Также проект можно запускать в **Docker** и получать уведомления о результатах в **Telegram**.

---

## 📂 Структура проекта

- `tests/` — директория с тестами  
  - `ui/` — UI тесты  
  - `api/` — API тесты   
- `src/` — исходники, используемые тестами  
- `ci/` — скрипты для интеграции с Allure, Telegram уведомления  
- `allure-results/` — результаты тестов (не коммитятся в репозиторий)  
- `playwright.config.js` — конфигурация Playwright и Allure  
- `package.json` — зависимости и npm скрипты  
- `Dockerfile` — Docker образ для запуска тестов

---

## ⚡ Установка

1. Клонируем репозиторий:

```bash
git clone https://github.com/Rimmer-zoom/diplomaProject.git
cd diplomaProject
Устанавливаем зависимости:

bash
npm install
Убедитесь, что Playwright установил браузеры:

bash
npx playwright install
🧪 Запуск тестов
Локально (Node.js)
Запуск всех тестов:

bash
npm test
Просмотр HTML отчета:

bash
npm run report
В Docker
Собрать образ:

bash
docker build -t diploma-tests .
Запустить контейнер:

bash
docker run --rm diploma-tests
🌐 Allure TestOps
Для загрузки результатов в Allure TestOps используется allurectl. Пример запуска локально:

bash
allurectl login --token <YOUR_TOKEN>
allurectl watch -- npx playwright test
--token — ваш персональный токен из Allure TestOps

watch — автоматически собирает результаты тестов и отправляет в Allure

📊 Allure Report
Ниже представлен скриншот отчета Allure с результатами выполнения тестов:

![Allure Report](https://github.com/Rimmer-zoom/diplomaProject/blob/main/docs/screenshots/allure-report.png?raw=true)
📱 Telegram уведомления
Проект настроен на отправку уведомлений о результатах тестирования в Telegram. Уведомление содержит:

Статус выполнения

Общее количество тестов

Количество успешных и упавших тестов

Время выполнения

Ссылку на детали в CI/CD

📸 Telegram уведомление
Пример уведомления, полученного после завершения тестового прогона:

![Telegram Notification](https://github.com/Rimmer-zoom/diplomaProject/blob/main/docs/screenshots/telegram-notification.png?raw=true)
🛠 Конфигурация
Playwright: playwright.config.js
Параллельное выполнение тестов (fullyParallel: true)

Повторные попытки при CI (retries: 2)

Видео и скриншоты при падении

Проекты: ui-chromium и api

Allure
Результаты сохраняются в allure-results/, затем отправляются в TestOps.

🔧 CI/CD
Пример интеграции с Jenkins или другим CI:

Установить allurectl на агент CI

Настроить pipeline с шагами:

bash
npm install
allurectl watch -- npx playwright test
Использовать переменную окружения с токеном Allure TestOps

📌 Примечания
Не коммитить allure-results/ — эти файлы генерируются при каждом запуске

Для добавления новых тестов помещайте их в tests/ui или tests/api

Можно расширять проекты для Firefox/Webkit при необходимости
