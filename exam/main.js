let apiKey = 'api_key=b3cd4c4c-4324-454e-a437-942d700bd5ad';
let hostRoutes = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes';

const content = document.querySelector('.content');
const itemsPerPage = 5;
let currentPage = 1;
let page = 1;

function createListItemElement(record) {
    let itemElement = document.createElement('tr');

    let buttonElement = document.createElement('button');
    let textButton = "Выбрать";
    buttonElement.append(textButton);
    buttonElement.classList.add('px-4', 'py-2', 'border',
        'border-2', 'rounded-2');


    let itemElementId = document.createElement('td');
    itemElementId.classList.add("d-none", "id-route");

    let itemElementName = document.createElement('td');
    let itemElementDesc = document.createElement('td');
    let itemElementObj = document.createElement('td');
    let itemElementButton = document.createElement('td');

    itemElementId.append(record.id);
    itemElementName.append(record.name);
    itemElementDesc.append(record.description);
    itemElementObj.append(record.mainObject);
    itemElementButton.append(buttonElement);

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
        console.log(button.innerHTML, currentPage);
        if (button.innerHTML == currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function buttonStatesDisabled(page) {
    let buttonLast = document.getElementById('last');
    if (page == 1) {
        buttonLast.classList.add('disabled');
    } else {
        buttonLast.classList.remove('disabled');
    }
}

function lastGroupButtons() {
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);
    pageButtons.forEach((button, index) => {
        button.innerHTML = Number(button.innerHTML) - 5;
    });
}

function nextGroupButtons() {
    let pageButtons = document.querySelectorAll('.pagination li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);
    pageButtons.forEach((button, index) => {
        button.innerHTML = Number(button.innerHTML) + 5;
    });
}

function pageBtnHandler(event) {
    let items = Array.from(content.getElementsByTagName('tr'));
    let page = event.target.innerHTML;

    if (page == 'Следующая') {
        if (currentPage % 5 == 0) {
            nextGroupButtons();
        }
        currentPage = currentPage + 1;

    } else if (page == 'Предыдущая') {
        if ((currentPage - 1) % 5 == 0) {
            lastGroupButtons();
        }
        currentPage = currentPage - 1;

    } else if (page) {
        currentPage = Number(page);
    }
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
        item.classList.toggle('d-none', index < startIndex
            || index >= endIndex);
    });
    buttonStatesDisabled(currentPage);
    buttonStatesActive();

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
};