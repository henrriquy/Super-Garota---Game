function moeda() {
    var velociadade = 6000;
    var quantidade = Math.floor((Math.random() * 10));
    var eixoY = Math.floor((Math.random() * 500));
    var elementoGrupoMoedas = $("<div>", { class: "grupoMoedas", style: "top:" + eixoY + ";" });
    for (var i = 0; i <= quantidade; i++) {
        elementoGrupoMoedas.append($("<div>", { class: "moeda" }));
    }
    $(".cena").append(elementoGrupoMoedas);
    elementoGrupoMoedas.animate({ "left": "-=2000px" }, velociadade, "linear", function () {
        elementoGrupoMoedas.remove();
    });
}