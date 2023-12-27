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