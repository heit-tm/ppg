/*
 * Copyright (c) 2020. shtrih
 */

const history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];

function addHistory (txt) {
    const date = new Date();
    history.push(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}: ${txt}`);
    localStorage.setItem('history', JSON.stringify(history));
}

function showLastHistory(num = 50) {
    num = num > history.length ? history.length : num;
    for (let i = history.length - 1; i > history.length - 1 - num; i--) {
        console.log(history[history.length - i - 1]);
    }
}

window.addEventListener('onbeforeunloaded', () => {
    addHistory('Закрытие колеса');
})

addHistory('Запуск или обновление колеса');

const helpPopup = document.querySelector('.help-popup');
function closeHelpPopup() {
    helpPopup.style.display = 'none';
}

function openHelpPopup() {
    helpPopup.style.display = 'block';
}

const dataSets = {
    inventory: [
        'А где это я',
        'Аптечка',
        'Бездонный мешок',
        'Благотворительность',
        'ВзрывОчка',
        'Взрывчатка',
        'Воля случая',
        'Все херня, давай по новой',
        'Второй шанс',
        'Горячая картошка',
        'Грязнулькин',
        'Два по цене одного',
        'Дроп Дропыч',
        'Дротик с ядом',
        'Дуэль',
        'Дырявые штаны',
        'Ебанный рот этого казино',
        'Жесткая заруба',
        'Жить-пожить',
        'Заначка Старыги',
        'Интрига',
        'Корона Короля Рандома',
        'Красочная манга',
        'Кубик хуюбика',
        'Кукла вуду',
        'Куриная лапка',
        'Лава',
        'Мощный бросок',
        'Моя остановочка',
        'Наглый чаттерс',
        'Наперсток',
        'Не добежал',
        'Не ОНО',
        'Неебические часы',
        'Неизвестная фласка',
        'Облезлая крыса',
        'Обмен',
        'Однорукий бандит',
        'Ой, извините',
        'Очки EZ',
        'Пластилин',
        'По магазинам с чатом',
        'Повязка Рэмбо',
        'Погреб Багика',
        'Помощь отстающему',
        'Портянки-невидимки',
        'Проблев',
        'Противоядие',
        'Реверсивные сапоги',
        'Ремонтный набор',
        'Ржавый капкан',
        'Робин Гуд',
        'Рокировочка',
        'Рука Мидаса',
        'Руки-крюки',
        'Слабый бросок',
        'Случай на Геймгаунтлете',
        'Сорокалетний девственник',
        'Сраное колдунье',
        'Стример не тупой',
        'Сужающееся колесо Фландерса',
        'Телепорт',
        'Трос',
        'У вас есть 1 минута',
        'Удачный неудачник',
        'Ультрамошна',
        'Хакер',
        'ХаниПринтер',
        'Хидден Гем',
        'Че умный, да',
        'Читерский кубик',
        'Шар всезнания',
        'Щит',
        'Странные ягоды',
        'Яша',
    ],
    effects: [
        'Аптечка',
        'Бездонный мешок',
        'Все херня, давай по новой',
        'Второй шанс',
        'Два по цене одного',
        'Жить-пожить',
        'Корона короля рандома',
        'Красочная манга',
        'Кукла вуду',
        'Куриная лапка',
        'Мощный бросок',
        'Моя остановочка',
        'Наперсток',
        'Не ОНО',
        'Неебические часы',
        'Ой, извините',
        'Очки EZ',
        'Пластилин',
        'По магазинам с чатом',
        'Портянки-невидимки',
        'Проблев',
        'Противоядие',
        'Ремонтный набор',
        'Рокировочка',
        'Рука Мидаса',
        'Сорокалетний девственник',
        'Странные ягоды',
        'Телепорт',
        'Трос',
        'Удачный неудачник',
        'ХаниПринтер',
        'Читерский кубик',
        'Шар всезнания',
        'Щит',
    ],
    coin: [
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Ребро!',
    ],
    streamers: [
        'Heit_tm',
        'HoneyRinder',
        'Chillout_latte',
        'Gamelxrd',
        'Toopenya',
        'Red_pondaa',
        'Bagick',
        'Dobryylisenok',
        '9Bezdar',
        'Gwisdom',
    ],
    debuffs: [
        'Благотворительность',
        'Взрывчатка',
        'Горячая картошка',
        'Грязнулькин',
        'Два по цене одного',
        'Дырявые штаны',
        'Кубик хуюбика',
        'Наглый чаттерс',
        'Не добежал',
        'Повязка Рэмбо',
        'Реверсивные сапоги',
        'Руки-крюки',
        'Слабый бросок',
        'Хидден Гем',
    ]
};

let currentDataSet = 'inventory',
    editedDataSets = {};

// Удаленные элементы, которые нужно отфильтровывать из сохранений
const deletedElements = [
    "Извини что трахнул",
];

function loadFromLocalStorage(preset) {
    const data = JSON.parse(localStorage.getItem('dataSet_' + preset));
    if (data) {
        deletedElements.forEach(item => {
            delete data[item];
        });
    }

    return data;
}

// Загрузка данных из localStorage
editedDataSets.inventory = loadFromLocalStorage('inventory');
editedDataSets.effects = loadFromLocalStorage('effects');
editedDataSets.coin = loadFromLocalStorage('coin');
editedDataSets.streamers = loadFromLocalStorage('streamers');
editedDataSets.debuffs = loadFromLocalStorage('debuffs');

const editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    optionClick = function (option, checked) {
        editedDataSets[currentDataSet][option] = checked;
        addHistory(`Изменение настроек: ${option} ${checked ? 'включен' : 'выключен'} в пресете ${currentDataSet}`);
    },
    generateOptions = function (dataObject) {
        let options = '';
        for (let i in dataObject) {
            options += `<label><input type="checkbox" onchange="optionClick('${i}', this.checked)" ${dataObject[i] ? 'checked' : ''} />${i}</label><br />`;
        }

        return options;
    },
    resetEditedDataSet = function () {
        editedDataSets[currentDataSet] = Object.fromEntries(dataSets[currentDataSet].map(v => v).sort().map(v => [v, true]));
        addHistory(`Сброс настроек в пресете ${currentDataSet}`);
    },
    editedDataToArray = function () {
        let result = [];

        for (let [key, value] of Object.entries(editedDataSets[currentDataSet])) {
            if (value) {
                result.push(key)
            }
        }

        return result;
    }
;

editButton.addEventListener('click', function () {
    if (currentDataSet === 'custom') {
        p5Instance.mouseDragEnable(false);
        customDialog.style.display = 'block';

        return;
    }

    editDialog.style.display = 'block';
    p5Instance.mouseDragEnable(false);

    editPresets.innerHTML = '';
    editPresets.append(...presets.getNodes(currentDataSet));
    editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);
});
editConfirmButton.addEventListener('click', function () {
    editDialog.style.display = 'none';
    p5Instance.mouseDragEnable();

    p5Instance.setData(editedDataToArray());
    localStorage[`dataSet_${currentDataSet}`] = JSON.stringify(editedDataSets[currentDataSet]);
});

class Preset {
    constructor(title, disabledEntries, isDefault) {
        this._title = title;
        this._disabledEntries = disabledEntries;
        this._isDefault = Boolean(isDefault);
    }

    get isDefault() {
        return this._isDefault;
    }

    get domNode() {
        const el = document.createElement('a');

        el.setAttribute('href', '#');
        el.appendChild(document.createTextNode(this._title));
        el.addEventListener('click', this.handleClick.bind(this));

        return el;
    }

    handleClick() {
        resetEditedDataSet();

        for(const i in this._disabledEntries) {
            if (editedDataSets[currentDataSet][this._disabledEntries[i]]) {
                editedDataSets[currentDataSet][this._disabledEntries[i]] = false;
            }
        }

        editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);

        return false;
    }
}

class PresetAll extends Preset {
    constructor(isDefault) {
        super('Выбрать всё', [], isDefault);
    }
}

class PresetWithoutSpecialRolls extends Preset {
    constructor(isDefault) {
        super(
            'Без спецроллов',
            [
                'Чуйка на говно',
                'Выбор Бумера',
                'Выбор Зумера',
                'Чат здесь закон',
                'Я здесь закон',
                'Never Lucky',
            ],
            isDefault
        );
    }
}

class Presets {
    constructor() {
        this._presets = {
             inventory: [
                new PresetAll(),
            ],
            effects: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            debuffs: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            streamers: [
                new PresetAll(),
            ],
        };
    }

    hasPreset(dataSetKey) {
        return !!this._presets[dataSetKey];
    }

    getNodes(dataSetKey) {
        let result = [];

        for(const i in this._presets[dataSetKey]) {
            if (i % 2) {
                result.push(document.createTextNode(', '));
            }
            result.push(this._presets[dataSetKey][i].domNode);
        }

        return result;
    }

    applyDefaults(dataSetKey) {
        for(const i in this._presets[dataSetKey]) {
            if (this._presets[dataSetKey][i].isDefault) {
                this._presets[dataSetKey][i].handleClick();
            }
        }
    }
}

const presets = new Presets;

function getImageURI(index) {
    let result = '../hpg-inventory/images/000.png',
        offset = 0
    ;
    switch (currentDataSet) {
        case "inventory":
        //    offset = 50;
            result = '../images/prikol/'+ dataSets[currentDataSet][index] +'.png';
            break;

        case "effects":
            //result = '../hpg-inventory/images/0' + ('0' + (index+1 + offset)).slice(-2) + '.png';
            //break;
             result = '../images/buffs/'+ dataSets[currentDataSet][index] +'.png';
            break;

        case "debuffs":
            //const mapping = [
            //    1,
            //    2,
            //    7,
            //    10,
            //    12,
            //    13,
            //    16,
            //    18,
            //    20,
            //    21,
            //    22,
            //    23,
            //    26,
            //    25,
            //    31,
            //    44,
            //    48,
            //    49
            //];
            //result = '../hpg-inventory/images/0' + ('0' + (mapping[index])).slice(-2) + '.png';
            //break;
             result = '../images/debuffs/'+ dataSets[currentDataSet][index] +'.png';
            break;

        case "coin":
            result = '../images/coin-obverse-20.png';
            if (index === 1) {
                result = '../images/coin-reverse-20.png';
            }
            if (index === 10) {
                result = '../images/coin-gurt.png';
            }
            break;

        case "streamers":
            result = '../images/streamers/'+ dataSets[currentDataSet][index] +'.png';
            break;
    }

    return result;
}

function getDescriptionURI(index) {
    let result = '../hpg-inventory/desc/000.txt',
        offset = 0
        ;
    switch (currentDataSet) {
        case "inventory":
            //    offset = 50;
            result = '../images/prikol/' + dataSets[currentDataSet][index] + '.txt';
            break;

        case "effects":
            //result = '../hpg-inventory/desc/0' + ('0' + (index+1 + offset)).slice(-2) + '.txt';
            //break;
            result = '../images/buffs/' + dataSets[currentDataSet][index] + '.txt';
            break;

        case "debuffs":
            //const mapping = [
            //    1,
            //    2,
            //    7,
            //    10,
            //    12,
            //    13,
            //    16,
            //    18,
            //    20,
            //    21,
            //    22,
            //    23,
            //    26,
            //    25,
            //    31,
            //    44,
            //    48,
            //    49
            //];
            //result = '../hpg-inventory/desc/0' + ('0' + (mapping[index])).slice(-2) + '.txt';
            //break;
            result = '../images/debuffs/' + dataSets[currentDataSet][index] + '.txt';
            break;

        case "coin":
            result = '../images/coin-obverse-20.txt';
            if (index === 1) {
                result = '../images/coin-reverse-20.txt';
            }
            if (index === 10) {
                result = '../images/coin-gurt.txt';
            }
            break;

        case "streamers":
            result = '../images/streamers/' + dataSets[currentDataSet][index] + '.txt';
            break;
    }

    return result;
}

const p5Instance = new p5(wheelSketch);

p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
        ['videos/БАРБАРИКИ.webm', 40],
        ['videos/Initial D Legend Deja Vu.webm', 129],
        ['videos/standing here, i realize.webm', 23],
        ['videos/Security Guard - Pumped Up Kicks Meme.webm', 10],
        ['videos/Сайтама Фонк для бега.webm', 12],
        ['videos/Initial D AMV - Gas Gas Gas.webm', 75],
        ['videos/popstar.mp4', 8.5],
        ['videos/just a regular crab rave.webm', 109],
        ['videos/Саша Яковлева Эдит.mp4', 9],
        ['videos/LUCY The Perfect Girl.mp4', 10.5],
        ['videos/JOJOS BIZARRE MAKEUP TUTORIAL.webm', 6],
        ['videos/[SFM] Shrekophone.webm', 15],
        ['videos/NOMA - Brain Power.webm', 3],
        ['videos/PHONK DRIFT IN MINECRAFT.webm', 8],
        ['videos/Dancin.webm', 4.1]
        ['videos/Noisestorm - Crab Rave (Official Music Video).webm', p5Instance.random([75, 137])],
        'videos/[Re-upload] [1080p] HONK HONK.webm',
        'videos/CHIKA VIBES   Kaguya-sama Love is War.webm',
        'videos/Танец под волчок из  Что Где Когда.webm',
        'videos/Папич тренит под фонк.webm',
        'videos/СЕЛО РОФЛЯНОВО.webm',
        'videos/Арабское Казино.webm',
        'videos/Jotaro Ocean Man.webm',
        'videos/Йома Хашимото Тренируется.webm',
        'videos/за деньги да.mp4',
        'videos/подлая.webm',
        'videos/06.webm',
        'videos/09.webm',
        'videos/10.webm',
        'videos/cat breakdancing.webm',
        'videos/dance to dead DS.webm',
        'videos/Dante  Heartbeat.webm',
        'videos/dont stop coming.webm',
        'videos/EEEAAAOOO 1.webm',
        'videos/EEEAAAOOO.webm',
        'videos/Forever Spinning.webm',
        'videos/heartbeat.webm',
        'videos/Hocus_Pocus.webm',
        'videos/i like good.webm',
        'videos/John Cena dancing.webm',
        // ВЕРТИКАЛЬНЫЙ'videos/Kiryu 1.webm',
        // ВЕРТИКАЛЬНЫЙ'videos/Kiryu 2.webm',
        'videos/lady.webm',
        'videos/Maxwell Cat.webm',
        'videos/Minecraft Drop Edit 1.webm',
        'videos/Minecraft Drop Edit 2.webm',
        'videos/miss the mom.webm',
        'videos/nacho.webm',
        'videos/Persona 4.webm',
        'videos/Rinder.mp4',
        'videos/Rom and Death.webm',
        'videos/Running in the 90.webm',
        'videos/Sonic Frontiers.webm',
        'videos/There is NO TOMORROW.webm',
        'videos/TOM - GIGA CHAD EDIT.webm',
        'videos/WARNING.webm',
        'videos/Zoolander.webm',
        'videos/Babydoll X The Perfect Girl.webm',
        'videos/the champ.webm',
        'videos/elevator.webm',
    ]);
};

p5Instance.onEnd = (data, selectedKey) => {
    addHistory(`Выпало ${data[selectedKey]} из пресета ${currentDataSet}`);
}

p5Instance.onHelpClick = (data, selectedKey) => {
    const txt = getDescriptionURI(dataSets[currentDataSet].indexOf(data[selectedKey]))
    fetch(txt).then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error(`Ошибка загрузки файла ${txt}`);
    }).then(text => {
        document.querySelector('.help-popup__content').innerHTML = text;
        openHelpPopup();
    })
    .catch(error => {
        alert(`Ошибка загрузки файла ${txt}`);
    })
}

const image = document.querySelector('#item-image img');
p5Instance.onSelectItem = function(data, selectedKey) {
    if (dataSets[currentDataSet]) {
        image.src = getImageURI(dataSets[currentDataSet].indexOf(data[selectedKey]));
    }
    else {
        image.src = '../hpg-inventory/images/000.png';
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
    p5Instance.mouseDragEnable();
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        currentDataSet = this.value;

        if (this.value === 'custom') {
            p5Instance.mouseDragEnable(false);
            customDialog.style.display = 'block';

            return;
        }

        customDialog.style.display = 'none';
        p5Instance.mouseDragEnable();

        if (presets.hasPreset(currentDataSet)) {
            if (!editedDataSets[currentDataSet]) {
                resetEditedDataSet();
                presets.applyDefaults(currentDataSet);
            }

            p5Instance.setData(editedDataToArray());
        }
        else {
            p5Instance.setData(dataSets[currentDataSet]);
        }
    });

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}

document.querySelector('.help-popup__close').addEventListener('click', closeHelpPopup);
