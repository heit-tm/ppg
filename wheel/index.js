/*
 * Copyright (c) 2020. shtrih
 */

const helpPopup = document.querySelector('.help-popup');
function closeHelpPopup() {
    helpPopup.style.display = 'none';
}

function openHelpPopup() {
    helpPopup.style.display = 'block';
}

const dataSets = {
    inventory: [
        '+250 бб',
        'SHIZA',
        'А где это я',
        'А может я решу',
        'Аптечка',
        'Ахуеть-жесть',
        'Благотворительность',
        'ВзрывОчка',
        'Взрывчатка',
        'ВоКАЛлист',
        'Воля случая',
        'Все херня, давай по новой',
        'Второй шанс',
        'Говно-аукцион',
        'Грязнулькин',
        'Два по цене одного',
        'Жесткая заруба',
        'Заначка Старыги',
        'Землетрясение',
        'Извини что трахнул',
        'Интрига',
        'Корона короля пресетов',
        'Красочная манга',
        'Крышка от мусорного бака',
        'Кубик хуюбика',
        'Кубик-бубик',
        'Кубик-уёбик',
        'Кукла вуду',
        'Минутка спорта',
        'Мощный бросок',
        'Облизанный ободок унитаза',
        'Обмен',
        'Однорукий бандит',
        'Ой, извините',
        'Очки EZ',
        'Пиздец-ебать',
        'Пластилин',
        'По магазинам с чатом',
        'Повязка Рэмбо',
        'Погреб Багика',
        'Помощь отстающему',
        'Пора кричать',
        'Потерянный дред Латте',
        'Реверсивные сапоги',
        'Ремонтный набор',
        'Рокировочка',
        'Руки-крюки',
        'Свиток реролла',
        'Слабый бросок',
        'Случай на Геймгаунтлете',
        'Сорокалетний девственник',
        'Сраное колдунье',
        'Стример не тупой',
        'Стример стул',
        'Сужающееся колесо Фландерса',
        'Телепорт',
        'У вас есть 1 минута',
        'Удачный неудачник',
        'Улыбка Гигачада',
        'Ультрамошна',
        'Хани принтер',
        'Читерский кубик',
        'Шар всезнания',
        'Я ТУТ СТРИМАК',

    ],
    effects: [
        'Ахуеть-жесть',
        'Все херня, давай по новой',
        'Второй шанс',
        'Два по цене одного',
        'Жесткая заруба',
        'Корона короля пресетов',
        'Красочная манга',
        'Крышка от мусорного бака',
        'Кубик-бубик',
        'Кукла вуду',
        'Мощный бросок',
        'Очки EZ',
        'Пластилин',
        'Ремонтный набор',
        'Рокировочка',
        'Свиток реролла',
        'Сорокалетний девственник',
        'Телепорт',
        'Удачный неудачник',
        'Улыбка Гигачада',
        'Хани принтер',
        'Читерский кубик',
        'Шар всезнания',
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
    ],
    debuffs: [
        'Благотворительность',
        'Взрывчатка',
        'Грязнулькин',
        'Два по цене одного',
        'Извини что трахнул',
        'Кубик хуюбика',
        'Кубик-уёбик',
        'Пиздец-ебать',
        'Повязка Рэмбо',
        'Потерянный дред Латте',
        'Реверсивные сапоги',
        'Руки-крюки',
        'Слабый бросок',
    ]
};
let currentDataSet = 'inventory',
    editedDataSets = {};

const editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    optionClick = function (option, checked) {
        editedDataSets[currentDataSet][option] = checked;
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
            // inventory: [
            //     new PresetAll(),
            // ],
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
        ['videos/НЕ ГРАЖДАНИН.webm', 29],
        ['videos/AssClap.webm', 61],
        ['videos/popstar.mp4', 8.5],
        ['videos/JOJOS BIZARRE MAKEUP TUTORIAL.webm', 6],
        ['videos/[SFM] Shrekophone.webm', 15],
        ['videos/NOMA - Brain Power.webm', 3],
        ['videos/PHONK DRIFT IN MINECRAFT.webm', 8],
        ['videos/All Star but they dont stop coming pitch corrected.webm', 20],
        ['videos/Noisestorm - Crab Rave (Official Music Video).webm', p5Instance.random([75, 137])],
        'videos/[Re-upload] [1080p] HONK HONK.webm',
        'videos/CHIKA VIBES   Kaguya-sama Love is War.webm',
        'videos/best Chika meme ever   anime characters in Chika dance MV.webm',
        'videos/Танец под волчок из  Что Где Когда.webm',
        'videos/Папич тренит под фонк.webm',
        'videos/мужик танцует.webm',
        'videos/СЕЛО РОФЛЯНОВО.webm',
        'videos/Арабское Казино.webm',
        'videos/Jotaro Ocean Man.webm',
        'videos/Йома Хашимото Тренируется.webm',
        'videos/за деньги да.mp4',
        'videos/подлая.webm',
        'videos/04.webm',
        'videos/06.webm',
        'videos/08.webm',
        'videos/09.webm',
        'videos/10.webm',
    ]);
};

p5Instance.onEnd = (data, selectedKey) => {
    // Вот тут будет код который будет выполняться после окончания вращения
}

p5Instance.onHelpClick = (data, selectedKey) => {
    // Вот тут будет код который будет выполняться после окончания вращения
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
            editButton.removeAttribute('disabled');
        }
        else {
            p5Instance.setData(dataSets[currentDataSet]);
            editButton.setAttribute('disabled', 'disabled');
        }
    });

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}

document.querySelector('.help-popup__close').addEventListener('click', closeHelpPopup);