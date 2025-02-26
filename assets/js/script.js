(() => {
    'use strict';

    document.querySelector('.sec-header__recorde').textContent = localStorage.getItem('melhorTempo') || "00:00:00";

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

    // cronometro
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    let intervalo;
    let melhorTempo = localStorage.getItem('melhorTempo') || "99:99:99";
    
    function atualizarCronometro() {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
        
        const formato = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        document.querySelector('.sec-header__cronometro').textContent = formato;
        
        const cartasViradas = document.querySelectorAll('.sec-cards .wrapper .flip-box.checked');

        if (cartasViradas.length >= 32) {
            pararCronometro();
            gravarResultado();
            abrirModal();
        }
    }
    
    function pararCronometro() {
        clearInterval(intervalo);
    }
    
    function gravarResultado() {
        const formato = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        
        if (melhorTempo !== "00:00:00" && compararTempos(formato, melhorTempo) < 0) {
            melhorTempo = formato;
            localStorage.setItem('melhorTempo', melhorTempo);

            document.querySelector('.sec-header__recorde').textContent = melhorTempo;
        }
    }

    function abrirModal() {
        const formato = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        const mensagem = `Completei o jogo da memória em ${formato}! Jogue você também!`;
        const url = "https://mateusdanieel.github.io/jogo-da-memoria/";
        const link = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem + " " + url)}`;
        
        document.querySelector('.modal').classList.add('active');
        document.querySelector('.modal__content__text__time').textContent = formato;
        document.querySelector('.modal__content__button__share').setAttribute('href', link);
    }

    function compararTempos(tempo1, tempo2) {
        return tempo1.localeCompare(tempo2);
    }

    setTimeout(() => {
        intervalo = setInterval(atualizarCronometro, 1000);
    }, 3000);
    
})();