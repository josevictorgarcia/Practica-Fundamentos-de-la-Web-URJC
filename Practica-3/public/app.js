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

async function closemodal(){
    const response = await fetch(`/`);
    const newHTML = await response.text();

    //document.body.style.overflow = "visible";

    const pagPrincipal = document.getElementById("main");
    pagPrincipal.innerHTML = newHTML;

    console.log("Modal cerrado");
}

function getId(a){
    return document.getElementById(a).value;
}

function getCheck(a){
    return document.getElementById(a).checked;
}

async function submitElement(){
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

    const response = await fetch('/new', {
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