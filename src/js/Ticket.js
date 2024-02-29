// Импорт модуля TicketService из файла TicketService.js
import TicketService from "./TicketService";

// Экспорт класса Ticket для использования в других модулях
export default class Ticket {
  // Конструктор класса Ticket
  constructor(obj) {
    // Инициализация свойств объекта на основе переданного объекта с данными
    this.id = obj.id;
    this._name = obj.name;
    this.status = obj.status;
    this._description = obj.description;
    this._created = obj.created;
    // Создание DOM-элемента для представления заявки и настройка его стилей и содержимого
    this.element = document.createElement("div");
    this.element.classList.add("list-item");
    this.element.innerHTML = `
    <div class="status-container">
      <label class="list-item-status-label">
        <input type="checkbox" class="list-item-status">
      </label>
    </div>
    <div class="list-item-name-wrapper">
      <div class="list-item-name"></div>
    </div>
    <div class="list-item-created"></div>
    <button type="button" class="list-item-btn list-item-btn-edit"></button>
    <button type="button" class="list-item-btn list-item-btn-remove"></button>`;
    // Получение ссылок на важные элементы DOM-структуры заявки
    this.statusEl = this.element.querySelector(".list-item-status");
    this.statusEl.checked = this.status;
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.statusEl.addEventListener("change", this.onChangeStatus);
    this.nameWrapperEl = this.element.querySelector(".list-item-name-wrapper");
    this.nameEl = this.element.querySelector(".list-item-name");
    this.nameEl.textContent = this.name;
    this.onClickName = this.onClickName.bind(this);
    this.nameWrapperEl.addEventListener("click", this.onClickName);
    this.createdEl = this.element.querySelector(".list-item-created");
    this.createdEl.textContent = new Date(this.created)
      .toLocaleString()
      .slice(0, -3);
    this.btnEditEl = this.element.querySelector(".list-item-btn-edit");
    this.btnRemoveEl = this.element.querySelector(".list-item-btn-remove");
    this.onClickButtonEdit = this.onClickButtonEdit.bind(this);
    this.btnEditEl.addEventListener("click", this.onClickButtonEdit);
    this.onClickButtonRemove = this.onClickButtonRemove.bind(this);
    this.btnRemoveEl.addEventListener("click", this.onClickButtonRemove);
    this.descriptionDisplayed = false;
  }

  // Метод-обработчик события клика на кнопке "Редактировать"
  onClickButtonEdit(e) {
    e.preventDefault(); // Предотвращение стандартного поведения кнопки
    // Вызов обработчика редактирования заявки с текущим объектом Ticket в качестве аргумента
    this.editHandler(this);
  }

  // Метод-обработчик события клика на кнопке "Удалить"
  onClickButtonRemove(e) {
    e.preventDefault(); // Предотвращение стандартного поведения кнопки
    // Вызов обработчика удаления заявки с текущим объектом Ticket в качестве аргумента
    this.removeHandler(this);
  }

  // Метод-обработчик изменения статуса заявки
  onChangeStatus(e) {
    e.preventDefault(); // Предотвращение стандартного поведения элемента управления
    // Изменение статуса заявки на противоположный
    if (this.status) {
      this.status = false;
      this.statusEl.checked = false;
    } else {
      this.status = true;
      this.statusEl.checked = true;
    }
    // Вызов обработчика изменения статуса заявки с данными заявки в качестве аргумента
    this.changeStatusHandler({
      id: this.id,
      name: this.name,
      status: this.status,
      description: this.description,
      created: this.created,
    });
  }

  // Метод-обработчик клика на имя заявки
  onClickName() {
    // Проверка, что заявка имеет идентификатор
    if (!this.id) {
      return; // Возврат из метода, если заявка не имеет идентификатора
    }
    // Проверка, отображается ли уже описание заявки
    if (!this.descriptionDisplayed) {
      // Запрос описания заявки у TicketService и вызов колбэка для отображения описания
      TicketService.getDescription(this.id, (fullDescription) => {
        this.fullDescription = fullDescription.trim();
        this.renderDescription();
        this.descriptionDisplayed = true;
      });
    } else {
      // Скрытие описания заявки
      this.hideDescription();
      this.descriptionDisplayed = false;
    }
  }

  // Метод для отображения описания заявки
  renderDescription() {
    if (!this.fullDescription) {
      return; // Возврат из метода, если описание заявки отсутствует
    }
    // Создание элемента для отображения описания и добавление его в DOM
    const descriptionEl = document.createElement("div");
    descriptionEl.classList.add("list-item-description");
    descriptionEl.textContent = this.fullDescription;
    this.nameWrapperEl.appendChild(descriptionEl);
  }

  // Метод для скрытия описания заявки
  hideDescription() {
    // Поиск элемента описания и удаление его из DOM, если он найден
    const descriptionEl = this.nameWrapperEl.querySelector(
      ".list-item-description"
    );
    if (descriptionEl) descriptionEl.remove();
  }

  // Сеттер для установки имени заявки
  set name(value) {
    this._name = value;
    this.nameEl.textContent = value;
  }

  // Геттер для получения имени заявки
  get name() {
    return this._name;
  }

  // Сеттер для установки описания заявки
  set description(value) {
    this._description = value;
  }

  // Геттер для получения описания заявки
  get description() {
    return this._description;
  }

  // Сеттер для установки даты создания заявки
  set created(value) {
    this._created = value;
    this.createdEl.textContent = value;
  }

  // Геттер для получения даты создания заявки
  get created() {
    return this._created;
  }
}