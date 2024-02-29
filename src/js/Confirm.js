// Экспорт класса Confirm для использования в других модулях
export default class Confirm {
  // Конструктор класса Confirm
  constructor() {
    // Поиск элемента с классом "confirm" в DOM и сохранение ссылки на него
    this.element = document.querySelector(".confirm");
    // Нахождение кнопки "Отмена" внутри элемента "confirm" и сохранение ссылки на неё
    this.btnCancelEl = this.element.querySelector(".confirm-btn-cancel");
    // Нахождение кнопки "ОК" внутри элемента "confirm" и сохранение ссылки на неё
    this.btnOkEl = this.element.querySelector(".confirm-btn-ok");
    // Привязка контекста выполнения к методу onClickBtnCancel
    this.onClickBtnCancel = this.onClickBtnCancel.bind(this);
    // Привязка контекста выполнения к методу onClickBtnOk
    this.onClickBtnOk = this.onClickBtnOk.bind(this);
    // Добавление слушателя события "click" на кнопку "Отмена" для вызова метода onClickBtnCancel
    this.btnCancelEl.addEventListener("click", this.onClickBtnCancel);
    // Добавление слушателя события "click" на кнопку "ОК" для вызова метода onClickBtnOk
    this.btnOkEl.addEventListener("click", this.onClickBtnOk);
  }

  // Метод для отображения подтверждающего окна
  show(callback) {
    // Сохранение переданной функции обратного вызова
    this.callback = callback;
    // Удаление класса "hidden" для отображения подтверждающего окна
    this.element.classList.remove("hidden");
  }

  // Метод для скрытия подтверждающего окна
  hide() {
    // Добавление класса "hidden" для скрытия подтверждающего окна
    this.element.classList.add("hidden");
  }

  // Метод-обработчик события "click" на кнопке "Отмена"
  onClickBtnCancel() {
    // Вызов метода hide для скрытия подтверждающего окна
    this.hide();
  }

  // Метод-обработчик события "click" на кнопке "ОК"
  onClickBtnOk() {
    // Вызов метода hide для скрытия подтверждающего окна
    this.hide();
    // Вызов функции обратного вызова, переданной в метод show
    this.callback();
  }
}