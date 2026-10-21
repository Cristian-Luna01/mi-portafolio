document.addEventListener("DOMContentLoaded", () => {

    const carrusel = document.getElementById("menu-carrusel");

    // Solo se ejecuta en celular
    if (!carrusel || window.innerWidth > 600) {
        return;
    }


    const originales = Array.from(carrusel.children);

    const cantidadOriginal = originales.length;

    if (cantidadOriginal === 0) {
        return;
    }

    carrusel.innerHTML = "";

    const numeroBloques = 7;

    for (let bloque = 0; bloque < numeroBloques; bloque++) {

        originales.forEach(enlace => {

            const clon = enlace.cloneNode(true);

            carrusel.appendChild(clon);

        });

    }



    const estiloCarrusel = getComputedStyle(carrusel);

    const gap = parseFloat(estiloCarrusel.gap) || 12;

    const primerBoton = carrusel.querySelector("a");

    const anchoBoton = primerBoton.getBoundingClientRect().width;

    const anchoElemento = anchoBoton + gap;

    const anchoBloque = anchoElemento * cantidadOriginal;



    const bloqueCentral = 3;



    function centrarBoton(indice) {

        const centroCarrusel = carrusel.clientWidth / 2;

        const centroBoton = anchoBoton / 2;

        carrusel.scrollLeft =
            (indice * anchoElemento)
            - centroCarrusel
            + centroBoton;

    }



    setTimeout(() => {

        const indiceSobreMi =
            (bloqueCentral * cantidadOriginal) + 1;

        const comportamientoAnterior =
            carrusel.style.scrollBehavior;

        carrusel.style.scrollBehavior = "auto";

        centrarBoton(indiceSobreMi);

        carrusel.style.scrollBehavior =
            comportamientoAnterior;

    }, 100);



    let recolocando = false;

    function mantenerInfinito() {

        if (recolocando) {
            return;
        }

        const posicionActual = carrusel.scrollLeft;



        if (posicionActual < anchoBloque * 1.5) {

            recolocando = true;

            const comportamientoAnterior =
                carrusel.style.scrollBehavior;

            const snapAnterior =
                carrusel.style.scrollSnapType;


            carrusel.style.scrollBehavior = "auto";

            carrusel.style.scrollSnapType = "none";


            carrusel.scrollLeft =
                posicionActual + (anchoBloque * 3);


            requestAnimationFrame(() => {

                carrusel.style.scrollBehavior =
                    comportamientoAnterior;

                carrusel.style.scrollSnapType =
                    snapAnterior;

                recolocando = false;

            });

        }




        else if (posicionActual > anchoBloque * 4.5) {

            recolocando = true;

            const comportamientoAnterior =
                carrusel.style.scrollBehavior;

            const snapAnterior =
                carrusel.style.scrollSnapType;


            carrusel.style.scrollBehavior = "auto";

            carrusel.style.scrollSnapType = "none";


            // Nos movemos 3 bloques idénticos hacia la izquierda
            carrusel.scrollLeft =
                posicionActual - (anchoBloque * 3);


            requestAnimationFrame(() => {

                carrusel.style.scrollBehavior =
                    comportamientoAnterior;

                carrusel.style.scrollSnapType =
                    snapAnterior;

                recolocando = false;

            });

        }

    }




    carrusel.addEventListener(
        "scroll",
        mantenerInfinito,
        { passive: true }
    );



    let intervalo;

    function iniciarAutoplay() {

        clearInterval(intervalo);

        intervalo = setInterval(() => {

            carrusel.scrollBy({

                left: anchoElemento,

                behavior: "smooth"

            });

        }, 3000);

    }


    iniciarAutoplay();


    let reinicioAutoplay;

    carrusel.addEventListener(
        "touchstart",
        () => {

            clearInterval(intervalo);

            clearTimeout(reinicioAutoplay);

        },
        { passive: true }
    );




    carrusel.addEventListener(
        "touchend",
        () => {

            mantenerInfinito();

            clearTimeout(reinicioAutoplay);


            reinicioAutoplay = setTimeout(() => {

                iniciarAutoplay();

            }, 4000);

        },
        { passive: true }
    );


    carrusel.addEventListener(
        "mouseenter",
        () => {

            clearInterval(intervalo);

        }
    );


    carrusel.addEventListener(
        "mouseleave",
        () => {

            iniciarAutoplay();

        }
    );

});
