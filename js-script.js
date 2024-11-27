// Массив с иконками (для курсора)
const icons = [
    'imgs/cursors/1.svg', 'imgs/cursors/2.svg', 'imgs/cursors/3.svg', 'imgs/cursors/4.svg', 
    'imgs/cursors/5.svg', 'imgs/cursors/6.svg', 'imgs/cursors/7.svg', 'imgs/cursors/8.svg', 
    'imgs/cursors/9.svg', 'imgs/cursors/10.svg', 'imgs/cursors/11.svg', 'imgs/cursors/12.svg'
];

// Элементы страницы для таймера и модального окна
const button = document.getElementById('startButton');
const modal = document.getElementById('modal');
const timerElement = document.getElementById('timer');
const closeModalButton = document.getElementById('closeModal');

// Элементы страницы для игры
const gameButton = document.getElementById('gameButton');
const gameModal = document.getElementById('gameModal');
const closeGameModalButton = document.getElementById('closeGameModal');
const userInput = document.getElementById('userInput');
const randomNumberField = document.getElementById('randomNumber');
const gameResultMessage = document.getElementById('gameResultMessage');

// Переменные для игры
let attemptCount = 0;

// ** Скрытие модального окна при загрузке страницы **
document.addEventListener('DOMContentLoaded', () => {
    modal.style.display = 'none'; // Модальное окно для таймера скрыто при загрузке
    gameModal.style.display = 'none'; // Модальное окно игры скрыто при загрузке
});

// Обработчик нажатия на кнопку запуска таймера
button.addEventListener('click', () => {
    let i = 0;
    const interval = setInterval(() => {
        // Меняем курсор
        document.body.style.cursor = `url(${icons[i]}), auto`;

        i++;
        if (i === icons.length) {
            clearInterval(interval);
            // Восстанавливаем стандартный курсор
            document.body.style.cursor = 'auto';

            // Показываем модальное окно
            showModal();
        }
    }, 500); // Меняем курсор каждые 0.5 секунды
});

// Функция для отображения модального окна с таймером
function showModal() {
    modal.style.display = 'flex';

    // Таймер обратного отсчета
    let timeRemaining = 15;
    const countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            closeModal(); // Закрыть модальное окно
        }
    }, 1000);

    // Добавляем обработчик закрытия окна
    closeModalButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        closeModal();
    });
}

// Функция для скрытия модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.cursor = 'auto'; // Убираем курсор, если он остался
}





// Функция для открытия модального окна игры
gameButton.addEventListener('click', () => {
    gameModal.style.display = 'block';
    attemptCount = 0; // Сброс попыток
    resetGame(); // Сброс игры
});

// Функция для закрытия модального окна игры
closeGameModalButton.addEventListener('click', () => {
    gameModal.style.display = 'none';
    resetGame(); // Сброс игры
});

// Функция для сброса игры
function resetGame() {
    userInput.value = '';
    randomNumberField.value = '';
    gameResultMessage.textContent = '';
}

// Функция для обработки ввода пользователя и проверки
function handleUserInput() {
    const userNumber = parseInt(userInput.value, 10);

    // Если ввод не является числом или выходит за пределы
    if (isNaN(userNumber) || userNumber < 0 || userNumber > 10) {
        randomNumberField.value = '';
        gameResultMessage.textContent = 'Сюда можно вводить ТОЛЬКО целые числа от 0 до 10. Не шали!';
        gameResultMessage.className = 'red'; // Красный цвет для ошибки
        return;
    }

    // Увеличиваем количество попыток
    attemptCount++;

    let randomNumber;

    // Каждая пятая попытка должна быть выигрышной
    if (attemptCount % 5 === 0) {
        randomNumber = userNumber; // Равняется числу пользователя
        gameResultMessage.textContent = 'Вы угадали число!';
        gameResultMessage.className = 'green'; // Зеленый цвет для успеха
    } else {
        // Генерация случайного числа от 0 до 10
        randomNumber = Math.floor(Math.random() * 11); // 0-10 включительно
        if (userNumber === randomNumber) {
            gameResultMessage.textContent = 'Вы угадали число!';
            gameResultMessage.className = 'green'; // Зеленый цвет для успеха
        } else {
            gameResultMessage.textContent = 'Увы, вы не смогли угадать число';
            gameResultMessage.className = 'red'; // Красный цвет для неудачи
        }
    }

    // Записываем сгенерированное число в правое поле
    randomNumberField.value = randomNumber;
}

// Обработчик нажатия клавиши Enter
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput(); // Обрабатываем ввод при нажатии Enter
    }
});








// Находим кнопку и контейнер
const fireworkButton = document.getElementById('fireworkButton');
const fireworksContainer = document.getElementById('fireworks-container');

// Обработчик нажатия на кнопку
fireworkButton.addEventListener('click', (event) => {
    // Получаем координаты курсора
    const rect = fireworkButton.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + (rect.height / 2);

    // Создаем фейерверк
    createFirework(x, y);
});

// Функция для создания фейерверка
function createFirework(x, y) {
    const particleCount = 30; // Количество частиц
    const angleStep = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        const angle = angleStep * i;
        const dx = Math.cos(angle) * (100 + Math.random() * 50); // Случайное движение по X
        const dy = Math.sin(angle) * (100 + Math.random() * 50); // Случайное движение по Y

        // Создаем частицу
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // Устанавливаем свойства частицы
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        particle.style.setProperty('--size', `${Math.random() * 8 + 4}px`); // Размер: от 4 до 12 пикселей
        particle.style.setProperty('--duration', `${Math.random() * 0.5 + 1}s`); // Длительность: от 1 до 1.5 сек
        particle.style.setProperty('--color', `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`); // Случайный цвет

        // Добавляем частицу в контейнер
        fireworksContainer.appendChild(particle);

        // Удаляем частицу после окончания анимации
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}






// Добавляем слушатель событий для отслеживания движения мыши
document.addEventListener('mousemove', (event) => {
    // Создаём элемент сердечка
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Устанавливаем положение сердечка
    heart.style.left = `${event.pageX - 10}px`; // Центрируем сердечко по X
    heart.style.top = `${event.pageY - 10}px`; // Центрируем сердечко по Y

    // Добавляем сердечко на страницу
    document.body.appendChild(heart);

    // Удаляем сердечко через 1.5 секунды
    setTimeout(() => {
        heart.remove();
    }, 1500);
});
