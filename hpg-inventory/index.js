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
        img: 'inventory/Читерский кубик.png',
        title: 'Читерский кубик',
    },
    {
        img: 'inventory/Кубик хуюбика.png',
        title: 'Кубик хуюбика',
    },
    {
        img: 'inventory/Очки EZ.png',
        title: 'Очки EZ',
        count: 2,
    },
    {
        img: 'inventory/Повязка Рэмбо.png',
        title: 'Повязка Рэмбо',
        count: 2,
    },
    {
        img: 'inventory/Шар всезнания.png',
        title: 'Шар всезнания',
    },
    {
        img: 'inventory/Корона короля Рандома.png',
        title: 'Корона короля Рандома',
    },
    {
        img: 'inventory/Взрывчатка.png',
        title: 'Взрывчатка',
        count: 2,
    },
    {
        img: 'inventory/Ремонтный набор.png',
        title: 'Ремонтный набор',
    },
    {
        img: 'inventory/Красочная манга.png',
        title: 'Красочная манга',
    },
    {
        img: 'inventory/Реверсивные сапоги.png',
        title: 'Реверсивные сапоги',
    },
    {
        img: 'inventory/Хидден гем.png',
        title: 'Хидден гем',
    },
    {
        img: 'inventory/Щит.png',
        title: 'Щит',
    },
    {
        img: 'inventory/Кукла вуду.png',
        title: 'Кукла вуду',
    },
    {
        img: 'inventory/Хани принтер.png',
        title: 'Хани принтер',
    },
    {
        img: 'inventory/Наперсток.png',
        title: 'Наперсток',
        count: 3,
    },
    {
        img: 'inventory/Дротик с ядом.png',
        title: 'Дротик с ядом',
    },
    {
        img: 'inventory/Трос.png',
        title: 'Трос',
    },
    {
        img: 'inventory/Противоядие.png',
        title: 'Противоядие',
    },
    {
        img: 'inventory/Наглый чаттерс.png',
        title: 'Наглый чаттерс',
    },
    {
        img: 'inventory/Неебические часы.png',
        title: 'Неебические часы',
    },
    {
        img: 'inventory/Рука Мидаса.png',
        title: 'Рука Мидаса',
    },
    {
        img: 'inventory/Ржавый капкан.png',
        title: 'Ржавый капкан',
    },
    {
        img: 'inventory/Горячая картошка.png',
        title: 'Горячая картошка',
        count: 3,
    },
    {
        img: 'inventory/Портянки-невидимки.png',
        title: 'Портянки-невидимки',
        count: 2,
    },
    {
        img: 'inventory/Странные ягоды.png',
        title: 'Странные ягоды',
    },
    {
        img: 'inventory/Яша.png',
        title: 'Яша',
    },
    {
        img: 'inventory/Лава.png',
        title: 'Лава',
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

