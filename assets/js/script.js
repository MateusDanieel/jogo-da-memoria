(() => {
    'use strict';

    function distribuirCartas() {
        const container = document.querySelector('.sec-cards .wrapper');

        for (let i = 0; i < 24; i++) {
            container.innerHTML += 
            `
            <div class='flip-box active'>
                <div class='flip-box-inner'>
                    <div class='flip-box-front'>
                        <img src='assets/img/flix-box-front-card.png' alt='' />
                    </div>
                    
                    <div class='flip-box-back'>
                        <img src='assets/img/cards/card_${i}.png' alt='' />
                    </div>
                </div>
            </div>`;
        }
    }

    function esconderCartas() {
        const cartas = document.querySelectorAll('.sec-cards .wrapper .flip-box');

        setTimeout(() => {
            cartas.forEach((carta) => {
                carta.classList.remove('active');
            });
        }, 5000);
 
    }

    distribuirCartas();
    esconderCartas();
})();