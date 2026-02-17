import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Папка с результатами последнего прогона
const resultsDir = path.resolve('allure-results');

// Переменные окружения
const projectId = process.env.ALLURE_PROJECT_ID;
const apiKey = process.env.ALLURE_API_KEY;
const endpoint = process.env.ALLURE_ENDPOINT;

if (!projectId || !apiKey || !endpoint) {
  console.error('❌ Не установлены ALLURE_PROJECT_ID, ALLURE_API_KEY или ALLURE_ENDPOINT');
  process.exit(1);
}

// Проверка, что папка allure-results существует
if (!fs.existsSync(resultsDir)) {
  console.error(`❌ Папка ${resultsDir} не найдена. Сначала запустите тесты.`);
  process.exit(1);
}

try {
  console.log('🔹 Генерация локального Allure отчета...');
  const reportDir = path.resolve('allure-report');
  execSync(`allure generate ${resultsDir} --clean -o ${reportDir}`, { stdio: 'inherit' });

  console.log('🔹 Загрузка результатов в Allure TestOps...');
  
  // Пример загрузки через REST API Allure TestOps
  // Документация: https://docs.qameta.io/testops/allure/testops-api/
  execSync(
    `curl -X POST "${endpoint}/api/rs/test-runs/import/allure?projectId=${projectId}" ` +
    `-H "Authorization: Api-Token ${apiKey}" ` +
    `-F "file=@${path.join(reportDir, 'widgets', 'widgets.json')}"`,
    { stdio: 'inherit' }
  );

  console.log('✅ Результаты успешно загружены в Allure TestOps!');
} catch (err) {
  console.error('❌ Ошибка при генерации/загрузке отчета:', err);
  process.exit(1);
}