
const transfers = [
    {
        player: "Килиан Мбаппе",
        from: "ПСЖ",
        to: "Реал Мадрид",
        price: "Свободный агент",
        status: "confirmed"
    },
    {
        player: "Деклан Райс",
        from: "Вест Хэм",
        to: "Арсенал",
        price: "€116.6 млн",
        status: "confirmed"
    },
    {
        player: "Джуд Беллингем",
        from: "Боруссия Д",
        to: "Реал Мадрид",
        price: "€103 млн",
        status: "confirmed"
    },
    {
        player: "Гарри Кейн",
        from: "Тоттенхэм",
        to: "Бавария",
        price: "€95 млн",
        status: "confirmed"
    },
    {
        player: "Виктор Осимхен",
        from: "Наполи",
        to: "ПСЖ",
        price: "€100 млн",
        status: "rumour"
    },
    {
        player: "Флориан Вирц",
        from: "Байер",
        to: "Ливерпуль",
        price: "€120 млн",
        status: "rumour"
    }
];

const leagues = {
    PL: {
        name: "Английская Премьер-лига",
        clubs: [
            "Арсенал", "Манчестер Сити", "Ливерпуль",
            "Астон Вилла", "Тоттенхэм", "Манчестер Юнайтед",
            "Ньюкасл", "Челси", "Вест Хэм", "Брайтон",
            "Вулверхэмптон", "Фулхэм", "Кристал Пэлас",
            "Борнмут", "Эвертон", "Брентфорд",
            "Ноттингем Форест", "Лутон", "Бернли",
            "Шеффилд Юнайтед"
        ]
    },

    PD: {
        name: "Испанская Ла Лига",
        clubs: [
            "Реал Мадрид", "Барселона", "Жирона",
            "Атлетико Мадрид", "Атлетик Бильбао",
            "Реал Сосьедад", "Бетис", "Валенсия",
            "Вильярреал", "Хетафе", "Осасуна",
            "Севилья", "Алавес", "Лас-Пальмас",
            "Мальорка", "Райо Вальекано", "Сельта",
            "Кадис", "Гранада", "Альмерия"
        ]
    },

    BL1: {
        name: "Немецкая Бундеслига",
        clubs: [
            "Байер Леверкузен", "Бавария",
            "Штутгарт", "Боруссия Дортмунд",
            "Лейпциг", "Айнтрахт", "Хоффенхайм",
            "Хайденхайм", "Вердер", "Фрайбург",
            "Аугсбург", "Вольфсбург", "Майнц",
            "Боруссия Мёнхенгладбах", "Унион Берлин",
            "Бохум", "Кёльн", "Дармштадт"
        ]
    },

    SA: {
        name: "Итальянская Серия А",
        clubs: [
            "Интер", "Милан", "Ювентус", "Аталанта",
            "Болонья", "Рома", "Лацио", "Фиорентина",
            "Наполи", "Торино", "Дженоа", "Монца",
            "Лечче", "Удинезе", "Кальяри", "Верона",
            "Эмполи", "Фрозиноне", "Сассуоло",
            "Салернитана"
        ]
    },

    FL1: {
        name: "Французская Лига 1",
        clubs: [
            "ПСЖ", "Монако", "Брест", "Лилль",
            "Ницца", "Ланс", "Марсель", "Ренн",
            "Лион", "Реймс", "Тулуза", "Монпелье",
            "Страсбург", "Нант", "Гавр", "Метц",
            "Лорьян", "Клермон"
        ]
    }
};

// Трансферы
let currentFilter = "all";

function renderTransfers() {
    const search = document
        .getElementById("search")
        .value.toLowerCase();

    const filtered = transfers.filter(t => {
        const matchesFilter =
            currentFilter === "all" ||
            t.status === currentFilter;

        const matchesSearch =
            `${t.player} ${t.from} ${t.to}`
                .toLowerCase()
                .includes(search);

        return matchesFilter && matchesSearch;
    });

    document.getElementById("transferTable").innerHTML =
        filtered.map(t => `
            <tr>
                <td><b>${t.player}</b></td>
                <td>${t.from}</td>
                <td>${t.to}</td>
                <td class="price">${t.price}</td>
                <td class="${t.status}">
                    ${t.status === "confirmed"
                        ? "Подтверждён"
                        : "Слух"}
                </td>
            </tr>
        `).join("");
}

function filterTransfers(filter) {
    currentFilter = filter;
    renderTransfers();
}

// Турнирные таблицы
function showLeague(code) {
    const league = leagues[code];

    document.getElementById("leagueTitle")
        .textContent = league.name;

    const clubs = league.clubs.map((club, i) => {
        const played = 10;
        const won = Math.max(0, 9 - Math.floor(i / 2));
        const drawn = i % 3;
        const lost = played - won - drawn;
        const gf = 25 - i;
        const ga = 8 + i * 2;

        return {
            club,
            played,
            won,
            drawn,
            lost,
            gf,
            ga,
            gd: gf - ga,
            points: won * 3 + drawn
        };
    });

    clubs.sort((a, b) =>
        b.points - a.points || b.gd - a.gd
    );

    document.getElementById("leagueTable").innerHTML =
        clubs.map((c, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><b>${c.club}</b></td>
                <td>${c.played}</td>
                <td>${c.won}</td>
                <td>${c.drawn}</td>
                <td>${c.lost}</td>
                <td>${c.gf}</td>
                <td>${c.ga}</td>
                <td>${c.gd > 0 ? "+" : ""}${c.gd}</td>
                <td class="price">${c.points}</td>
            </tr>
        `).join("");
}

// Финансы клубов
const finances = [
    ["Челси", "€467 млн", "€250 млн", "−€217 млн"],
    ["Манчестер Юнайтед", "€206 млн", "€25 млн", "−€181 млн"],
    ["Арсенал", "€235 млн", "€10 млн", "−€225 млн"],
    ["Реал Мадрид", "€130 млн", "€95 млн", "−€35 млн"],
    ["Бавария", "€155 млн", "€105 млн", "−€50 млн"],
    ["Брайтон", "€110 млн", "€180 млн", "+€70 млн"]
];

function renderFinance() {
    document.getElementById("financeTable").innerHTML =
        finances.map(c => `
            <tr>
                <td><b>${c[0]}</b></td>
                <td>${c[1]}</td>
                <td>${c[2]}</td>
                <td class="price">${c[3]}</td>
            </tr>
        `).join("");
}

// ИИ-помощник — пока демонстрационный
function getAIResponse(question) {
    const q = question.toLowerCase();

    if (q.includes("баланс")) {
        return "Трансферный баланс — разница между деньгами, потраченными на покупки, и доходами от продаж. Например, клуб потратил €100 млн и получил €70 млн. Его чистый расход составляет €30 млн.";
    }

    if (q.includes("стоимость") || q.includes("оценка")) {
        return "Стоимость футболиста зависит от возраста, позиции, статистики, потенциала, контракта, травм и спроса на рынке.";
    }

    if (q.includes("реал")) {
        return "Реал Мадрид — один из крупнейших футбольных клубов Европы. Для анализа нужно учитывать состав, результаты, зарплаты и трансферные расходы.";
    }

    if (q.includes("трансфер")) {
        return "При анализе трансфера нужно учитывать стоимость игрока, возраст, зарплату, длительность контракта и то, насколько он подходит тактике клуба.";
    }

    return "Я футбольный аналитик TransferZone. Могу рассказать о трансферах, клубах, стоимости игроков, тактике и финансовом рынке. Пока я работаю в демонстрационном режиме.";
}

// Чат
document.getElementById("chatForm")
    .addEventListener("submit", function(e) {
        e.preventDefault();

        const input = document.getElementById("chatInput");
        const question = input.value.trim();

        if (!question) return;

        const messages = document.getElementById("messages");

        messages.innerHTML += `
            <div class="user-message">
                ${escapeHTML(question)}
            </div>
        `;

        const answer = getAIResponse(question);

        messages.innerHTML += `
            <div class="bot-message">
                ${escapeHTML(answer)}
            </div>
        `;

        input.value = "";
        messages.scrollTop = messages.scrollHeight;
    });

// Защита вывода текста пользователя от HTML-вставок
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Первоначальная загрузка
renderTransfers();
renderFinance();
showLeague("PL");
