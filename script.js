// Дані про зброю
const weaponDetails = {
    "Пістолет": "Пістолет — це портативна вогнепальна зброя, призначена для стрільби однією рукою. Історія пістолетів бере початок із XVI століття, коли з’явилися перші колісцеві замки. Сучасні пістолети, такі як Glock чи Beretta, широко використовуються в поліції, армії та для самооборони. Характеристики: калібр від 9 мм, дальність стрільби до 50 метрів.",
    "Меч": "Меч — символ воїнської доблесті, що використовувався з бронзового віку. У середньовіччі мечі стали основною зброєю лицарів. Їхні клинки могли бути одно- чи дворучними, довжиною від 70 до 120 см. Відомі типи: катана (Японія), гладіус (Рим), лонгсворд (Європа).",
    "Гвинтівка": "Гвинтівка — довгоствольна вогнепальна зброя з нарізним стволом для підвищеної точності. З’явилася в XIX столітті й стала основою для снайперських систем. Приклад: M24 SWS (США) має дальність до 800 метрів і калібр 7.62 мм.",
    "Лук": "Лук — одна з найдавніших видів зброї, відома з кам’яного віку. Використовувався для полювання та війни. Англійський довгий лук у середньовіччі пробивав обладунки на відстані до 300 метрів. Сучасні спортивні луки досягають швидкості стріли 90 м/с.",
    "Граната": "Граната — ручна вибухова зброя, що з’явилася в XVII столітті. Сучасні моделі, як-от Ф-1, мають радіус ураження до 200 метрів осколками. Використовується для знищення живої сили чи укріплень.",
    "Сокира": "Сокира — не лише інструмент, а й потужна бойова зброя. У вікінгів бойові сокири мали довгі руків’я та широкі леза. Вага могла сягати 2 кг, а удар пробивав щити та обладунки.",
    "Кулемет": "Кулемет — автоматична зброя для безперервного вогню. Перший кулемет Максима з’явився в 1884 році. Сучасні моделі, як ПКМ, мають скорострільність до 650 пострілів за хвилину й калібр 7.62 мм."
};

// Фільтрація карток
document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.weapon-card');

        cards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            if (filter === 'all' || cardType === filter) {
                card.style.display = 'block';
                card.classList.add('hidden');
                setTimeout(() => observeCard(card), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    });
});

// Модальне вікно
const modal = document.getElementById('weapon-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const title = card.querySelector('h2').textContent;
        const image = card.querySelector('img').src;
        const shortDescription = card.querySelector('p').textContent;

        modalTitle.textContent = title;
        modalImage.src = image;
        modalDescription.textContent = `${shortDescription} ${weaponDetails[title] || "Додаткової інформації поки немає."}`;
        
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Анімація появи карток при скролінгу
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

function observeCard(card) {
    if (card.style.display !== 'none') {
        observer.observe(card);
    }
}

document.querySelectorAll('.weapon-card').forEach(card => {
    observeCard(card);
});