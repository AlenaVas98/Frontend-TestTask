import { encoded, translations } from "./data.js";

export function decodeFields(encoded, translations) {
  // Создаем копию исходного списка объектов
  const decoded = JSON.parse(JSON.stringify(encoded));

  // Проходимся по каждому объекту
  decoded.forEach((obj) => {
    // Проходимся по каждому ключу в объекте
    for (const key in obj) {
      // Если ключ заканчивается на "Id" и не является одним из исключенных полей
      if (
        key.endsWith("Id") &&
        !["groupId", "service", "formatSize", "ca"].includes(key)
      ) {
        const value = obj[key];
        // Если значение ключа есть в словаре translations, заменяем его
        if (translations[value]) {
          obj[key] = translations[value];
        }
      }
    }
  });

  // Получаем список уникальных id
  const uniqueIds = [...new Set(decoded.map((obj) => obj.groupId))];

  return { decoded, uniqueIds };
}

// Пример использования функции
const { decoded, uniqueIds } = decodeFields(encoded, translations);
console.log("Расшифрованные данные:");
console.log(decoded);
console.log("Уникальные id:");
console.log(uniqueIds);
