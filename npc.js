function npc() {
}
npc.prototype.velociadade = 0;
npc.prototype.quantidade = 0;
npc.prototype.posicao = { x: 1024, y: 0 }
npc.prototype.elementos = [];
npc.prototype.orientacao = 'h';
npc.prototype.class = null;
npc.prototype.add = function () {
    for (var i = 1; i <= this.quantidade; i++) {
        this.elementos[i] = $("<div>", { class: this.class });
        $(".cena").append(this.elementos[i]);

        switch (this.orientacao) {
            case 'h':
                $(this.elementos[i]).css("left", this.posicao.x + (parseInt($(this.elementos[i]).css("width")) * i));
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
    objNpc.velociadade = 6000;
    objNpc.quantidade = 1;
    objNpc.posicao.y = Math.floor((Math.random() * 400));
    objNpc.class = "alien1";
    objNpc.add();
}
function addObstaculo1() {
    var objNpc = new npc();
    objNpc.velociadade = 5000;
    objNpc.quantidade = Math.floor((Math.random() * 10)) + 2;
    objNpc.orientacao = 'v';
    objNpc.posicao.y = Math.floor((Math.random() * 100));;
    objNpc.class = "obstaculo1";
    objNpc.add();
}
function addObstaculo2() {
    var objNpc = new npc();
    objNpc.velociadade = 5000;
    objNpc.quantidade = Math.floor((Math.random() * 4)) + 1;
    objNpc.orientacao = 'v';
    objNpc.class = "obstaculo2";
    objNpc.posicao.y = Math.floor((Math.random() * 100));;
    objNpc.add();
}
