let apiKey = 'api_key=b3cd4c4c-4324-454e-a437-942d700bd5ad';
let hostRoutes = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes';

let tableRoutesContent = document.querySelector('#routes-list');
// let contentGuides = document.querySelector('#guides-list');
let newRoutes = [];
const itemsPerPage = 5;
let currentPage = 1;
let currentRoute;

function createRoutesListElement(record) {
    let itemElement = document.createElement('tr');

    let buttonElement = document.createElement('button');
    let textButton = "Выбрать";
    buttonElement.append(textButton);
    buttonElement.classList.add('route-button', 'px-3', 'py-2', 'border',
        'border-1', 'rounded-1', 'border-dark');

    let itemElementId = document.createElement('td');
    itemElementId.classList.add("d-none", "route-id");

    let itemElementName = document.createElement('td');
    itemElementName.classList.add("route-name",);

    let itemElementDesc = document.createElement('td');

    let itemElementObj = document.createElement('td');
    itemElementObj.classList.add("route-objects");

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
        routesList.append(createRoutesListElement(records[i]));
    }

}

function buttonStatesActive() {
    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button) => {
        if (button.innerHTML == currentPage) {
            button.classList.add('active');

        } else {
            button.classList.remove('active');
        }
    });
}

function buttonStatesDisabled() {
    let buttonLast = document.querySelector('.last');
    let buttonNext = document.querySelector('.next');
    let countItems = newRoutes.length;

    if (currentPage == 1 && (currentPage == Math.ceil(countItems / 5))) {
        buttonLast.classList.add('disabled');
        buttonNext.classList.add('disabled');

    } else if (currentPage == 1) {
        buttonLast.classList.add('disabled');
        buttonNext.classList.remove('disabled');

    } else if (currentPage == 24) {
        buttonNext.classList.add('disabled');

    } else if (currentPage == Math.ceil(countItems / 5)) {
        buttonLast.classList.remove('disabled');
        buttonNext.classList.add('disabled');
        console.log('page = math');

    } else {
        buttonLast.classList.remove('disabled');
        buttonNext.classList.remove('disabled');
    }
}

function lastGroupButtons() {
    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        button.classList.remove('d-none');
        button.innerHTML = Number(button.innerHTML) - 5;
    });
}

function nextGroupButtons() {
    let items;
    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    if (document.querySelector('#search-field').value == '') {
        items = Array.from(tableRoutesContent.getElementsByTagName('tr'));

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
    let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));
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
    buttonStatesDisabled();
    buttonStatesActive();
}

function showSearchRoutes(items) {
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

    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    let countItems = newRoutes.length;

    pageButtons.forEach((button, index) => {
        if ((index + 1) > Math.ceil(countItems / 5)) {
            button.classList.add('d-none');

        } else {
            button.classList.remove('d-none');

        }
    });
    buttonStatesDisabled();
    buttonStatesActive();
}

function searchRoutesHandler() {
    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        button.innerHTML = index + 1;
    });
    currentPage = 1;
    let searchText = document.querySelector('#search-field').value;
    let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));

    if (searchText == '') {
        let selector = '.pagination-routes li span';
        let pageButtons = document.querySelectorAll(selector);
        pageButtons = Array.from(pageButtons).splice(1, 5);

        pageButtons.forEach((button) => {
            button.classList.remove('d-none');
        });

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;

        items.forEach((item, index) => {
            if (item.querySelector('.route-id').innerHTML == currentRoute) {
                item.classList = 'table-secondary border-dark';
            } else {
                item.classList.toggle('d-none', index < startIndex
                    || index >= endIndex);
            }
        });
        buttonStatesDisabled();
        buttonStatesActive();

    } else {
        items.forEach((item) => {
            let routeName = item.querySelector('.route-name').innerHTML;
            let itemName = routeName.toLowerCase();

            if (!(itemName.includes(searchText.toLowerCase()))) {
                item.classList = "d-none";
            } else {
                if (item.querySelector('.route-id').innerHTML == currentRoute) {
                    item.classList = 'table-secondary border-dark';
                    console.log(item);
                } else {
                    item.classList.remove('d-none');
                }
            }
        });
        showSearchRoutes(items);
    }
}

function createGuidesListElement(record) {
    let itemElement = document.createElement('tr');
    itemElement.classList.add('text-center');

    let buttonElement = document.createElement('button');
    let textButton = "Выбрать";
    buttonElement.append(textButton);
    buttonElement.classList.add('guide-button', 'px-2', 'py-1', 'border',
        'border-1', 'rounded-1', 'border-dark');

    let photoElement = document.createElement('img');
    photoElement.setAttribute('src', 'images/avatar.png');
    photoElement.setAttribute('width', '35px');

    let itemElementId = document.createElement('td');
    itemElementId.classList.add("d-none", "route-id");

    let itemElementPhoto = document.createElement('td');
    let itemElementName = document.createElement('td');
    let itemElementLanguage = document.createElement('td');
    let itemElementWorkExperience = document.createElement('td');
    let itemElementPricePerHour = document.createElement('td');
    let itemElementButton = document.createElement('td');

    itemElementId.append(record.id);
    itemElementPhoto.append(photoElement);
    itemElementName.append(record.name);
    itemElementLanguage.append(record.language);
    itemElementWorkExperience.append(record.workExperience);
    itemElementPricePerHour.append(record.pricePerHour);
    itemElementButton.append(buttonElement);

    itemElement.append(itemElementId, itemElementPhoto, itemElementName,
        itemElementLanguage, itemElementWorkExperience,
        itemElementPricePerHour, itemElementButton);
    return itemElement;
}

function renderGuides(records) {
    let guidesList = document.querySelector('#guides-list');
    guidesList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        guidesList.append(createGuidesListElement(records[i]));
    }
}

async function routeChooseBtnHandler(event) {
    if (event.target.className.includes('route-button')) {
        let elem = event.target;
        let idRoute = elem.closest("tr").querySelector('.route-id').innerHTML;
        currentRoute = idRoute;
        let nameR = elem.closest("tr").querySelector('.route-name').innerHTML;

        let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));

        items.forEach((item) => {
            item.classList.remove('table-secondary', 'border-dark');
        });

        elem.closest("tr").classList.add('table-secondary', 'border-dark');

        let urlGuides = `${hostRoutes}/${idRoute}/guides?${apiKey}`;
        let url = new URL(urlGuides);

        let response = await fetch(url);
        let result = await response.json();

        let section5 = document.querySelector('#guides');
        section5.classList.remove('d-none');

        document.querySelector('.route-guides').innerHTML = nameR;

        renderGuides(result);
    }
}

function showFilterRoutes(items) {
    console.log(items);
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

    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    let countItems = newRoutes.length;

    pageButtons.forEach((button, index) => {
        if ((index + 1) > Math.ceil(countItems / 5)) {
            button.classList.add('d-none');

        } else {
            button.classList.remove('d-none');

        }
    });
    buttonStatesDisabled();
    buttonStatesActive();
}


function filterRoutesHander(event) {
    let filterText = event.target.value;
    let pageButtons = document.querySelectorAll('.pagination-routes li span');
    pageButtons = Array.from(pageButtons).splice(1, 5);

    pageButtons.forEach((button, index) => {
        button.innerHTML = index + 1;
    });
    currentPage = 1;
    let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));

    if (filterText == 'asdf') {
        let selector = '.pagination-routes li span';
        let pageButtons = document.querySelectorAll(selector);
        pageButtons = Array.from(pageButtons).splice(1, 5);

        pageButtons.forEach((button) => {
            button.classList.remove('d-none');
        });

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;

        items.forEach((item, index) => {
            if (item.querySelector('.route-id').innerHTML == currentRoute) {
                item.classList = 'table-secondary border-dark';
            } else {
                item.classList.toggle('d-none', index < startIndex
                    || index >= endIndex);
            }
        });
        buttonStatesDisabled();
        buttonStatesActive();

    } else {
        items.forEach((item) => {
            let routeObj = item.querySelector('.route-objects').innerHTML;
            let itemObj = routeObj.toLowerCase();

            console.log(itemObj, filterText);

            if (!(itemObj.includes(filterText.toLowerCase()))) {
                item.classList = "d-none";
            } else {
                if (item.querySelector('.route-id').innerHTML == currentRoute) {
                    item.classList = 'table-secondary border-dark';
                    console.log(item);
                } else {
                    item.classList.remove('d-none');
                }
            }
        });
        showFilterRoutes(items);
    }

}

function parser(objects) {
    let mainObjects = document.getElementById("main-object");
    let point = objects.split('. ').length;
    let dash = objects.split('- ').length;
    let comma = objects.split(', ').length;
    let array;

    if (dash == Math.max(point, dash, comma)) {
        array = objects.split('- ');

    } else if (point == Math.max(point, dash, comma)) {
        array = objects.split('. ');

    } else {
        array = objects.split(', ');
    }
    array.forEach((item) => {

        if (item.length > 70) {
            item = item.slice(0, 70);
        };

        if (item.length > 7 && !('012345678'.includes(item[0]))) {
            let newOption = new Option(`${item}`, `${item}`);
            mainObjects.append(newOption);
        }

    });
}

async function LoadStorage() {
    let urlRoutes = `${hostRoutes}?${apiKey}`;
    let url = new URL(urlRoutes);

    let response = await fetch(url);
    let result = await response.json();
    renderRoutes(result);

    let items = Array.from(tableRoutesContent.getElementsByTagName('tr'));
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        item.classList.toggle('d-none', index < startIndex
            || index >= endIndex);
    });
    let buttonLast = document.querySelectorAll('.last')[0];
    buttonLast.classList.add('disabled');
    document.querySelector('#routes-list').onclick = routeChooseBtnHandler;
    result.forEach((object) => {
        parser(object.mainObject);
    });
}

window.onload = function () {
    LoadStorage();
    document.querySelector('.pagination-routes').onclick = pageBtnHandler;
    document.querySelector('#search-field').oninput = searchRoutesHandler;
    document.querySelector('#main-object').onchange = filterRoutesHander;
};