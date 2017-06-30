function tiro() {
    document.getElementById("somTiro").play();
    
    valocidade = 500;
    vivo = true;
    var elementTiro = $("<div>",
        {
            class: "tiro",
            style: "left:" + (parseInt($("#player1").css("left"))+135) + 
            ";" + 
            "top:" + (parseInt($("#player1").css("top"))+62) + ";"
        });
    $(".cena").append(elementTiro);
    
    elementTiro.animate({ "left": "+=1024px" }, 1500, "linear", function () {
        elementTiro.remove();
    });
}
