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

    var maxWidth = screenWidth - 40; 
    var maxHeight = screenHeight - 40;
    
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
        duration: 1500,
        gradients: true,
        elevation: 50
    });

    // === TRIK AUTOPLAY VIDEO SAAT HALAMAN DIBUKA ===
    album.bind("turning", function(event, page, view) {
        // Jeda (pause) semua video saat halaman sedang dibalik
        $("video").each(function() {
            this.pause();
        });
    });

    album.bind("turned", function(event, page, view) {
        // Otomatis mainkan video hanya pada halaman yang sedang terbuka (kiri/kanan)
        if (view[0]) {
            $('.p' + view[0] + ' video').each(function() {
                var playPromise = this.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(e) { console.log("Autoplay diblokir browser"); });
                }
            });
        }
        if (view[1]) {
            $('.p' + view[1] + ' video').each(function() {
                var playPromise = this.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(e) { console.log("Autoplay diblokir browser"); });
                }
            });
        }
    });
    // ===============================================

    resizeAlbum();
    $(window).resize(resizeAlbum);

    // LOGIKA AUDIO
    $(document).one('click', function() {
        lagu.play().then(function() {
            tombolMusik.addClass('playing');
        }).catch(function(error) {
            console.log("Autoplay diblokir browser, klik tombol manual.");
        });
    });

    tombolMusik.on('click', function(e) {
        e.stopPropagation(); 
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
        if ($(e.target).is('video')) return; // Jangan balik halaman kalau ngeklik video

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