$(function () {

    document.getElementById("musica").volume = 0.1;

    var grupoMoedas = {
        timerUltimoGrupo: 0
    }
    var alien1 = {
        timerUltimo: 0
    }
     var obstaculo1 = {
        timerUltimo: 0
    }
     var obstaculo2 = {
        timerUltimo: 0
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
    player.ultimoTimerColisaoTiro = 0;
    player.vidas = 3;
    player.qtdMoedas = 0;
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
            $("#player1").css("top", top + 10);
        }
        if (player.pressedKeys[KEY.W]) {
            $("#player1").css("top", top - 10);
        }
        if (player.pressedKeys[KEY.A]) {
            $("#player1").css("left", left - 10);
        }
        if (player.pressedKeys[KEY.D]) {
            $("#player1").css("left", left + 10);
        }
        if (player.pressedKeys[KEY.P]) {
            playerAtirar();
            player.pressedKeys[KEY.P] = false;
        }
    }

    function moveGrupoMoedas() {
        if (Math.floor(Date.now()) > grupoMoedas.timerUltimoGrupo + 5000 || grupoMoedas.timerUltimoGrupo == 0) {
            addMoedas();
            grupoMoedas.timerUltimoGrupo = Math.floor(Date.now());

        }
    }
    function moveAlien1() {
        if (Math.floor(Date.now()) > alien1.timerUltimo + 10000 || alien1.timerUltimo == 0) {
            addAlien1();
            alien1.timerUltimo = Math.floor(Date.now());

        }
    }
     function moveObstaculo1() {
        if (Math.floor(Date.now()) > obstaculo1.timerUltimo + 3000 || obstaculo1.timerUltimo == 0) {
            addObstaculo1();
            obstaculo1.timerUltimo = Math.floor(Date.now());

        }
    }
    function moveObstaculo2() {
        if (Math.floor(Date.now()) > obstaculo2.timerUltimo + 3000 || obstaculo2.timerUltimo == 0) {
            addObstaculo2();
            obstaculo2.timerUltimo = Math.floor(Date.now());

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
        var width = elemento.width();
        var height = elemento.height();
        if (elemento.attr("class") == "player voando")
            return [
                [pos.left + 20, (pos.left + width) - 30],
                [pos.top + 20, (pos.top + height - 20)]
            ];
        else if (elemento.attr("class") == "player voando")
            return [
                [pos.left + 10, (pos.left + width) - 30],
                [pos.top + 20, (pos.top + height - 20)]
            ];
        else
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
        moveAlien1();
        checarColisoes();
        moveObstaculo1();
        moveObstaculo2();
    }
    function mostrarPontos() {
        $(".qtdMoedas").html(player.qtdMoedas);
        $(".vidas").html(player.vidas + "x");
    }
    function atualizarDanos() {
        if (player.qtdMoedas == 0)
            player.vidas--;
        player.qtdMoedas = 0;
        player.qtdMoedasVida = 0;
        mostrarPontos();

    }

    function matarPlayer() {
        $(".player").removeClass("voando");
        $(".player").addClass("morto");
        if (player.vidas <= 0)
            document.getElementById("somMorteFinalJogador").play();
        else
            document.getElementById("somMorteJogador").play();

        setTimeout(function () {
            $(".player").removeClass("morto");
            $(".player").addClass("voando");
            atingirPlayer();
        }, 700);
    }
    function atingirPlayer() {
        $(".player").removeClass("voando");
        $(".player").addClass("atingido");
        document.getElementById("somJogadorAtacado").play();

        setTimeout(function () {
            $(".player").removeClass("atingido");
            $(".player").addClass("voando");

        }, 1000);
    }
    function testeAtingirPlayer() {
        if (player.qtdMoedas == 0) {
            matarPlayer();
        } else {
            atingirPlayer();
        }
    }

    function checarColisoes() {
        if (Math.floor(Date.now()) > player.ultimoTimerColisao + 100 || player.ultimoTimerColisao == 0) {

            player.ultimoTimerColisao = Math.floor(Date.now());


            $(".moeda").each(function (index, elem) {
                if ($(".player").attr("class") == "player voando" && checarColisao($(".player"), elem)) {
                    document.getElementById("somMoeda").play();
                    $(elem).remove();
                    player.qtdMoedas++;
                    player.qtdMoedasVida++;

                    if (player.qtdMoedasVida >= 10) {
                        player.vidas++;
                        player.qtdMoedasVida = 0;

                    }
                    mostrarPontos();

                }

            });

            $(".alien1").each(function (index, elem) {
                if ($(".player").attr("class") == "player voando" && checarColisao($(".player"), elem)) {
                    player.qtdMoedas = 0;
                    atualizarDanos();
                    matarPlayer();

                }
            });
            $(".obstaculo1").each(function (index, elem) {
                if ($(".player").attr("class") == "player voando" && checarColisao($(".player"), elem)) {
                    testeAtingirPlayer();
                    atualizarDanos();
                }
            });
            $(".obstaculo2").each(function (index, elem) {
                if ($(".player").attr("class") == "player voando" && checarColisao($(".player"), elem)) {
                    testeAtingirPlayer();
                    atualizarDanos();
                }
            });


        }
        if (Math.floor(Date.now()) > player.ultimoTimerColisaoTiro + 100 || player.ultimoTimerColisaoTiro == 0) {
            player.ultimoTimerColisaoTiro = Math.floor(Date.now());
            $(".tiro").each(function (indexTiro, elemTiro) {
                $(".alien1").each(function (indexAlien1, elemAlien1) {
                    if (checarColisao(elemTiro, elemAlien1)) {
                        $(elemAlien1).removeClass("alien1");
                        $(elemAlien1).addClass("alien1Atingido");
                        document.getElementById("somMorteObstaculo").play();
                        $(elemTiro).remove();
                        setTimeout(function () {

                            $(elemAlien1).remove();
                        }, 1000);

                    }
                });
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