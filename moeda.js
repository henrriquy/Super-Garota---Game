function npc() {
}
npc.prototype.velociadade = 0;
npc.prototype.quantidade = 0;
npc.prototype.posicao = { x: 1300, y: 0 }
npc.prototype.elementos = [];
npc.prototype.orientacao = 'h';
npc.prototype.class = null;
npc.prototype.add = function () {
    for (var i = 1; i <= this.quantidade; i++) {
        this.elementos[i] = $("<div>", { class: this.class });
        $(".cena").append(this.elementos[i]);
        
        switch (this.orientacao) {
           case 'h':
                $(this.elementos[i]).css("left", this.posicao.x + (parseInt($(this.elementos[i]).css("width"))* i));
                this.elementos[i].css("top", this.posicao.y);
                break;
            case 'v':
                this.elementos[i].css("top", this.posicao.y + (parseInt($(this.elementos[i]).css("height")) * i));
                this.elementos[i].css("left", this.posicao.x);
                break;
        }
        
        $(this.elementos[i]).animate({ "left": "-=2000px" }, this.velociadade, "linear", function () {
            this.remove();
        });
    }

}

function addMoedas() {
    var objNpc = new npc();
    objNpc.velociadade = 6000;
    objNpc.quantidade = Math.floor((Math.random() * 10));
    objNpc.posicao.y = Math.floor((Math.random() * 480));
    objNpc.class = "moeda";
    objNpc.add();
}
function addAlien1() {
    var objNpc = new npc();
    objNpc.velociadade = 5000;
    objNpc.quantidade = 1;
    objNpc.posicao.y = Math.floor((Math.random() * 480));
    objNpc.class = "alien1";
    objNpc.add();
}
function addObstaculo1() {
    var objNpc = new npc();
    objNpc.velociadade = 6000;
    objNpc.quantidade = Math.floor((Math.random() * 5));
    objNpc.orientacao='v';
    objNpc.class = "obstaculo1";
    objNpc.add();
}
function addObstaculo2() {
    var objNpc = new npc();
    objNpc.velociadade = 6000;
    objNpc.quantidade = Math.floor((Math.random() * 5));
    objNpc.orientacao='v';
    objNpc.class = "obstaculo2";
    objNpc.add();
}
/*
npc.prototype.moeda = function () {
    var velociadade = 6000;
    var quantidade = Math.floor((Math.random() * 10));
    var eixoY = Math.floor((Math.random() * 500));
    var elementoGrupoMoedas = [];
    for (var i = 1; i <= quantidade; i++) {
        elementoGrupoMoedas[i] = $("<div>", { class: "moeda", style: "left:" + (1300 + (39 * i)) + "; top:" + eixoY + ";" });
        $(".cena").append(elementoGrupoMoedas[i]);
        $(elementoGrupoMoedas[i]).animate({ "left": "-=2000px" }, velociadade, "linear", function () {
            this.remove();
        })
    }

}
*/