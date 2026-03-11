// script.js

(function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = window.innerHeight * 0.85;
        return rect.top <= threshold && rect.bottom >= 0;
    }

    // Функция для активации reveal-элементов
    function checkReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', () => {
        requestAnimationFrame(checkReveal);
    });
    window.addEventListener('resize', checkReveal);
    checkReveal();

    // Обработчик для кнопки "Подробнее"
    function initDetailsButton() {
        const detailsButton = document.getElementById('detailsButton');
        const detailsContent = document.getElementById('detailsContent');
        const arrowIcon = document.getElementById('arrowIcon');
        
        if (!detailsButton || !detailsContent || !arrowIcon) {
            console.log('Элементы не найдены');
            return;
        }
        
        console.log('Кнопка найдена, добавляем обработчик');
        
        detailsButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Кнопка нажата');
            
            // Переключаем классы
            detailsContent.classList.toggle('visible');
            arrowIcon.classList.toggle('rotated');
            
            // Меняем текст кнопки
            const buttonText = this.querySelector('span:first-child');
            if (buttonText) {
                buttonText.textContent = detailsContent.classList.contains('visible') ? 'Скрыть' : 'Подробнее';
            }
            
            // Обновляем видимость prose элементов
            updateProseVisibility();
            
            // Плавный скролл
            if (detailsContent.classList.contains('visible')) {
                setTimeout(() => {
                    detailsContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    }
    
    // Управление видимостью prose элементов
    let proseElements = [];
    
    function initProseVisibility() {
        proseElements = document.querySelectorAll('.prose');
        
        if (!proseElements.length) return;
        
        // Скрываем prose при загрузке
        proseElements.forEach(el => {
            el.style.display = 'none';
        });
    }
    
    function updateProseVisibility() {
        const detailsContent = document.getElementById('detailsContent');
        if (!detailsContent || !proseElements.length) return;
        
        const isVisible = detailsContent.classList.contains('visible');
        
        proseElements.forEach(el => {
            if (isVisible) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    }
    
    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDetailsButton();
            initProseVisibility();
        });
    } else {
        initDetailsButton();
        initProseVisibility();
    }
})();

// Отслеживание скачиваний APK
function initDownloadTracking() {
    const downloadBtn = document.querySelector('.download-btn');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        console.log('Скачивание APK файла начато');
        
        // Здесь можно добавить отправку статистики
        // Например, через Google Analytics или Яндекс.Метрику
        
        // Пример для Google Analytics:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'download', {
        //         'event_category': 'APK',
        //         'event_label': 'ArmMaster v1.0.0'
        //     });
        // }
    });
}

// Добавьте вызов в инициализацию
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDetailsButton();
        initProseVisibility();
        initDownloadTracking(); // Добавьте эту строку
    });
} else {
    initDetailsButton();
    initProseVisibility();
    initDownloadTracking(); // Добавьте эту строку
}