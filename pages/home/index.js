const labelToImageMap = {
  "For Work" : '../../assets/images/gift-for-work.png',
  "For Health": '../../assets/images/gift-for-health.png',
  "For Harmony": '../../assets/images/gift-for-harmony.png'
};
function getRandomElements(array, count = 4) {
  if (!Array.isArray(array)) {
    console.error("Некорректные данные: ожидался массив");
    return [];
  }
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
// Функция рендеринга карточек
function renderGifts(cards) {
 const container = document.querySelector('.best-gifts-list');
 container.innerHTML = cards.map(card => `
    <div class="card" data-label="${card.category}">
       <div class="card-image"><img src="${labelToImageMap[card.category]}" alt="gift-${card.category}" width="310" height="230"></div>
         <div class="card-text">
           <span class="header-4">${card.category}</span>
           <span class="header-3">${card.name}</span>
         </div>
       </div>
       `).join('');
}

const body = document.body;
function initModals(cards) {
   document.querySelectorAll('.card').forEach((card, index) => {
     card.addEventListener('click', () => {
       console.log('Card clicked:', index);
       const cardData = cards[index];
       console.log('Card data:', cardData);
       openModal(cardData);
     });
   });
 }
 let scrollPosition = 0;
 function openModal(cardData){
   const modalOverlay = document.createElement('div');
   modalOverlay.className = 'modal-overlay';
   scrollPosition = window.pageYOffset;
   document.body.style.top = `-${scrollPosition}px`;
   // Функция для обработки ESC
   const handleEscKey = (e) => {
       if (e.key === 'Escape') {
       closeModal(modalOverlay);
       }
   };

   modalOverlay.innerHTML = `
   <div class="modal">
     <div class="modal-content">
       <span class="close">&times;</span>
       <div class="modal-image-container">
         <img src="${labelToImageMap[cardData.category]}"
              alt="${cardData.category}"
              width="310"
              height="230">
       </div>
       <div class="modal-text">
         <div class="modal-header ${cardData.category.toLowerCase().replace(' ', '-')}">
           <span class="header-4">${cardData.category}</span>
           <span class="header-3">${cardData.name}</span>
           <span class="paragraph">${cardData.description}</span>
         </div>
         <div class="modal-stats">
           <span class="header-4">Adds superpower to</span>
           <ul class="modal-stats-content">
             ${Object.entries(cardData.superpowers).map(([key, value]) => `
               <li class="modal-stat-block">
                 <div class="span-1">
                   <span class="paragraph">${key}</span>
                 </div>
                 <span class="paragraph">${value}</span>
                 <div class="modal-stars">
                   ${generateSnowflakes(value)}
                 </div>
               </li>
             `).join('')}
           </ul>
         </div>
       </div>
     </div>
   </div>
 `;
 document.body.appendChild(modalOverlay);
 body.classList.toggle('no-scroll'); // Блокировка скролла
 document.addEventListener('keydown', handleEscKey);
 modalOverlay.querySelector('.close').addEventListener('click', () => closeModal(modalOverlay));
 modalOverlay.addEventListener('click', (e) => {
   if(e.target === modalOverlay) closeModal(modalOverlay);
 });
 // Сохраняем ссылку на обработчик для последующего удаления
 modalOverlay.handleEscKey = handleEscKey;
}
function generateSnowflakes(value) {
 const numericValue = parseInt(value.replace('+', ''));
 const filled = Math.min(Math.floor(numericValue / 100), 5);

 let snowflakes = '';
 for(let i = 0; i < 5; i++) {
   const opacity = i < filled ? 1 : 0.2;
   snowflakes += `
     <div>
       <img src="../../assets/icons/snowflake.svg"
            alt="snowflake"
            width="16"
            height="16"
            style="opacity: ${opacity};">
     </div>
   `;
 }
 return snowflakes;
}
function closeModal(modal) {
 // Удаляем обработчик ESC
 document.removeEventListener('keydown', modal.handleEscKey);
 body.classList.remove('no-scroll'); // Разблокировка
 document.body.style.top = '';
 modal.remove();
 window.scrollTo({
    top: scrollPosition,
    behavior: 'instant' // Переопределяем глобальный smooth
  });
}

document.addEventListener('DOMContentLoaded', async() => {
  try{
    const response = await fetch('../gifts/gifts.json');
    if(!response.ok) throw new Error('error to load');
    const data = await response.json();
    const randomCards = getRandomElements(data.cards, 4);
    renderGifts(randomCards);
    initModals(randomCards);
  }
  catch (error){
    console.error('Error to load', error);
  }

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

  // Функция для выбора случайных элементов

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
