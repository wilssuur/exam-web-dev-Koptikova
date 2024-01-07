let apiKey = 'api_key=b3cd4c4c-4324-454e-a437-942d700bd5ad';
let hostRoutes = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes';

let content = document.querySelector('#routes-list');
let newRoutes = [];
const itemsPerPage = 5;
let currentPage = 1;
let page = 1;

function createListItemElement(record) {
    let itemElement = document.createElement('tr');

    let buttonElement = document.createElement('button');
    let textButton = "Выбрать";
    buttonElement.append(textButton);
    buttonElement.classList.add('px-3', 'py-2', 'border',
        'border-1', 'rounded-2');

    let itemElementId = document.createElement('td');
    itemElementId.classList.add("d-none", "route-id");

    let itemElementName = document.createElement('td');
    itemElementName.classList.add("route-name",);

    let itemElementDesc = document.createElement('td');
    let itemElementObj = document.createElement('td');
    let itemElementButton = document.createElement('td');

    itemElementId.append(record.id);
    itemElementName.append(record.name);
    itemElementDesc.append(record.description);
    itemElementObj.append(record.mainObject);
    itemElementButton.append(buttonElement);

    if (itemElementDesc.innerHTML.length > 140) {
        itemElementDesc.setAttribute('data-bs-toggle', 'tooltip');
        itemElementDesc.setAttribute('title', `${itemElementDesc.innerHTML}`);
        itemElementDesc.innerHTML =
            itemElementDesc.innerHTML.slice(0, 140) + '...';
    }

    if (itemElementObj.innerHTML.length > 140) {
        itemElementObj.setAttribute('data-bs-toggle', 'tooltip');
        itemElementObj.setAttribute('title', `${itemElementObj.innerHTML}`);
        itemElementObj.innerHTML =
            itemElementObj.innerHTML.slice(0, 140) + '...';
    }

    itemElement.append(itemElementId, itemElementName, itemElementDesc,
        itemElementObj, itemElementButton);
    return itemElement;
}

function renderRoutes(records) {
    let routesList = document.querySelector('#routes-list');
    for (let i = 0; i < records.length; i++) {
        routesList.append(createListItemElement(records[i]));
    }
}

function buttonStatesActive() {
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        if (button.innerHTML == currentPage) {
            button.classList.add('active');

        } else {
            button.classList.remove('active');
        }
    });
}

function buttonStatesDisabled(page) {
    let buttonLast = document.getElementById('last');
    let buttonNext = document.getElementById('next');
    let countItems = newRoutes.length;

    if (page == 1 && (page == Math.ceil(countItems / 5))) {
        buttonLast.classList.add('disabled');
        buttonNext.classList.add('disabled');

    } else if (page == 1) {
        buttonLast.classList.add('disabled');
        buttonNext.classList.remove('disabled');

    } else if (page == 24) {
        buttonNext.classList.add('disabled');

    } else if (page == Math.ceil(countItems / 5)) {
        buttonLast.classList.remove('disabled');
        buttonNext.classList.add('disabled');
        console.log('page = math');

    } else {
        buttonLast.classList.remove('disabled');
        buttonNext.classList.remove('disabled');
    }
}

function lastGroupButtons() {
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        button.classList.remove('d-none');
        button.innerHTML = Number(button.innerHTML) - 5;
    });
}

function nextGroupButtons() {
    let items;
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    if (document.querySelector('#search-field').value == '') {
        items = Array.from(content.getElementsByTagName('tr'));
        
    } else {
        items = newRoutes;
    }

    let startIndex = currentPage * itemsPerPage;
    let countItems = items.slice(startIndex).length;

    pageButtons.forEach((button, index) => {
        if ((index + 1) > Math.ceil(countItems / 5)) {
            button.classList.add('d-none');
        }
        button.innerHTML = Number(button.innerHTML) + 5;
    });
}

function pageBtnHandler(event) {

    let items = Array.from(content.getElementsByTagName('tr'));
    let page = event.target.innerHTML;

    if (page == '›') {
        if (currentPage % 5 == 0) {
            nextGroupButtons();
        }
        currentPage = currentPage + 1;

    } else if (page == '‹') {
        if ((currentPage - 1) % 5 == 0) {
            lastGroupButtons();
        }
        currentPage = currentPage - 1;

    } else if (Number(page)) {
        currentPage = Number(page);
    }

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    if (document.querySelector('#search-field').value == '') {
        items.forEach((item, index) => {
            item.classList.toggle('d-none', index < startIndex
                || index >= endIndex);
        });

    } else {
        newRoutes.forEach((item, index) => {
            item.classList.toggle('d-none', index < startIndex
                || index >= endIndex);
        });
    }

    buttonStatesDisabled(currentPage);
    buttonStatesActive();

}

function showItems(items) {
    newRoutes = [];
    items.forEach((item) => {
        if (item.className != 'd-none') {
            newRoutes.push(item);
        }
    });

    let startIndex = 0;
    let endIndex = startIndex + itemsPerPage;
    newRoutes.forEach((item, index) => {
        item.classList.toggle('d-none', index < startIndex
            || index >= endIndex);
    });

    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    let countItems = newRoutes.length;
    pageButtons.forEach((button, index) => {
        if ((index + 1) > Math.ceil(countItems / 5)) {
            button.classList.add('d-none');
        } else {
            button.classList.remove('d-none');
        }
    });
    buttonStatesDisabled(currentPage);
    buttonStatesActive();
}

function searchHandler() {
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        button.innerHTML = index + 1;
    });
    currentPage = 1;
    let searchText = document.querySelector('#search-field').value;
    let items = Array.from(content.getElementsByTagName('tr'));

    if (searchText == '') {
        let pageButtons = document.querySelectorAll('.pagination li span');
        pageButtons = Array.from(pageButtons).splice(1, 5);

        pageButtons.forEach((button) => {
            button.classList.remove('d-none');
        });

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;

        items.forEach((item, index) => {
            item.classList.toggle('d-none', index < startIndex
                || index >= endIndex);
        });
        buttonStatesDisabled(currentPage);
        buttonStatesActive();

    } else {
        items.forEach((item) => {
            let itemName =
                item.querySelector('.route-name').innerHTML.toLowerCase();
            if (!(itemName.includes(searchText.toLowerCase()))) {
                item.classList.add('d-none');
            } else {
                item.classList.remove('d-none');
            }
        });
        showItems(items);
    }
}

async function LoadStorage() {
    let urlRoutes = `${hostRoutes}?${apiKey}`;
    let url = new URL(urlRoutes);

    let response = await fetch(url);
    let result = await response.json();
    renderRoutes(result);

    let items = Array.from(content.getElementsByTagName('tr'));
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        item.classList.toggle('d-none', index < startIndex
            || index >= endIndex);
    });
    let buttonLast = document.getElementById('last');
    buttonLast.classList.add('disabled');
}

window.onload = function () {
    LoadStorage();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('#search-field').oninput = searchHandler;
};