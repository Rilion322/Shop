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
  });