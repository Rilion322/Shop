document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('giftsButton').addEventListener('click', function() {

        // Анимация
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);

        // Переход через 1 секунду
        setTimeout(() => {
          window.location.href = '../gifts/gifts.html';
        }, 1000);
  });

  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.button-left');
  const nextBtn = document.querySelector('.button-right');

  const container = document.querySelector('.slider-container');
  const sidePadding = 200;
  let currentPosition = 0;
  let visibleWidth = container.offsetWidth;
  let totalWidth = 0;

  // Рассчитываем общую ширину слайдов
  slides.forEach(slide => {
    totalWidth += slide.offsetWidth + 20; // + gap
  });

  // Добавляем начальный и конечный отступы
  totalWidth += sidePadding;

  function getClicksNeeded() {
    return window.innerWidth >= 768 ? 3 : 6;
  }

  function calculateStep() {
    const availableWidth = visibleWidth;
    return (totalWidth - visibleWidth) / getClicksNeeded();
  }

  function updateButtons() {
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= totalWidth - visibleWidth;
  }

  function moveSlider(step) {
    currentPosition = Math.max(0, Math.min(currentPosition + step, totalWidth - visibleWidth));
    slider.style.transform = `translateX(-${currentPosition}px)`;
    updateButtons();
  }

  nextBtn.addEventListener('click', () => {
    moveSlider(calculateStep());
  });

  prevBtn.addEventListener('click', () => {
    moveSlider(-calculateStep());
  });

  window.addEventListener('resize', () => {
    visibleWidth = container.offsetWidth;
    updateButtons();
  });

  // Инициализация
  updateButtons();
});
  // Функция открытия модального окна
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
}

// Функция закрытия модального окна
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto'; // Возвращаем прокрутку страницы
}

// Закрытие при клике вне модального окна
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
}

// Закрытие по ESC
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.key === 'Escape') {
      const modals = document.getElementsByClassName('modal');
      for (let i = 0; i < modals.length; i++) {
          modals[i].style.display = 'none';
      }
      document.body.style.overflow = 'auto';
  }
};

// Начальная целевая дата (пример: 31 декабря 2025, 23:59:59)
let endDate = new Date(2025, 11, 31, 23, 59, 59);
function updateTimer() {
  const now = new Date();
  let diff = endDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
// Запуск таймера
setInterval(updateTimer, 1000);
updateTimer(); // Первоначальный вызов
// Бургер меню
const burgerBtn = document.querySelector('.burger-btn');
const nav = document.querySelector('.nav');
const body = document.body;

burgerBtn.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  burgerBtn.classList.toggle('active');
  body.classList.toggle('no-scroll', isActive); // Блокировка скролла
});

// Закрытие при клике вне меню
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !burgerBtn.contains(e.target)) {

    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
    body.classList.remove('no-scroll'); // Разблокировка
  }
});

// Закрытие при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
    body.classList.remove('no-scroll'); // Разблокировка
  });
});

// Закрытие по Esc (добавлено для полноты функционала)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burgerBtn.classList.remove('active');
    body.classList.remove('no-scroll'); // Разблокировка
  }
});
