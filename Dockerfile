# Этап сборки: установка зависимостей, сборка приложения, очистка ненужных файлов
FROM node:lts-alpine as builder
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (dev + production)
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Удаляем devDependencies
RUN npm prune --production

# Очистка node_modules от ненужных файлов (modclean можно добавить как зависимость)
# Добавляем modclean временно для очистки
RUN npx modclean --path ./node_modules --run

# Удаляем кеш сборки Next.js
RUN rm -rf .next/cache

# Этап выполнения: минимальный образ для запуска
FROM node:lts-alpine as runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL='https://kz-history.kz/api'

# Копируем только необходимые артефакты сборки и production-зависимости
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public


EXPOSE 3000
CMD ["npm", "start"]
