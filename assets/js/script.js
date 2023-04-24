(() => {
    'use strict';

    function distribuirCartas() {
        const container = document.querySelector('.sec-cards .wrapper');
        let cartas = [];

        while (cartas.length < 16) {
            var aleatorio = Math.floor(Math.random() * 39);
    
            if (cartas.indexOf(aleatorio) == -1) {
                cartas.push(aleatorio);
            }
        }

        for (let i = 0; i < 16; i++) {
            container.innerHTML += 
            `
            <div class='flip-box active' data-id='${cartas[i]}'>
                <div class='flip-box-inner'>
                    <div class='flip-box-front'>
                        <img src='assets/img/flip-box-front-card.png' alt='' />
                    </div>
                    
                    <div class='flip-box-back'>
                        <img src='assets/img/cards/card_${cartas[i]}.png' alt='' />
                    </div>
                </div>
            </div>`;
        }

        cartas.sort();

        for (let i = 0; i < 16; i++) {
            container.innerHTML += 
            `
            <div class='flip-box active' data-id='${cartas[i]}'>
                <div class='flip-box-inner'>
                    <div class='flip-box-front'>
                        <img src='assets/img/flip-box-front-card.png' alt='' />
                    </div>
                    
                    <div class='flip-box-back'>
                        <img src='assets/img/cards/card_${cartas[i]}.png' alt='' />
                    </div>
                </div>
            </div>`;
        }
        
    }

    function esconderCartas() {
        const cartas = document.querySelectorAll('.sec-cards .wrapper .flip-box');

        cartas.forEach((carta) => {
            carta.classList.remove('active');
        });
    }

    function mostrarCartas() {
        const cartas = document.querySelectorAll('.sec-cards .wrapper .flip-box');
        let cartasViradas = 0;

        cartas.forEach((carta, i, arr) => {

            carta.addEventListener('click', () => {

                if (cartasViradas < 2) {
                    carta.classList.add('active');
                    cartasViradas += 1;
                }

                setTimeout(() => {
                    esconderCartas();
                    cartasViradas = 0;
                }, 2000);

                
                
                
                
            });

        });

    }

    distribuirCartas();

    setTimeout(() => {
        esconderCartas();
    }, 2000);
    
    mostrarCartas();
})();