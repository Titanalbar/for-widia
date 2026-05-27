function resizeAlbum() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    
    var maxWidth = screenWidth - 20; 
    var maxHeight = screenHeight - 20;
    
    var scale = Math.min(maxWidth / 800, maxHeight / 500);
    if (scale > 1) { scale = 1; }
    
    $('#album-romantis').css({
        'transform': 'scale(' + scale + ')'
    });
}

$(window).on('load', function() {
    var album = $('#album-romantis');
    
    album.show(); 

    album.turn({
        width: 800,
        height: 500,
        autoCenter: true,
        duration: 1200
    });

    resizeAlbum();
    $(window).resize(resizeAlbum);

    // SISTEM KLIK SISI LAYAR
    $(document).on('click', function(e) {
        var screenCenter = $(window).width() / 2;
        
        if (e.pageX > screenCenter) { 
            album.turn('next');
        } 
        else {
            album.turn('previous');
        }
    });

    // Tombol Keyboard Arrow
    $(document).keydown(function(e){
        if (e.keyCode == 37) { album.turn('previous'); } 
        if (e.keyCode == 39) { album.turn('next'); }     
    });
});