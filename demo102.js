var listaPersona = [];

window.onload = function () {
    document.getElementById("btnGuardar").addEventListener("click", function () {
        guardarPersona();
    })

    document.querySelectorAll("input").forEach(x => {
        if (x.classList.contains("required")) {
            x.setAttribute("data-valido", "0");
            x.addEventListener("keyup", function () {
                let contador = x.parentNode.querySelector("i");
                contador.innerText = `${x.value.length} - ${x.getAttribute("maxlength")}`;
                let tipo = x.getAttribute("data-tipo");
                validar(x, tipo);
            });
        }
        else{
            x.setAttribute("data-valido", "1");
        }
    })
}

function validar(x, tipo) {
    let objPatron = {};
    if (tipo === "cadena") {
        objPatron.patron = /^[A-Za-zÁÉÍÓÚñáéíóúÑ]+((\s)?([A-Za-zÁÉÍÓÚñáéíóúÑ]))*$/;
        objPatron.mensaje = _ERRORTEXTO;
    }
    else if (tipo === "numero") {
        objPatron.patron = /^([0-9])*$/;
        objPatron.mensaje = _ERRORNUMERO;
    }
    else if (tipo === "decimal") {
        objPatron.patron = /^[0-9]\d*(\.\d+)?$/;
        objPatron.mensaje = _ERRORDECIMAL;
    }
    else if (tipo === "email") {
        objPatron.patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        objPatron.mensaje = _ERRORMAIL;
    }
    let res = x.value.search(objPatron.patron);
    let span;
    if (res === -1) {
        if (x.parentNode.querySelector("span"))
            span = x.parentNode.querySelector("span");
        else {
            span = document.createElement("span");
            x.parentNode.appendChild(span);
        }
        span.innerText = objPatron.mensaje;
        x.setAttribute("data-valido", "0");
    }
    else {
        if (x.parentNode.querySelector("span")) {
            span = x.parentNode.querySelector("span");
            x.parentNode.removeChild(span);
        }
        x.setAttribute("data-valido", "1");
    }

}


function guardarPersona() {
    if (validarInput("frmPersona")) {
        let nombres = document.getElementById("txtNombres").value;
        let apellidos = document.getElementById("txtApellidos").value;
        let edad = document.getElementById("txtEdad").value;

        let objPersona = {
            nombres,
            apellidos,
            edad
        };

        listaPersona.push(objPersona);
        pintarPersonas(objPersona);
    }
}
function pintarPersonas(objPersona) {
    let body = document.querySelector(".resultados table tbody");
    body.innerHTML += `<tr><td>${objPersona.nombres}</td><td>${objPersona.apellidos}</td><td>${objPersona.edad}</td></tr>`;
}


function validarInput(control) {
    let c = document.getElementById(control);
    let exito = true;
    let objetos = c.querySelectorAll("input");
    for (let objeto of objetos) {
        if (objeto.getAttribute("data-valido") == "0") {
            exito = false;
            break;
        }
    };


    // objeto.querySelectorAll("input").forEach(x => {
    //     if (x.getAttribute("data-valido") == "0") {
    //         exito = false;
    //         break;
    //     }
    // });
    return exito;

}

