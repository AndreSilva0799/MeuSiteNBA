$(function(){
    $(".thumbnails .item").on("click", function(){
        // Obtenha a URL do vídeo do atributo data-video
        var videoURL = $(this).data('video');

        // Atualize o src do iframe com a URL do vídeo
        $(".video-container iframe").attr("src", videoURL);

        // Restaurar o controle de volume para o valor padrão (1)
        $("#volume").val(1);
        $(".video-container iframe")[0].volume = 1;

        // Iniciar o vídeo automaticamente ao trocar de vídeo
        $(".video-container iframe")[0].play();

        
    });

    $("#volume").on("mousemove", function(){
        $(".video-container iframe")[0].volume = parseFloat($(this).val());
    });

    $("#btn-play-pause").on("click", function(){
        var video = $(".video-container iframe")[0];
        if($(this).hasClass("btn-success")) {
            $(this).text("PAUSE");
            video.play();
        } else {
            $(this).text("PLAY");
            video.pause();
        }

        $(this).toggleClass("btn-success btn-danger");
    });
});


   $(document).ready(function () {  /* quando o documento estiver pronto excuta o js*/
$("#logotipo").on("mouseover", function () {

    $("#banner h1").addClass("efeito");

}).on("mouseout", function () {

    $("#banner h1").removeClass("efeito");

});

$("#input-search").on("focus", function () {

    $("li.search").addClass("ativo");

}).on("blur", function () {

    $("li.search").removeClass("ativo");

});

$(".thumbnails").owlCarousel({ /*usando o plugin do jquery e fazendo um responsive com as imagens de ultimas noticias*/
    loop: true,
    margin: 10, /*aqui estou separando um pouco as imagens*/
    //nav:true,
    //navText:["Anterior","Proximo"], /* um botãozinho de anterior e proximo */
    responsive: { /*aqui estou controlando pela resolução quantas imagens deve aparecer para cada resolução*/
        0: {
            items: 1
        },
        480: {
            items: 4
        },
        1000: {
            items: 4
        }
    }
});
});