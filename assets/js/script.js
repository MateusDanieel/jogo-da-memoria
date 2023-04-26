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

    function manipularCartas() {
        let cartasViradas = [];
        const cartas = document.querySelectorAll('.sec-cards .wrapper .flip-box');
        
        cartas.forEach((carta, index, arr) => {
            carta.classList.remove('active');

            carta.addEventListener('click', () => {

                if (cartasViradas.length < 2 && !carta.classList.contains('active')) {
                    carta.classList.add('active');

                    cartasViradas.push(carta.dataset.id);

                    if (cartasViradas.length == 2) {

                        setTimeout(() => {
                            arr.forEach((el) => {
                                
                                el.classList.remove('active');

                                cartasViradas = [];
                            })
                        }, 3000);
                    }
                } 
                
                
                
                
            });
        });

    }

    distribuirCartas();

    setTimeout(() => {
        manipularCartas();
    }, 3000);
    
})();