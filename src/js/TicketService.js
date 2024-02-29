// Импорт функции createRequest из файла createRequest.js
import createRequest from "./createRequest";

// Константа, содержащая адрес сервера
const HOST = "http://localhost:3000/";

// Экспорт класса TicketService для использования в других модулях
export default class TicketService {
  // Метод для получения списка всех заявок
  static getAllTickets(callback) {
    // Выполнение запроса на сервер для получения списка всех заявок
    createRequest({
      requestMethod: "GET",
      urlMethod: "allTickets",
      host: HOST,
      callback,
    });
  }

  // Метод для получения описания конкретной заявки по её идентификатору
  static getDescription(id, callback) {
    // Выполнение запроса на сервер для получения описания заявки по её идентификатору
    createRequest({
      requestMethod: "GET",
      urlMethod: "ticketById",
      host: HOST,
      callback,
      id,
    });
  }

  // Метод для обновления данных заявки
  static updateTicket(ticket, callback) {
    // Выполнение запроса на сервер для обновления данных заявки
    createRequest({
      requestMethod: "POST",
      urlMethod: "updateById",
      host: HOST,
      callback: callback,
      id: ticket.id,
      body: ticket,
    });
  }

  // Метод для создания новой заявки
  static createTicket(ticket, callback) {
    // Выполнение запроса на сервер для создания новой заявки
    createRequest({
      requestMethod: "POST",
      urlMethod: "createTicket",
      host: HOST,
      callback,
      body: ticket,
    });
  }

  // Метод для удаления заявки по её идентификатору
  static removeTicket(ticketId, callback) {
    // Выполнение запроса на сервер для удаления заявки по её идентификатору
    createRequest({
      requestMethod: "GET",
      urlMethod: "deleteById",
      host: HOST,
      callback,
      id: ticketId,
    });
  }
}