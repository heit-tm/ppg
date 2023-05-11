'use strict';

let cells = [];
const items = [
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/Пластилин.png',
        title: 'Пластилин',
    },
    {
        img: 'inventory/062.png',
        title: 'ВзрывОчка',
    },
    {
        img: 'inventory/063.png',
        title: 'Сраное колдунье',
    },
    {
        img: 'inventory/064.png',
        title: 'Ультрамошна',
    },  
    {
        img: 'inventory/Обмен.png',
        title: 'Обмен',
    }, 
    {
        img: 'inventory/Дроп Дропыч.png',
        title: 'Дроп Дропыч',
    }, 
    {
        img: 'inventory/Облезлая крыса.png',
        title: 'Облезлая крыса',
    }, 
    {
        img: 'inventory/Робин Гуд.png',
        title: 'Робин Гуд',
    },   
    {
        img: 'inventory/Хакер.png',
        title: 'Хакер',
    },   
    {
        img: 'inventory/У вас есть 1 минута.png',
        title: 'У вас есть 1 минута',
    },
    {
        img: 'inventory/Жесткая заруба.png',
        title: 'Жесткая заруба',
    },
    {
        img: 'inventory/Телепорт.png',
        title: 'Телепорт',
    },
    {
        img: 'inventory/Мощный бросок.png',
        title: 'Мощный бросок',
    },
    {
        img: 'inventory/Слабый бросок.png',
        title: 'Слабый бросок',
    },
    {
        img: 'inventory/Сорокалетний девственник.png',
        title: 'Сорокалетний девственник',
    },
    {
        img: 'inventory/Руки-крюки.png',
        title: 'Руки-крюки',
    },
    {
        img: 'inventory/Интрига.png',
        title: 'Интрига',
    },
    {
        img: 'inventory/ва по цене одного.png',
        title: 'Два по цене одного',
    },
    {
        img: 'inventory/По магазинам с чатом.png',
        title: 'По магазинам с чатом',
    },
    {
        img: 'inventory/Однорукий бандит.png',
        title: 'Однорукий бандит',
    },
    {
        img: 'inventory/Грязнулькин.png',
        title: 'Грязнулькин',
    },
    {
        img: 'inventory/Рокировочка.png',
        title: 'Рокировочка',
    },
    {
        img: 'inventory/Все херня, давай по новой.png',
        title: 'Все херня, давай по новой',
    },
    {
        img: 'inventory/Погреб Багика.png',
        title: 'Погреб Багика',
    },
    {
        img: 'inventory/Заначка Старыги.png',
        title: 'Заначка Старыги',
    },
    {
        img: 'inventory/Воля случая.png',
        title: 'Воля случая',
    },
    {
        img: 'inventory/Случай на Геймгаунтлете.png',
        title: 'Случай на Геймгаунтлете',
    },
    {
        img: 'inventory/Благотворительность.png',
        title: 'Благотворительность',
    },
    {
        img: 'inventory/Стример не тупой.png',
        title: 'Стример не тупой',
    },
    {
        img: 'inventory/Помощь отстающему.png',
        title: 'Помощь отстающему',
    },
    {
        img: 'inventory/Удачный неудачник.png',
        title: 'Удачный неудачник',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Второй шанс.png',
        title: 'Второй шанс',
    },
    {
        img: 'inventory/А где это я.png',
        title: 'А где это я',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    {
        img: 'inventory/Аптечка.png',
        title: 'Аптечка',
    },
    // {
    //     img: 'inventory/060.png',
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

