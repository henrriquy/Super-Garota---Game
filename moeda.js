function moeda() {
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