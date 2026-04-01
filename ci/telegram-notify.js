const fetch = require('node-fetch');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Получаем данные из переменных окружения
const project = process.env.PROJECT_NAME || 'Илья';
const total = process.env.TOTAL_TESTS || '?';
const passed = process.env.PASSED_TESTS || '?';
const failed = process.env.FAILED_TESTS || '?';
const duration = process.env.DURATION ? (process.env.DURATION / 1000).toFixed(2) : '?';

const githubUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID 
  ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
  : 'https://github.com';

async function sendTelegram(message) {
  if (!token || !chatId) {
    console.error('TELEGRAM_TOKEN или TELEGRAM_CHAT_ID не заданы');
    process.exit(1);
  }
  
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: chatId, 
        text: message, 
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const data = await response.json();
    if (!data.ok) {
      console.error('Ошибка Telegram API:', data);
    } else {
      console.log('✅ Уведомление отправлено в Telegram');
    }
  } catch (err) {
    console.error('❌ Ошибка при отправке Telegram:', err);
  }
}

// Формируем сообщение с результатами
const statusIcon = parseInt(failed) > 0 ? '❌' : '✅';
const statusText = parseInt(failed) > 0 ? 'Есть ошибки' : 'Успешно';

const message = `
${statusIcon} <b>Playwright тесты завершены</b>

📌 <b>Проект:</b> ${project}
📊 <b>Статус:</b> ${statusText}

<b>Результаты:</b>
   🧪 Всего: ${total}
   ✅ Успешно: ${passed}
   ❌ Упало: ${failed}
   ⏱️ Время: ${duration} сек

🔗 <a href="${githubUrl}">Смотреть детали в GitHub Actions</a>
`;

sendTelegram(message);
