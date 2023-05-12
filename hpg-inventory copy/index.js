'use strict';

let cells = [];
const items = [
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
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
    // {
    //     img: '../images/prikol/060.png',
    //     title: 'Ой, извините',
    //     isNotSlot: true,
    // },

];
let selectedCellKey = false;

const inventory = $('.inventory'),
    cellTemplate = $('<div class="cell"><img/><div class="count">1</div></div>'),
    controlIncrementCounter = $('<a/>', {
        text: '+',
        title: 'Увеличить кол-во зарядов/прочность',
        class: 'inc',
        href: '#',
        click: function () {
            const idx = $(this).closest('.cell').index();

            if (cells[idx].count) {
                cells[idx].count += 1;
            }
            else {
                cells[idx].count = 2;
            }
            cellUpdateDOM(idx);
            saveState(cells);

            return false;
        }
    }),
    controlDecrementCounter = $('<a/>', {
        text: '–',
        title: 'Уменьшить кол-во зарядов/прочность',
        class: 'dec',
        href: '#',
        click: function () {
            const idx = $(this).closest('.cell').index();

            if (cells[idx].count && cells[idx].count > 1) {
                cells[idx].count -= 1;
            }
            // кончились заряды
            else if (cells[idx].count === 1) {
                // пустая ячейка
                cells[idx].item = items[0]
            }
            cellUpdateDOM(idx);
            saveState(cells);

            return false;
        }
    }),
    controlInvert = $('<a/>', {
        text: '↑',
        title: 'Инвертировать',
        class: 'inversion',
        href: '#',
        click: function () {
            const idx = $(this).closest('.cell').index();

            cells[idx].inverted = !cells[idx].inverted;
            cellUpdateDOM(idx);
            saveState(cells);

            return false;
        }
    }),
    controlNotSlot = $('<input/>', {
        type: 'checkbox',
        title: 'Предмет, не занимающий слот в инвентаре',
        click: function (e) {
            e.stopPropagation();

            const idx = $(this).closest('.cell').index();

            cells[idx].isNotSlot = $(this).is(':checked');
            cellUpdateDOM(idx);
            saveState(cells);
        }
    }),
    controlDelete = $('<a/>', {
        text: '×',
        title: 'Удалить ячейку',
        class: 'remove',
        href: '#',
        click: function () {
            const $cell = $(this).closest('.cell'),
                idx = $cell.index();

            delete cells[idx];
            cells.splice(idx, 1);

            $cell.find(cellControlsTemplate).detach();
            $cell.remove();
            saveState(cells);

            return false;
        }
    }),
    cellControlsTemplate = $('<div class="controls"></div>')
        .append(controlDecrementCounter)
        .append(controlIncrementCounter)
        .append(controlInvert)
        .append(controlNotSlot)
        .append(controlDelete)
    ,
    addCell = function () {
        const newCell = cellTemplate.clone();
        inventory.append(newCell);
        $('.count', newCell).hide();

        newCell.on('click', cellOnClick);
        newCell.on('mouseenter', cellOnHover);
        newCell.on('mouseleave', function () {
            $(this).find(cellControlsTemplate).detach()
        });
    },
    cellUpdateDOM = function (key) {
        if (!cells[key] || !cells[key].item) {
            return
        }

        const $cell = inventory.children('.cell').eq(key);

        $('img', $cell).attr({
            src: cells[key].item.img,
            title: cells[key].item.title
        });

        if (cells[key].count && cells[key].count > 1) {
            $('.count', $cell).show()
        }
        else {
            $('.count', $cell).hide()
        }
        $('.count', $cell).text(cells[key].count);

        if (cells[key].isNotSlot) {
            $cell.addClass('not-slot');
        }
        else {
            $cell.removeClass('not-slot');
        }

        if (cells[key].inverted) {
            $('img', $cell).addClass('inverted');
        }
        else {
            $('img', $cell).removeClass('inverted');
        }
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
        addCell();
        saveState(cells);
    },
    cellOnHover = function () {
        const idx = $(this).index();

        controlNotSlot.prop('checked', Boolean(cells[idx].isNotSlot));

        $(this).append(cellControlsTemplate);
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
    saveState = function (cellsArray) {
        localStorage.setItem('inventory-' + getStorageKeySuffix(), JSON.stringify(cellsArray));
    },
    loadState = function () {
        let result = [];

        try {
            result = JSON.parse(localStorage.getItem('inventory-' + getStorageKeySuffix()));
        } catch (e) {
            console.error('Loading state', e);
        }

        if (!result || !result.length) {
            result = [
                {},
                {},
                {},
            ];
        }

        return result;
    },
    selector = $('.selector'),
    selectorOnClick = function () {
        const $itemKey = $(this).data('key');

        cells[selectedCellKey] = {
            item: items[$itemKey],
            count: items[$itemKey].count || 1,
            isNotSlot: items[$itemKey].isNotSlot || false
        };
        cellUpdateDOM(selectedCellKey);

        saveState(cells);
        selectCell(false);
        selector.hide();
    },
    createSelector = function(items) {
        const list = $('ul', selector);
        for(let i in items) {
            list.append(
                $('<li/>', {
                    ['data-key']: i,
                    html: $('<img/>', {
                        src: items[i].img,
                        title: items[i].title
                    }),
                    click: selectorOnClick
                })
            )
        }
    }
;

$('.add-cell').on('click', addCellOnClick);

cells = loadState();
console.log(cells);
createCells(cells);
createSelector(items);

