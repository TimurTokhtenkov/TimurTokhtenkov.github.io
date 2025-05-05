document.addEventListener('DOMContentLoaded', function() {
    // Переключение дней
    const tabs = document.querySelectorAll('.day-tab');
    const schedules = document.querySelectorAll('.day-schedule');
    
    // Функция для определения текущего дня недели (0-6, где 0 - воскресенье)
    function getCurrentDayIndex() {
        const now = new Date();
        let day = now.getDay() - 1; // Корректируем для ПН=0, ВТ=1 и т.д.
        if (day === -1) day = 6; // Воскресенье делаем 6 (не показываем)
        return day;
    }

    // Функция активации дня по индексу (0-4 для ПН-ПТ)
    function activateDay(index) {
        // Скрываем все дни и деактивируем все вкладки
        tabs.forEach(t => t.classList.remove('active'));
        schedules.forEach(s => s.classList.remove('active'));
        
        // Активируем выбранный день
        if (index >= 0 && index <= 4) {
            const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri'];
            const dayId = dayNames[index];
            document.querySelector(`[data-day="${dayId}"]`).classList.add('active');
            document.getElementById(dayId).classList.add('active');
        }
    }

    // Обработчики для вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const dayIndex = Array.from(tabs).indexOf(tab);
            activateDay(dayIndex);
        });
    });
    
    // Автоматически активируем текущий день
    const currentDayIndex = getCurrentDayIndex();
    if (currentDayIndex >= 0 && currentDayIndex <= 4) {
        activateDay(currentDayIndex);
    } else {
        // Если сейчас выходные, показываем понедельник
        activateDay(0);
    }
    
    // Переключение темы (остаётся без изменений)
    const themeToggle = document.getElementById('mobileThemeToggle');
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Проверка сохранённой темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Установка правильной иконки темы
    const themeIcon = themeToggle.querySelector('i');
    if (savedTheme === 'light') {
        themeIcon.className = 'fas fa-sun';
    }
});

