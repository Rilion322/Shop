const labelToImageMap = {
    "For Work" : '../../assets/images/gift-for-work.png',
    "For Health": '../../assets/images/gift-for-health.png',
    "For Harmony": '../../assets/images/gift-for-harmony.png'
  };
document.addEventListener('DOMContentLoaded', async () => {
    const tabsNav = document.querySelector('.gifts-tabs');
    const cardsContainer = document.querySelector('.gifts-table');
    try{
        const response = await fetch('gifts.json');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();

        cardsContainer.innerHTML = data.cards.map(card => `
            <div class="card" data-label="${card.category}">
                <div class="card-image"><img src="${labelToImageMap[card.category]}" alt="gift-${card.category}" width="310" height="230"></div>
                <div class="card-text">
                    <span class="header-4">${card.category}</span>
                    <span class="header-3">${card.name}</span>
                </div>
            </div>
            `).join('');
        initFilters();
        initModals(data.cards);
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
              card.classList.add('visible');
            });
          }, 100);
    }
    catch(error){
        cardsContainer.innerHTML = `
        <div class="error-message">
            Ошибка загрузки данных ${error.message}
        </div>
        `;
    }


}
)
function initFilters(){
    const links = document.querySelectorAll('.tab-link');
    const cards = document.querySelectorAll('.card');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('active')) return;
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Применяем фильтр
            const filter = this.dataset.filter;
            cards.forEach(card => {
            const matches = filter === 'all' || card.dataset.label === filter;
            card.style.display = matches ? 'flex' : 'none';
            // Добавляем/убираем анимацию
            card.classList[matches ? 'add' : 'remove']('visible');
            });
        })
    })
}
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
function openModal(cardData){
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
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
    modal.remove();
}
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
// Скролл ту топ кнопка
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

function updateButtonVisibility() {
  const isMobile = window.innerWidth <= 768;
  const scrolledEnough = window.scrollY > 300;

  if (isMobile && scrolledEnough) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Обработчики событий
window.addEventListener('scroll', updateButtonVisibility);
window.addEventListener('resize', updateButtonVisibility);
scrollToTopBtn.addEventListener('click', scrollToTop);

// Инициализация при загрузке
updateButtonVisibility();
