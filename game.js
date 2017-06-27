$(function () {

    document.getElementById("musica").volume=0.1;
    var grupoMoedas = {
        timerUltimoGrupo:0
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

    function moveGrupoMoedas()
    {
         if (Math.floor(Date.now()) > grupoMoedas.timerUltimoGrupo + 2000 || grupoMoedas.timerUltimoGrupo==0)
         {
             var objMoeda = new moeda();
             grupoMoedas.timerUltimoGrupo = Math.floor(Date.now());
            
         }
    }

    function playerAtirar() {
        if (Math.floor(Date.now() > player.ultimoTiro + 150)
            || player.ultimoTiro == 0) {
            player.ultimoTiro = Math.floor(Date.now());
            $("#player1")
                .removeClass("playerVoando")
                .addClass("playerAtirando")
                ;
            var objTiro = new tiro();
            setTimeout(playerVoar, 400);
        }
    }
    function playerVoar() {
        $("#player1")
            .removeClass("playerAtirando")
            .addClass("playerVoando")
            ;

    }
    function gameLoop() {
        movePlayer();
        moveGrupoMoedas();
    }

});