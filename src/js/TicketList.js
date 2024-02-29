// Импорт модуля TicketService из файла TicketService.js
import TicketService from "./TicketService";

// Экспорт класса TicketList для использования в других модулях
export default class TicketList {
  // Конструктор класса TicketList
  constructor(listEl, popup, confirm) {
    // Инициализация свойств объекта
    this.listEl = listEl;
    this.popup = popup;
    this.confirm = confirm;
    // Привязка контекста выполнения к методу removeTicket
    this.removeTicket = this.removeTicket.bind(this);
    // Получение ссылки на контейнер списка заявок и настройка кнопки "Добавить"
    this.containerEl = this.listEl.querySelector(".list-items");
    this.btnAddEl = this.listEl.querySelector(".list-btn-add");
    // Привязка контекста выполнения к методу onClickAdd
    this.onClickAdd = this.onClickAdd.bind(this);
    // Добавление слушателя события "click" на кнопку "Добавить"
    this.btnAddEl.addEventListener("click", this.onClickAdd);
    // Привязка контекста выполнения к методу updateTicket
    this.updateTicket = this.updateTicket.bind(this);
    // Настройка обработчика события отправки формы всплывающего окна
    this.popup.onSubmitHandler = this.updateTicket;
    // Привязка контекста выполнения к методу editTicket
    this.editTicket = this.editTicket.bind(this);
  }

  // Метод-обработчик события клика на кнопку "Добавить"
  onClickAdd(e) {
    e.preventDefault(); // Предотвращение стандартного поведения кнопки
    // Отображение всплывающего окна для добавления новой заявки
    this.popup.show();
  }

  // Метод для инициализации списка заявок
  init() {
    // Запрос списка всех заявок у TicketService
    TicketService.getAllTickets((tickets) => {
      // Сохранение полученного списка заявок в свойство объекта
      this.tickets = tickets;
      // Инициализация каждой заявки и их отображение
      this.tickets.forEach((ticket) => this.initTicket(ticket));
      // Отображение списка заявок
      this.renderTickets();
    });
  }

  // Метод для инициализации отдельной заявки
  initTicket(ticket) {
    // Привязка обработчиков событий для управления заявкой
    ticket.removeHandler = this.removeTicket;
    ticket.editHandler = this.editTicket;
    ticket.changeStatusHandler = this.updateTicket;
  }

  // Метод для отображения отдельной заявки в списке
  renderTicket(ticket) {
    this.containerEl.appendChild(ticket.element);
  }

  // Метод для отображения всех заявок в списке
  renderTickets() {
    this.clear(); // Очистка контейнера перед отображением заявок
    // Добавление каждой заявки в контейнер
    this.tickets.forEach((ticket) => {
      this.renderTicket(ticket);
    });
  }

  // Метод для очистки контейнера списка заявок
  clear() {
    [...this.containerEl.children].forEach((el) => el.remove());
  }

  // Метод для удаления заявки
  removeTicket(ticket) {
    // Отображение подтверждающего окна перед удалением заявки
    this.confirm.show(() => {
      // Удаление заявки при подтверждении пользователя
      TicketService.removeTicket(ticket.id, (res) => {
        // Обновление списка заявок после удаления
        if (res) {
          this.init();
        }
      });
    });
  }

  // Метод для редактирования заявки
  editTicket(ticket) {
    // Отображение всплывающего окна для редактирования выбранной заявки
    this.popup.show(ticket);
  }

  // Метод для обновления статуса заявки
  updateTicket(ticket) {
    if (ticket.id) {
      // Обновление заявки при наличии идентификатора
      TicketService.updateTicket(ticket, (tickets) => {
        // Обновление списка заявок после изменения статуса
        this.tickets = tickets;
        this.tickets.forEach((ticket) => this.initTicket(ticket));
        this.renderTickets();
      });
    } else {
      // Создание новой заявки при отсутствии идентификатора
      TicketService.createTicket(ticket, (newTicket) => {
        // Обновление списка заявок после создания новой заявки
        if (newTicket) {
          this.init();
        }
      });
    }
  }
}