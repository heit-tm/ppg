'use strict';

let cells = [],
    cellsMargin
;
const EFFECT_TYPES = {
    NONE: 'NONE',
    BUFF: 'BUFF',
    DEBUFF: 'DEBUFF',
    TARGET_TRAP: 'TARGET_TRAP',
    NONTARGET_TRAP: 'NONTARGET_TRAP',
    SPECIFIC_WHEEL_ROLL: 'SPECIFIC_WHEEL_ROLL',
    FOOD: 'FOOD'
};
const items = [
    {
        img: 'images/000.png',
        title: 'Пустая ячейка',
        type: EFFECT_TYPES.NONE,
    },
    {
        img: '../images/prikol/ВзрывОчка.png',
        title: 'ВзрывОчка',
    },
    {
        img: '../images/prikol/Сраное колдунье.png',
        title: 'Сраное колдунье',
    },
    {
        img: '../images/prikol/Ультрамошна.png',
        title: 'Ультрамошна',
    },  
    {
        img: '../images/prikol/Обмен.png',
        title: 'Обмен',
    }, 
    {
        img: '../images/prikol/Дроп Дропыч.png',
        title: 'Дроп Дропыч',
    }, 
    {
        img: '../images/prikol/Облезлая крыса.png',
        title: 'Облезлая крыса',
    }, 
    {
        img: '../images/prikol/Робин Гуд.png',
        title: 'Робин Гуд',
    },   
    {
        img: '../images/prikol/Хакер.png',
        title: 'Хакер',
    },   


    {
        img: '../images/prikol/У вас есть 1 минута.png',
        title: 'У вас есть 1 минута',
    },
    {
        img: '../images/prikol/Жесткая заруба.png',
        title: 'Жесткая заруба',
    },
    {
        img: '../images/prikol/Мощный бросок.png',
        title: 'Мощный бросок',
    },
    {
        img: '../images/prikol/Слабый бросок.png',
        title: 'Слабый бросок',
    },
    {
        img: '../images/prikol/Сорокалетний девственник.png',
        title: 'Сорокалетний девственник',
    },
    {
        img: '../images/prikol/Руки-крюки.png',
        title: 'Руки-крюки',
    },
    {
        img: '../images/prikol/Воля случая.png',
        title: 'Воля случая',
    },
    {
        img: '../images/prikol/Сужающееся колесо Фландерса.png',
        title: 'Сужающееся колесо Фландерса',
    },
    {
        img: '../images/prikol/Случай на Геймгаунтлете.png',
        title: 'Случай на Геймгаунтлете',
    },
    {
        img: '../images/prikol/Стример не тупой.png',
        title: 'Стример не тупой',
    },
    {
        img: '../images/prikol/Помощь отстающему.png',
        title: 'Помощь отстающему',
    },
    {
        img: '../images/prikol/Удачный неудачник.png',
        title: 'Удачный неудачник',
    },
    {
        img: '../images/prikol/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: '../images/prikol/Второй шанс.png',
        title: 'Второй шанс',
    },
    {
        img: '../images/prikol/Неизвестная фласка.png',
        title: 'Неизвестная фласка',
    },
    {
        img: '../images/prikol/Моя остановочка.png',
        title: 'Моя остановочка',
    },
    {
        img: '../images/prikol/Дуэль.png',
        title: 'Дуэль',
    },
    {
        img: '../images/prikol/Че умный, да.png',
        title: 'Че умный, да',
    },
    {
        img: '../images/prikol/Ебанный рот этого казино.png',
        title: 'Ебанный рот этого казино',
    },
    {
        img: '../images/prikol/Не добежал.png',
        title: 'Не добежал',
    },
    {
        img: '../images/prikol/Мастер Предикта.png',
        title: 'Мастер Предикта',
    },
    
];
let selectedCellKey = false;

const inventory = $('.inventory'),
    cellTemplate = $('<div><div class="cell"><img/></div></div>'),
    controlDelete = $('<a/>', {
        text: '×',
        title: 'Удалить ячейку',
        class: 'remove',
        href: '#',
        click: function () {
            const $cell = $(this).closest('.cell').parent(),
                idx = $cell.index();

            delete cells[idx];
            cells.splice(idx, 1);

            $cell.find(cellControlsTemplate).detach();
            $cell.remove();
            saveState();

            return false;
        }
    }),
    cellControlsTemplate = $('<div class="controls"></div>')
        .append(controlDelete)
    ,
    addCell = function (triggerClick=false) {
        const newCell = cellTemplate.clone();
        inventory.append(newCell);

        newCell.on('click', cellOnClick);
        newCell.on('mouseenter', cellOnHover);
        newCell.on('mouseleave', function () {
            $(this).find(cellControlsTemplate).detach()
        });

        if (triggerClick) {
            newCell.trigger('click');
        }
    },
    cellUpdateDOM = function (key) {
        if (!cells[key] || !cells[key].item) {
            return
        }

        const $cell = inventory.find('.cell').eq(key);

        $('img', $cell).attr({
            src: cells[key].item.img,
            title: cells[key].item.title
        });

        const cellType = cells[key].item.type ? cells[key].item.type : EFFECT_TYPES.NONE;
        $cell.parent().attr("class", cellType);
    },
    selectCell = function (key) {
        selectedCellKey = key;

        const cells = $('.cell', inventory)
            .removeClass('active');

        if (typeof(key) === "number") {
            cells.eq(key).addClass('active');
        }
    },
    cellOnClick = function () {
        const $cell = $(this),
            currIndex = $cell.index()
        ;
        if (selector.is(':visible')) {
            if (selectedCellKey === currIndex) {
                selector.hide();
                selectCell(false);
            }
            else {
                selectCell(currIndex);
            }
        }
        else {
            selector.show();
            selectCell(currIndex);
        }
    },
    addCellOnClick = function () {
        cells.push({});
        addCell(true);
        saveState();
    },
    cellOnHover = function () {
        $('.cell', this).append(cellControlsTemplate);
    },
    setCellMargin = function (number) {
        cellsMargin = number;
        document.documentElement.style.setProperty('--cell-margin-left', number + 'px');
    },
    createCells = function (cellsArray) {
        for (let i in cellsArray) {
            addCell();
            cellUpdateDOM(i);
        }
    },
    getStorageKeySuffix = function () {
        return location.search.substring(1, 20);
    },
    saveState = function () {
        const data = {
            cells,
            cellsMargin
        };

        localStorage.setItem('effects-' + getStorageKeySuffix(), JSON.stringify(data));
    },
    loadState = function () {
        let data;

        try {
            data = JSON.parse(localStorage.getItem('effects-' + getStorageKeySuffix()));
        } catch (e) {
            console.error('Loading state', e);
        }

        if (!data || !data.cells) {
            data = {
                cellsMargin: -14,
                cells: [
                    {},
                ]
            };
        }

        ({cells, cellsMargin} = data);
    },
    selector = $('.selector'),
    selectorOnClick = function () {
        const $itemKey = $(this).data('key');

        cells[selectedCellKey] = {
            item: items[$itemKey],
        };
        cellUpdateDOM(selectedCellKey);

        saveState();
        selectCell(false);
        selector.hide();
    },
    createSelector = function(items) {
        const list = $('ul', selector);
        for(let i in items) {
            list.append(
                $('<li/>', {
                    'data-key': i,
                    html: $('<img/>', {
                        src: items[i].img,
                        title: items[i].title
                    }),
                    click: selectorOnClick
                })
            )
        }
    },
    loadMarginState = function () {
        if (/^[-\d]+$/.test(cellsMargin)) {
            setCellMargin(cellsMargin);
            $('#cell-left-margin').val(cellsMargin);
        }
    }
;

$('.add-cell').on('click', addCellOnClick);

$('#cell-left-margin').on('change', function () {
    setCellMargin($(this).val());
    saveState()
});

loadState();

console.log(cells);

loadMarginState();
createCells(cells);
createSelector(items);

