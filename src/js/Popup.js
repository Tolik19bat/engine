// Экспорт класса Popup для использования в других модулях
export default class Popup {
  // Конструктор класса Popup
  constructor() {
    // Получение ссылки на форму с именем "dataEntry" из DOM и сохранение ссылки на неё
    this.formEl = document.forms.dataEntry;
    // Получение ссылки на поле ввода имени из формы и сохранение ссылки на неё
    this.inputNameEl = this.formEl.elements.name;
    // Получение ссылки на поле ввода описания из формы и сохранение ссылки на неё
    this.inputDescriptionEl = this.formEl.elements.description;
    // Получение ссылки на кнопку "Отмена" из формы и сохранение ссылки на неё
    this.btnCancelEl = this.formEl.querySelector(".data-entry-btn-cancel");
    // Привязка контекста выполнения к методу onClickCancel
    this.onClickCancel = this.onClickCancel.bind(this);
    // Добавление слушателя события "click" на кнопку "Отмена" для вызова метода onClickCancel
    this.btnCancelEl.addEventListener("click", this.onClickCancel);
    // Привязка контекста выполнения к методу onSubmit
    this.onSubmit = this.onSubmit.bind(this);
    // Добавление слушателя события "submit" на форму для вызова метода onSubmit
    this.formEl.addEventListener("submit", this.onSubmit);
  }

  // Метод для обработки события отправки формы
  onSubmit(e) {
    e.preventDefault(); // Предотвращение стандартного поведения формы
    // Создание объекта заявки на основе данных из формы
    if (!this.ticket) {
      this.ticket = {};
      this.ticket.id = null;
      this.ticket.status = false;
    }
    this.ticket.name = this.inputNameEl.value;
    this.ticket.description = this.inputDescriptionEl.value;
    this.ticket.created = Date.now();
    // Вызов обработчика onSubmitHandler с данными заявки в качестве аргумента
    this.onSubmitHandler(this.ticket);
    // Скрытие всплывающего окна после отправки формы
    this.hide();
  }

  // Метод для обработки события клика на кнопке "Отмена"
  onClickCancel(e) {
    e.preventDefault(); // Предотвращение стандартного поведения кнопки
    // Скрытие всплывающего окна при нажатии на кнопку "Отмена"
    this.hide();
  }

  // Метод для отображения всплывающего окна с возможностью редактирования заявки
  show(ticket = null) {
    // Инициализация объекта заявки
    this.ticket = {};
    // Если передана заявка для редактирования, заполнение данных формы заявкой
    if (ticket) {
      this.ticket.id = ticket.id;
      this.ticket.name = ticket.name;
      this.ticket.status = ticket.status;
      this.ticket.description = ticket.description;
      this.ticket.created = ticket.created;
      // Изменение заголовка всплывающего окна на "Изменить тикет"
      document.querySelector(".data-entry-title").textContent =
        "Изменить тикет";
    } else {
      // Если заявка не передана, обнуление данных формы
      this.ticket = ticket;
      // Изменение заголовка всплывающего окна на "Добавить тикет"
      document.querySelector(".data-entry-title").textContent =
        "Добавить тикет";
    }
    // Заполнение полей формы данными заявки или пустыми значениями
    this.inputNameEl.value = ticket ? ticket.name : "";
    this.inputDescriptionEl.value = ticket ? ticket.description : "";
    // Удаление класса "hidden" для отображения всплывающего окна
    this.formEl.classList.remove("hidden");
  }

  // Метод для скрытия всплывающего окна
  hide() {
    // Обнуление объекта заявки и очистка полей формы
    this.ticket = null;
    this.inputNameEl.value = "";
    this.inputDescriptionEl.value = "";
    // Добавление класса "hidden" для скрытия всплывающего окна
    this.formEl.classList.add("hidden");
  }
}