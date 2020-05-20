

window.onload = function () {
    document.querySelectorAll("header ul li").forEach(x => {
        x.addEventListener("click", function () {
            alert(x.innerText);
        });
    });


    this.document.querySelector("main button").addEventListener('click', function () {
        loguearUsuario();
    });
}



function loguearUsuario() {
    document.querySelector("body").classList.add("cargando");
    setTimeout(function () {
        document.querySelector("body").classList.remove("cargando");
    }, 3000);
}
