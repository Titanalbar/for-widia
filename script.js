function resizeAlbum() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    
    if (screenWidth < screenHeight && screenWidth < 768) {
        $('#notifikasi-hp').css('display', 'flex');
        $('#album-romantis').hide();
        return;
    } else {
        $('#notifikasi-hp').hide();
        $('#album-romantis').show();
    }

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
    var lagu = document.getElementById('bg-lagu');
    var tombolMusik = $('#tombol-musik');
    
    // Inisialisasi Turn.js
    album.turn({
        width: 800,
        height: 500,
        autoCenter: true,
        duration: 1200
    });

    resizeAlbum();
    $(window).resize(resizeAlbum);

    // LOGIKA AUDIO: Putar otomatis saat klik pertama kali di layar
    $(document).one('click', function() {
        lagu.play().then(function() {
            tombolMusik.addClass('playing');
        }).catch(function(error) {
            console.log("Autoplay diblokir browser, klik tombol manual.");
        });
    });

    // Fungsi klik tombol manual (Play/Pause)
    tombolMusik.on('click', function(e) {
        e.stopPropagation(); // Mencegah lembar buku ikut terbalik saat klik tombol musik
        if (lagu.paused) {
            lagu.play();
            tombolMusik.addClass('playing');
        } else {
            lagu.pause();
            tombolMusik.removeClass('playing');
        }
    });

    // Sistem Klik Navigasi Buku
    $(document).on('click', function(e) {
        if ($(e.target).closest('#tombol-musik').length) return;

        var screenCenter = $(window).width() / 2;
        if (e.pageX > screenCenter) { 
            album.turn('next');
        } else {
            album.turn('previous');
        }
    });

    // Arrow Keyboard Navigasi
    $(document).keydown(function(e){
        if (e.keyCode == 37) { album.turn('previous'); } 
        if (e.keyCode == 39) { album.turn('next'); }     
    });
});