let apiKey = 'api_key=b3cd4c4c-4324-454e-a437-942d700bd5ad';
let hostRoutes = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes';

async function LoadStorage() {
    let urlRoutes = `${hostRoutes}?${apiKey}`;
    let url = new URL(urlRoutes);

    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
}

LoadStorage();