let numPizzasRosse = 0
let numPizzasBianca = 0

async function modal() {

    const response = await fetch(`/create`);
    const newHtml = await response.text();

    const ventanaNuevoElem = document.getElementById("modal");
    ventanaNuevoElem.innerHTML = newHtml;

    //document.body.style.background = "rgba(0, 0, 0, 0.4)";
    //document.body.style.position = "static";
    //document.body.style.height = "auto";
    //document.body.style.overflow = "hidden";
    document.body.disabled = true;

    console.log("Modal ejecutado");
    //const newSuperheroes = await response.text();
    const form = document.getElementById("formulario");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails
        event.stopPropagation(); // Stop the event from propagating further
        var form = event.target;
        if (form.checkValidity() === false) {
            console.log("Fallo en la validacion");
        }
        else {
            console.log("No hubo fallos en la validacion");
            //submitElement(param);
        }
        form.classList.add("was-validated");
    }, false);
}

async function modaleditelement(id) {

    const response = await fetch(`/${id}/edit`);
    const newHtml = await response.text();

    const ventanaNuevoElem = document.getElementById("modal");
    ventanaNuevoElem.innerHTML = newHtml;

    //document.body.style.background = "rgba(0, 0, 0, 0.4)";
    //document.body.style.position = "static";
    //document.body.style.height = "auto";
    //document.body.style.overflow = "hidden";
    document.body.disabled = true;

    console.log("Modal ejecutado");
    //const newSuperheroes = await response.text()const form = document.getElementById("formulario")
    const form = document.getElementById("formulario");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails
        event.stopPropagation(); // Stop the event from propagating further
        var form = event.target;
        if (form.checkValidity() === false) {
            console.log("Fallo en la validacion");
        }
        else {
            console.log("No hubo fallos en la validacion");
            //submitElement(param);
        }
        form.classList.add("was-validated");
    }, false);;
}

async function closemodal(param) {
    let id = parseInt(param);
    let response;
    if (id === -1) {
        response = await fetch(`/`);
    }
    else {
        response = await fetch(`/${id}`);
    }
    const newHTML = await response.text();

    //document.body.style.overflow = "visible";

    const pagPrincipal = document.getElementById("main");
    pagPrincipal.innerHTML = newHTML;

    console.log("Modal cerrado");

    numPizzasRosse = 0;                         //Estas dos ultimas lineas para asegurarnos de que si se anade o se modifica un nuevo elemento, habria que volver a pulsar el boton de "ver mas" para cargar nuevos elementos de tres en tres
    numPizzasBianca = 0;

    loadMoreBianca();
    loadMoreRosse();
}

function getId(a) {
    return document.getElementById(a).value;
}

function getCheck(a) {
    return document.getElementById(a).checked;
}
/*
async function validarFormulario() {
    const form = document.getElementById("formulario")
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails
        event.stopPropagation(); // Stop the event from propagating further
        var form = event.target;
        if (form.checkValidity() === false) {
            console.log("Fallo en la validacion");
        }
        else {
            console.log("No hubo fallos en la validacion");
            submitElement(param);
        }
        form.classList.add("was-validated");
    }, false);
}*/

async function validateForm(param) {
    var nombre = document.getElementById('nombre').value.trim();
    var url = document.getElementById('url').value.trim();
    var ingredientes = document.getElementById('ingredientes').value.trim();

    document.getElementById("formulario").classList.add("was-validated");

    if (nombre !== '' && /^[A-ZÁÉÍÓÚÑ0-9]/.test(nombre[0])) {
        isImgUrl(url, function(result) {
            if (result) {            
                if (50 <= ingredientes.length <= 500) {
                    submitElement(param);
                } else {
                    console.log("Fallo ingredientes");
                }
            } else {
                console.log("Fallo url");
            }
        });
    } else {
        console.log("Fallo nombre");
        nombre.classList.remove("is-valid");
        nombre.classList.add("is-invalid");
    }
}

function isImgUrl(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
}

async function submitElement(param) {

    //validarFormulario();

    let id = parseInt(param);

    let alergenos = [getId("gluten"), getId("huevos"), getId("pescado"), getId("fcascara")]
    let checks = [getCheck("gluten"), getCheck("huevos"), getCheck("pescado"), getCheck("fcascara")]

    for (let index = 0; index < 4; index++) {
        if (!checks[index]) {
            alergenos[index] = null
        }
    }
    alergenos = alergenos.filter(elem => elem != null)

    let form_values = [getId("nombre"), getId("url"), getId("ingredientes"), alergenos, getId("categoria")]
    console.log(form_values[0], form_values[1], form_values[2], form_values[3], form_values[4]);

    let response;
    if (id === -1) {
        response = await fetch('/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ form_values: JSON.stringify(form_values) }),
        });
        const newHtml = await response.text();

        const response2 = await fetch(`/`);                         //Estas cuatro lineas para imprimir la pagina principal con el nuevo elemento ya anadido
        const newHTML2 = await response2.text();
        const pagPrincipal = document.getElementById("main");
        pagPrincipal.innerHTML = newHTML2;

        const ventanaNuevoElem = document.getElementById("modal");
        ventanaNuevoElem.innerHTML = newHtml;

        console.log("Elemento creado correctamente");
    }
    else {                                                           //Igual que lo anterior, pero se modifica el elemento en vez de crearlo de cero (se llama a /:id/modify)
        response = await fetch(`/${id}/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id: JSON.stringify(id),
                form_values: JSON.stringify(form_values)
            }),
        });
        const newHtml = await response.text();

        const response2 = await fetch(`/${id}`);
        const newHTML2 = await response2.text();
        const pagPrincipal = document.getElementById("main");
        pagPrincipal.innerHTML = newHTML2;

        const ventanaNuevoElem = document.getElementById("modal");
        ventanaNuevoElem.innerHTML = newHtml;

        console.log("Elemento modificado correctamente");
    }

    numPizzasRosse = 0;                         //Estas dos ultimas lineas para asegurarnos de que si se anade o se modifica un nuevo elemento, habria que volver a pulsar el boton de "ver mas" para cargar nuevos elementos de tres en tres
    numPizzasBianca = 0;

    loadMoreBianca();
    loadMoreRosse();
}

async function loadMoreRosse() {
    numPizzasRosse += 3;

    const response = await fetch(`/pizzasRosse?from=${numPizzasRosse - 3}&to=${numPizzasRosse}`);
    const newHtml = await response.text();

    const pizzasRosse = document.getElementById("Rosse");
    pizzasRosse.innerHTML += newHtml;

    const response2 = await fetch(`/pizzasRosse?from=${numPizzasRosse}&to=${numPizzasRosse + 3}`);
    const newHtml2 = await response2.text();
    if (newHtml2 === "") {
        document.getElementById("loadR").style.visibility = "hidden";
    }
}

async function loadMoreBianca() {
    numPizzasBianca += 3;

    const response = await fetch(`/pizzasBianca?from=${numPizzasBianca - 3}&to=${numPizzasBianca}`);
    const newHtml = await response.text();

    const pizzasBianca = document.getElementById("Bianca");
    pizzasBianca.innerHTML += newHtml;

    const response2 = await fetch(`/pizzasBianca?from=${numPizzasBianca}&to=${numPizzasBianca + 3}`);
    const newHtml2 = await response2.text();
    if (newHtml2 === "") {
        document.getElementById("loadB").style.visibility = "hidden";
    }
}

async function deleteelement(param) {
    let id = parseInt(param)

    const response = await fetch(`/${id}/delete`);
    //const newHtml = await response.text();

    location.href = "/";

    console.log("Elemento borrado");
}

async function search() {
    const string = document.getElementById("searchInput").value;

    const responseRosse = await fetch(`/searchRosse?input=${string}`);
    const newHtmlRosse = await responseRosse.text();
    const responseBianca = await fetch(`/searchBianca?input=${string}`);
    const newHtmlBianca = await responseBianca.text();

    const pizzasRosse = document.getElementById("Rosse");
    pizzasRosse.innerHTML = newHtmlRosse;
    const pizzasBianca = document.getElementById("Bianca");
    pizzasBianca.innerHTML = newHtmlBianca;

    document.getElementById("loadR").style.visibility = "hidden";
    document.getElementById("loadB").style.visibility = "hidden";
}

async function filter() {
    let alergenos = ["https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png", "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoHuevo-Egg_icon-icons.com_67598.png",
        "https://cdn.icon-icons.com/icons2/852/PNG/512/Fish_icon-icons.com_67594.png", "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoFrutosCascaraPeelFruits_icon-icons.com_67601.png"];
    let checks = [getCheck("gluten"), getCheck("huevos"), getCheck("pescado"), getCheck("fcascara")];

    for (let index = 0; index < 4; index++) {
        if (!checks[index]) {
            alergenos[index] = null;
        }
    }
    alergenos = alergenos.filter(elem => elem != null)

    const responseRosse = await fetch(`/filterRosse?filter=${alergenos}`);
    const newHtmlRosse = await responseRosse.text();

    const responseBianca = await fetch(`/filterBianca?filter=${alergenos}`);
    const newHtmlBianca = await responseBianca.text();

    const pizzasRosse = document.getElementById("Rosse");
    pizzasRosse.innerHTML = newHtmlRosse;
    const pizzasBianca = document.getElementById("Bianca");
    pizzasBianca.innerHTML = newHtmlBianca;

    document.getElementById("loadR").style.visibility = "hidden";
    document.getElementById("loadB").style.visibility = "hidden";
}
