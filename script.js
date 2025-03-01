// this function gets the date from the search field and sends it to call()
/*function getDate() {
    return document.getElementById('dateSearch').value;
}

async function call() {
    let request = "";
    fetch("./secrets.json").then(response => {
        return response.json();
    }).then(async function (myJSON) {
        request = 'https://api.nasa.gov/planetary/apod?date=' + getDate() + '&api_key='+myJSON.api_key
        await fetch(request).then(function (response) {
            return response.json();
        }).then(function (myJSON) {
            // Description
            p = document.getElementById("description");
            p.innerHTML = myJSON.explanation;

            // Image
            img = document.getElementById("spacePic");
            img.src = myJSON.url;
        });
    });
}*/
// Función para obtener la fecha del campo de búsqueda
function getDate() {
    return document.getElementById('dateSearch').value;
}

// Función para hacer la solicitud GET a la NASA
async function call() {
    let request = "";
    fetch("/search.json")
        .then(response => response.json())
        .then(async function (myJSON) {
            request = 'https://api.nasa.gov/planetary/apod?date=' + getDate() + '&api_key=' + myJSON.api_key;
            await fetch(request)
                .then(response => response.json())
                .then(function (myJSON) {
                    // Mostrar la descripción y la imagen
                    document.getElementById('description').innerText = myJSON.explanation;
                    document.getElementById('spacePic').src = myJSON.url;
                })
                .catch(error => {
                    console.error('Error en la solicitud GET:', error);
                });
        })
        .catch(error => {
            console.error('Error al cargar secrets.json:', error);
        });
}

// Función para hacer la solicitud POST a tu servidor Flask
async function sendPost() {
    const date = getDate(); // Obtiene la fecha ingresada por el usuario

    const url = 'http://localhost:5000/api'; // URL de tu servidor Flask
    const payload = {
        date: date // Envía la fecha en el cuerpo de la solicitud
    };

    // Hacer la solicitud POST
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    // Verificar si la solicitud fue exitosa
    if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor POST:', data);
    } else {
        console.error('Error en la solicitud POST:', response.status);
    }
}
