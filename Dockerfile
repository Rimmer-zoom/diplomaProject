FROM mcr.microsoft.com/playwright:focal
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Разрешаем Playwright загрузить браузеры
RUN npx playwright install --with-deps

# Точка входа
CMD ["npx", "playwright", "test"]