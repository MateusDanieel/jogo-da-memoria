(() => {
    'use strict';

    function embaralharCartas(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function distribuirCartas() {
        const container = document.querySelector('.sec-cards .wrapper');
        let cartasId = [];
        let cartas = [];

        while (cartasId.length < 16) {
            var aleatorio = Math.floor(Math.random() * 39);
    
            if (cartasId.indexOf(aleatorio) == -1) {
                cartasId.push(aleatorio);
            }
        }

        cartas = cartasId.filter(() => true);

        cartasId.forEach((el) => cartas.push(el));

        embaralharCartas(cartas);
        
        for (let i = 0; i < 32; i++) {
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

                        if (cartasViradas[0] == carta.dataset.id) {
                            carta.classList.add('checked');

                            arr.forEach((el) => {
                                if (el.dataset.id == cartasViradas[0]) {
                                    el.classList.add('checked');
                                }
                            });

                            cartasViradas = [];
                        } else {
                            setTimeout(() => {
                                arr.forEach((el) => {
                                    
                                    el.classList.remove('active');
    
                                    cartasViradas = [];
                                })
                            }, 1000);
                        }

                        
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