$(function () {

    document.getElementById("musica").volume = 0.0;
    document.getElementById("somMoeda").volume = 0.0;
    var grupoMoedas = {
        timerUltimoGrupo: 0
    }

    var KEY = {
        W: 87,
        S: 83,
        A: 65,
        D: 68,
        P: 80
    }

    var player = {}
    player.pressedKeys = [];
    player.timer = setInterval(gameLoop, 30);
    player.ultimoTiro = 0;
    player.ultimoTimerColisao = 0;
    player.vidas = 3;
    player.qtdMoedas=0;
    player.qtdMoedasVida = 0;

    $(document).keydown(function (e) {
        player.pressedKeys[e.which] = true;
    })

    $(document).keyup(function (e) {
        player.pressedKeys[e.which] = false;
    })

    function movePlayer() {
        var top = parseInt($("#player1").css("top"));
        var left = parseInt($("#player1").css("left"));
        if (player.pressedKeys[KEY.S]) {
            $("#player1").css("top", top + 5);
        }
        if (player.pressedKeys[KEY.W]) {
            $("#player1").css("top", top - 5);
        }
        if (player.pressedKeys[KEY.A]) {
            $("#player1").css("left", left - 5);
        }
        if (player.pressedKeys[KEY.D]) {
            $("#player1").css("left", left + 5);
        }
        if (player.pressedKeys[KEY.P]) {
            playerAtirar();
            player.pressedKeys[KEY.P] = false;
        }
    }

    function moveGrupoMoedas() {
        if (Math.floor(Date.now()) > grupoMoedas.timerUltimoGrupo + 5000 || grupoMoedas.timerUltimoGrupo == 0) {
            var objMoeda = new moeda();
            grupoMoedas.timerUltimoGrupo = Math.floor(Date.now());

        }
    }

    function playerAtirar() {
        if (Math.floor(Date.now() > player.ultimoTiro + 150)
            || player.ultimoTiro == 0) {
            player.ultimoTiro = Math.floor(Date.now());
            $("#player1")
                .removeClass("voando")
                .addClass("atirando");
            var objTiro = new tiro();
            setTimeout(playerVoar, 400);
        }
    }
    function playerVoar() {
        $("#player1")
            .removeClass("atirando")
            .addClass("voando")
            ;

    }

    function getPosicao(elemento) {
        var elemento = $(elemento);
        var pos = elemento.position();
        var width = (elemento.attr("class") == "player voando") ? elemento.width() - 25 : elemento.width();
        var height = elemento.height();
        return [
            [pos.left, pos.left + width],
            [pos.top, pos.top + height]
        ];
    }

    function compararPosicao(p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
    }

    function gameLoop() {
        movePlayer();
        moveGrupoMoedas();
        checarColisoesMoedas();
    }

    function checarColisoesMoedas() {
        if (Math.floor(Date.now()) > player.ultimoTimerColisao + 100 || player.ultimoTimerColisaoo == 0) {

            player.ultimoTimerColisao = Math.floor(Date.now());

            $(".moeda").each(function (index, elem) {
                if (checarColisao($(".player"), elem)) {
                    document.getElementById("somMoeda").play();
                    $(elem).remove();
                    player.qtdMoedas++;
                    player.qtdMoedasVida++;
                    if(player.qtdMoedasVida>=10)
                    {
                        player.vidas++;
                        player.qtdMoedasVida = 0;
                    }
                    $(".qtdMoedas").html("moedas " + player.qtdMoedas + "x");
                    $(".vidas").html("vidas " + player.vidas + "x");
                }

            });
        }

    }


    function checarColisao(elemento1, elemento2) {
        var elemento1 = elemento1;
        var pos = getPosicao(elemento1);

        var pos2 = getPosicao(elemento2);
        var horizontalMatch = compararPosicao(pos[0], pos2[0]);
        var verticalMatch = compararPosicao(pos[1], pos2[1]);
        return horizontalMatch && verticalMatch;
    }
});