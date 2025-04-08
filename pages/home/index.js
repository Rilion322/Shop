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
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
}

// Функция закрытия модального окна
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto'; // Возвращаем прокрутку страницы
}

// Закрытие при клике вне модального окна
window.onclick = function(event) {
  if (event.target.className === 'modal') {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
}

// Закрытие по ESC
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode === 27) {
      const modals = document.getElementsByClassName('modal');
      for (let i = 0; i < modals.length; i++) {
          modals[i].style.display = 'none';
      }
      document.body.style.overflow = 'auto';
  }
};