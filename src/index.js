import "./styles.css";

// принцип работы DnD на голом JS
let isDrag = false;
let draggedElem = null;

/* 
  в объекте shifts хранится информация о "шифтах",
  то есть лишнем расстоянии до элемента, так как элемент может быть позиционирован
  относительно своего родителя, это расстояние нам дает понять, где был произведен клик,
  относительно родителя элемента
*/
const shifts = {
  shiftX: 0,
  shiftY: 0,
  set: (element, clientX, clientY) => {
    shifts.shiftX = clientX - element.getBoundingClientRect().x; // лишнее расстояние по X
    shifts.shiftY = clientY - element.getBoundingClientRect().y; // лишнее расстояние по y
  }
};

// вспомогательная функция для перемещения элемента
const moveItem = (element, clientX, clientY) => {
  // element = элемент, который двигаем
  // clientX = координаты мыши по X
  // clientY = координаты мыши по Y
  element.style.left = clientX - shifts.shiftX + "px";
  element.style.top = clientY - shifts.shiftY + "px";
};

const elem = document.querySelector(".element"); // сам элемент, который мы двигаем

// функция для начала перемещения
elem.onmousedown = (e) => {
  // устанавливаем элемент, который будем перемещать
  isDrag = true;
  draggedElem = e.target;
  // находим то самое лишнее расстояние
  shifts.set(draggedElem, e.clientX, e.clientY);
};

// Здесь происходит перемещение
document.onmousemove = (e) => {
  // если состояние перемещения находится в true, то будем смещать draggedElem
  if (isDrag) {
    draggedElem.style.position = "absolute";
    moveItem(draggedElem, e.clientX, e.clientY); // вызываем функцию смещения
  }
};

// заканчиваем перемещение, если отпускается кнопка мыши
elem.onmouseup = (e) => {
  // придаем изначальное состояние приложения
  isDrag = false;
  draggedElem.style.position = "static";
  draggedElem = null;
};
