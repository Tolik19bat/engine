// Импорт необходимых модулей и компонентов
import TicketList from "./TicketList"; // Импорт класса TicketList из файла TicketList.js
import Popup from "./Popup"; // Импорт класса Popup из файла Popup.js
import Confirm from "./Confirm"; // Импорт класса Confirm из файла Confirm.js

// Получение ссылки на контейнер с классом "list" из DOM
const container = document.querySelector(".list");

// Создание экземпляра класса Popup для отображения всплывающих окон
const popup = new Popup();

// Создание экземпляра класса Confirm для отображения подтверждающих окон
const confirm = new Confirm();

// Создание экземпляра класса TicketList для управления списком заявок
// Передача ссылок на контейнер, экземпляр класса Popup и экземпляр класса Confirm в качестве параметров конструктора
const ticketList = new TicketList(container, popup, confirm);

// Вызов метода инициализации объекта TicketList для начала работы со списком заявок
ticketList.init();