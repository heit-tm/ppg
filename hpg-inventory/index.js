'use strict';

let cells = [];
const items = [
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/001.png',
        title: 'Кубик-бубик',
        count: 1,
    },
    {
        img: 'inventory/002.png',
        title: 'Кубик-уёбик',
    },
    {
        img: 'inventory/003.png',
        title: 'Улыбка Гигачада',
    },
    {
        img: 'inventory/004.png',
        title: 'Пластилин',
    },
    {
        img: 'inventory/005.png',
        title: 'Читерский кубик',
    },
    {
        img: 'inventory/006.png',
        title: 'Кубик хуюбика',
    },
    {
        img: 'inventory/007.png',
        title: 'Очки EZ',
    },
    {
        img: 'inventory/008.png',
        title: 'Повязка Рэмбо',
    },
    {
        img: 'inventory/009.png',
        title: 'Свиток реролла',
    },
    {
        img: 'inventory/010.png',
        title: 'Шар всезнания',
    },
    {
        img: 'inventory/011.png',
        title: 'Корона короля пресетов',
    },
    {
        img: 'inventory/012.png',
        title: 'Взрывчатка',
        count: 2,
    },
    {
        img: 'inventory/013.png',
        title: 'Ремонтный набор',
    },
    {
        img: 'inventory/014.png',
        title: 'Красочная манга',
    },
    {
        img: 'inventory/015.png',
        title: 'Облизанный ободок унитаза',
    },
    {
        img: 'inventory/016.png',
        title: 'Реверсивные сапоги',
    },
    {
        img: 'inventory/017.png',
        title: 'Потерянный дред Латте',
    },
    {
        img: 'inventory/018.png',
        title: 'Крышка от мусорного бака',
    },
    {
        img: 'inventory/019.png',
        title: 'Кукла вуду',
    },
    {
        img: 'inventory/020.png',
        title: 'Хани принтер',
    },
    {
        img: 'inventory/062.png',
        title: 'ВзрывОчка',
        isNotSlot: true,
    },
    {
        img: 'inventory/063.png',
        title: 'Сраное колдунье',
        isNotSlot: true,
    },
    {
        img: 'inventory/064.png',
        title: 'Ультрамошна',
        isNotSlot: true,
    },    
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'inventory/021.png',
        title: 'Говно-аукцион',
        isNotSlot: true,
    },
    {
        img: 'inventory/022.png',
        title: 'У вас есть 1 минута',
        isNotSlot: true,
    },
    {
        img: 'inventory/023.png',
        title: 'Пора кричать',
        isNotSlot: true,
    },
    {
        img: 'inventory/024.png',
        title: 'А может я решу',
        isNotSlot: true,
    },
    {
        img: 'inventory/025.png',
        title: 'SHIZA',
        isNotSlot: true,
    },
    {
        img: 'inventory/026.png',
        title: 'Минутка спорта',
        isNotSlot: true
    },
    {
        img: 'inventory/027.png',
        title: 'Стример стул',
        isNotSlot: true,
    },
    {
        img: 'inventory/028.png',
        title: 'Жесткая заруба',
        isNotSlot: true,
    },
    {
        img: 'inventory/029.png',
        title: 'Ремонтный набор',
        isNotSlot: true,
    },
    {
        img: 'inventory/030.png',
        title: 'ВоКАЛлист',
        isNotSlot: true,
    },
    {
        img: 'inventory/031.png',
        title: 'Телепорт',
        isNotSlot: true,
    },
    {
        img: 'inventory/032.png',
        title: 'Пиздец-ебать',
        isNotSlot: true,
    },
    {
        img: 'inventory/033.png',
        title: 'Ахуеть-жесть',
        isNotSlot: true,
    },
    {
        img: 'inventory/034.png',
        title: 'Землетрясение',
        isNotSlot: true,
    },
    {
        img: 'inventory/035.png',
        title: 'Я ТУТ СТРИМАК',
        isNotSlot: true,
    },
    {
        img: 'inventory/036.png',
        title: 'Мощный бросок',
        isNotSlot: true,
    },
    {
        img: 'inventory/037.png',
        title: 'Слабый бросок',
        isNotSlot: true,
    },
    {
        img: 'inventory/038.png',
        title: 'Сорокалетний девственник',
        isNotSlot: true,
    },
    {
        img: 'inventory/039.png',
        title: 'Руки-крюки',
        isNotSlot: true,
    },
    {
        img: 'inventory/040.png',
        title: 'Интрига',
        isNotSlot: true,
    },
    {
        img: 'inventory/041.png',
        title: 'Два по цене одного',
        isNotSlot: true,
    },
    {
        img: 'inventory/042.png',
        title: 'По магазинам с чатом',
        isNotSlot: true,
    },
    {
        img: 'inventory/043.png',
        title: 'Однорукий бандит',
        isNotSlot: true,
    },
    {
        img: 'inventory/044.png',
        title: 'Грязнулькин',
        isNotSlot: true,
    },
    {
        img: 'inventory/045.png',
        title: 'Рокировочка',
        isNotSlot: true
    },
    {
        img: 'inventory/046.png',
        title: 'Все херня, давай по новой',
        isNotSlot: true,
    },
    {
        img: 'inventory/047.png',
        title: 'Погреб Багика',
        isNotSlot: true,
    },
    {
        img: 'inventory/048.png',
        title: 'Заначка Старыги',
        isNotSlot: true,
    },
    {
        img: 'inventory/049.png',
        title: 'Воля случая',
        isNotSlot: true,
    },
    {
        img: 'inventory/050.png',
        title: 'Обмен',
        isNotSlot: true,
    },
    {
        img: 'inventory/051.png',
        title: 'Случай на Геймгаунтлете',
        isNotSlot: true,
    },
    {
        img: 'inventory/052.png',
        title: 'Благотворительность',
        isNotSlot: true,
    },
    {
        img: 'inventory/053.png',
        title: 'Стример не тупой',
        isNotSlot: true,
    },
    {
        img: 'inventory/054.png',
        title: 'Извини что трахнул',
        isNotSlot: true,
    },
    {
        img: 'inventory/055.png',
        title: 'Помощь отстающему',
        isNotSlot: true,
    },
    {
        img: 'inventory/056.png',
        title: 'Удачный неудачник',
        isNotSlot: true,
    },
    {
        img: 'inventory/057.png',
        title: 'Аптечка',
        isNotSlot: true,
    },
    {
        img: 'inventory/058.png',
        title: 'Второй шанс',
        isNotSlot: true,
    },
    {
        img: 'inventory/059.png',
        title: 'А где это я',
        isNotSlot: true,
    },
    {
        img: 'inventory/060.png',
        title: 'Ой, извините',
        isNotSlot: true,
    },
    {
        img: 'inventory/061.png',
        title: 'Сужающееся колесо Фландерса',
        isNotSlot: true,
    },


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

