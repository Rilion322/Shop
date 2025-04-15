document.addEventListener('DOMContentLoaded', async () => {
    const labelToImageMap = {
        "For Work" : '../../assets/images/gift-for-work.png',
        "For Health": '../../assets/images/gift-for-health.png',
        "For Harmony": '../../assets/images/gift-for-harmony.png'
      };
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