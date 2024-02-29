// Импорт класса Ticket из файла Ticket.js
import Ticket from "./Ticket";

// Функция createRequest для отправки запросов
const createRequest = (options = {}) => {
  // Проверка наличия всех необходимых параметров в объекте options
  if (
    !options.requestMethod ||
    !options.urlMethod ||
    !options.host ||
    !options.callback
  ) {
    return; // В случае отсутствия необходимых параметров выход из функции
  }
  // Формирование URL для запроса
  const url = `${options.host}?method=${options.urlMethod}${
    options.id ? "&id=" + options.id : ""
  }`;
  // Создание нового экземпляра XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Установка обработчика события "load" для запроса
  xhr.addEventListener("load", () => {
    // Проверка успешности выполнения запроса
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        // Попытка разбора ответа сервера в формате JSON
        const data = xhr.response ? JSON.parse(xhr.response) : "";
        // Обработка ответа в зависимости от типа запроса
        switch (options.urlMethod) {
          case "allTickets":
          case "updateById":
            options.callback(createArrayTickets(data)); // Вызов callback с массивом объектов Ticket
            break;
          case "ticketById":
            options.callback(data.description); // Вызов callback с описанием заявки
            break;
          case "createTicket":
            options.callback(data); // Вызов callback с данными новой заявки
            break;
          case "deleteById":
            if (xhr.status === 204) {
              options.callback(true); // Вызов callback с true в случае успешного удаления заявки
            } else {
              options.callback(false); // Вызов callback с false в случае неудачного удаления заявки
            }
        }
      } catch (e) {
        console.error(e); // Вывод ошибки в консоль в случае возникновения ошибки при разборе ответа сервера
      }
    }
  });

  // Настройка запроса
  xhr.open(options.requestMethod, url);
  // Установка заголовка Content-Type и отправка данных запроса
  xhr.send(options.body ? JSON.stringify(options.body) : "");
};

// Функция для преобразования массива данных о заявках в массив объектов Ticket
const createArrayTickets = (data) => {
  return data.map((el) => {
    return new Ticket(el); // Создание объекта Ticket для каждого элемента массива данных
  });
};

// Экспорт функции createRequest для использования в других модулях
export default createRequest;