function resizeAlbum() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    
    // 1. Logika Deteksi HP Tegak (Portrait) vs Miring (Landscape)
    if (screenWidth < screenHeight && screenWidth < 768) {
        $('#notifikasi-hp').css('display', 'flex'); // Tampilkan pesan suruh miringkan HP
        $('#album-romantis').hide();
        return;
    } else {
        $('#notifikasi-hp').hide(); // Sembunyikan pesan jika posisi sudah miring/di laptop
        $('#album-romantis').show();
    }

    // 2. Kalkulasi Auto-Zoom yang Presisi tanpa Distorsi
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
    
    // Inisialisasi Turn.js
    album.turn({
        width: 800,
        height: 500,
        autoCenter: true,
        duration: 1200
    });

    // Jalankan fungsi responsif pertama kali
    resizeAlbum();
    
    // Deteksi otomatis jika layar berputar atau browser di-resize
    $(window).resize(resizeAlbum);

    // Sistem Klik Layar
    $(document).on('click', function(e) {
        var screenCenter = $(window).width() / 2;
        if (e.pageX > screenCenter) { 
            album.turn('next');
        } else {
            album.turn('previous');
        }
    });

    // Tombol Arrow Keyboard
    $(document).keydown(function(e){
        if (e.keyCode == 37) { album.turn('previous'); } 
        if (e.keyCode == 39) { album.turn('next'); }     
    });
});