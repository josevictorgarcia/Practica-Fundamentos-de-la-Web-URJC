let numPizzasRosse = 3
let numPizzasBianca = 3

async function modal(){

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
}

async function modaleditelement(id){

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
    //const newSuperheroes = await response.text();
}

async function closemodal(param){
    let id = parseInt(param);
    let response;
    if(id === -1){
        response = await fetch(`/`);
    }
    else{
        response = await fetch(`/${id}`);
    }
    const newHTML = await response.text();

    //document.body.style.overflow = "visible";

    const pagPrincipal = document.getElementById("main");
    pagPrincipal.innerHTML = newHTML;

    console.log("Modal cerrado");

    numPizzasRosse = 3;                         //Estas dos ultimas lineas para asegurarnos de que si se anade o se modifica un nuevo elemento, habria que volver a pulsar el boton de "ver mas" para cargar nuevos elementos de tres en tres
    numPizzasBianca = 3;
}

function getId(a){
    return document.getElementById(a).value;
}

function getCheck(a){
    return document.getElementById(a).checked;
}

async function validarFormulario(param){
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission if validation fails
        event.stopPropagation(); // Stop the event from propagating further
        var form = event.target;
        if (form.checkValidity() === false) {
            console.log("Fallo en la validacion");
        }
        else{
            console.log("No hubo fallos en la validacion");
            submitElement(param);
        }
        form.classList.add("was-validated"); // Add 'was-validated' class to enable Bootstrap's styling
    }, false);
}

async function submitElement(param){

    //validarFormulario();

    let id = parseInt(param);

    let alergenos = [getId("gluten"), getId("huevos"), getId("pescado"), getId("fcascara")]
    let checks = [getCheck("gluten"), getCheck("huevos"), getCheck("pescado"), getCheck("fcascara")]
    
    for(let index=0; index<4; index++){
        if (!checks[index]){
            alergenos[index] = null
        }
    }
    alergenos = alergenos.filter(elem => elem != null)

    let form_values = [ getId("nombre"), getId("url"), getId("ingredientes"), alergenos, getId("categoria") ]
    console.log(form_values[0], form_values[1], form_values[2], form_values[3], form_values[4]);

    let response;
    if (id === -1){
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
    else{                                                           //Igual que lo anterior, pero se modifica el elemento en vez de crearlo de cero (se llama a /:id/modify)
        response = await fetch(`/${id}/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ 
                id: JSON.stringify(id),
                form_values: JSON.stringify(form_values) }),
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

    numPizzasRosse = 3;                         //Estas dos ultimas lineas para asegurarnos de que si se anade o se modifica un nuevo elemento, habria que volver a pulsar el boton de "ver mas" para cargar nuevos elementos de tres en tres
    numPizzasBianca = 3;
}

async function loadMoreRosse(){
    numPizzasRosse += 3;

    const response = await fetch(`/pizzas?rosse=${numPizzasRosse}&bianca=${numPizzasBianca}`);
    const newHtml = await response.text();

    const ventanaNuevoElem = document.getElementById("main");
    ventanaNuevoElem.innerHTML = newHtml;
}

async function loadMoreBianca(){
    numPizzasBianca += 3;

    const response = await fetch(`/pizzas?rosse=${numPizzasRosse}&bianca=${numPizzasBianca}`);
    const newHtml = await response.text();

    const ventanaNuevoElem = document.getElementById("main");
    ventanaNuevoElem.innerHTML = newHtml;
}

async function deleteelement(param){
    let id = parseInt(param)

    const response = await fetch(`/${id}/delete`);
    //const newHtml = await response.text();

    location.href = "/";

    console.log("Elemento borrado");
}

async function search(){
    const string = document.getElementById("searchInput").value;

    const response = await fetch(`/search?input=${string}`);
    const newHtml = await response.text();

    const ventanaPrincipal = document.getElementById("main");
    ventanaPrincipal.innerHTML = newHtml;

    numPizzasRosse = 3;                         //Estas dos ultimas lineas para asegurarnos de que si se anade o se modifica un nuevo elemento, habria que volver a pulsar el boton de "ver mas" para cargar nuevos elementos de tres en tres
    numPizzasBianca = 3;
}