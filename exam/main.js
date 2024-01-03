let apiKey = 'api_key=b3cd4c4c-4324-454e-a437-942d700bd5ad';
let hostRoutes = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes';

function createListItemElement(record) {
    let itemElement = document.createElement('tr');

    let buttonElement = document.createElement('button');
    let textButton = "Выбрать";
    buttonElement.append(textButton);
    buttonElement.classList.add('px-4', 'py-2', 'border',
        'border-2', 'rounded-2');

    let itemElementName = document.createElement('td');
    let itemElementDesc = document.createElement('td');
    let itemElementObj = document.createElement('td');
    let itemElementButton = document.createElement('td');

    itemElementName.append(record.name);
    itemElementDesc.append(record.description);
    itemElementObj.append(record.mainObject);
    itemElementButton.append(buttonElement);

    itemElement.append(itemElementName, itemElementDesc,
        itemElementObj, itemElementButton);
    return itemElement;
}

function renderRoutes(records) {
    console.log(records);
    let routesList = document.querySelector('#routes-list');
    for (let i = 0; i < records.length; i++) {
        routesList.append(createListItemElement(records[i]));
    }
}

async function LoadStorage() {
    let urlRoutes = `${hostRoutes}?${apiKey}`;
    let url = new URL(urlRoutes);

    let response = await fetch(url);
    let result = await response.json();
    result = result.splice(0, 3);
    renderRoutes(result);
}

LoadStorage();