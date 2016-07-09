/*!
* Turkuaz Framework v1.0
* www.turkuazcss.com
*/

/*!
*    Turkuaz Framework - JavaScript Kod Duzeni
*
*   1. Form
*   2. Menu
*   3. Notlar
*
*/



/* ============= 1. Form */

// Radio ve checkbox haric diger inputlari ve textarea'yi degiskene atar.
$formEtiketleri = ".tr-input,.tr-checkbox,.tr-radio,.tr-textarea";

// Inputlarin Labellerinin Ilk Hareketleri
$($formEtiketleri).focus(function(){
    //inputlara ve textarea'ya imlec geldiginde bu tag'lara 'aktif dolu' sinifini ekler ve labeller uste gecer.
    $(this).addClass("aktif dolu");
});

// Input Labellerinin Sonraki Hareketleri
$($formEtiketleri).focusout(function(){
    //inputtan veya textarea'dan ayrilindiginda icerisinde yazi yoksa 'dolu' sinifini kaldirir ve label alta gecer, yazi varsa kaldirmaz.
    if($(this).val() == ""){
        $(this).removeClass("dolu");
    }
    //inputtan veya textarea'dan ayrilindiginda aktif class'ini kaldirir.
    $(this).removeClass("aktif");
});



/* ============= 2. Menu */

// Menuyu Acar
$("nav.menu.mobil>img.logo").click(function(){
    //mobil menuyu acmak icin butona basilinca butonu gizler.
    $(this).hide();
    //menuyu 0 left'e getirir (eskisi left:-240px) yani mobil menu gorunur.
    $(this).parent().animate({left:"0"});
    //body'e karart divini ekler ve menu harici her yeri karartir.
    $("body").append("<div class='karart'></div>");
});

// Menuyu Gizler
$("body").on('click', '.karart', function(){
    //menuyu 240px sola tasir yani gizler.
    $("nav.menu.mobil").animate({left:"-240px"});
    //karart divini kaldirir.
    $(".karart").remove();
    //400 milisaniye sonra logoyu gosterir.
    $("nav.menu.mobil>img.logo").delay(400).fadeIn();
});

// Acilir Menulerin Oklari
//menudeki li'lerin icerisinde alt menu var ise o li'ye 'acilir' class'ini ekler ve sagina minik bir ok gelir.
$("nav.menu ul li").find("ul li a").parent().parent().parent().addClass("acilir");

// Akordiyon Menu
$("body").on('click', 'nav.menu.mobil ul li.acilir', function(){
    //alt menudeki link sayisina gore ul'nin yuksekligini hesaplar.
    var yukseklik = $(this).find("li").length * 45;
    //alt menuye yukseklik degerini verir.
    $(this).find("ul").css({
        "height": yukseklik + "px"
        //500ms hizinda acilir menuyu gorunur yapar, diger acilir menuleri gizler.
    }).slideToggle("500").parent().siblings(".acilir").find("ul:visible").slideToggle("500");
});

// Mobil Menu
function mobil(){
    if ($(window).width() <= 1000) {
        //cozunurluk 1000px'in altina indiginde menuye mobil sinifini ekler.
        $("nav.menu.mobil").addClass("mobilmenu");
    }
    else {
        //cozunurluk 1000px'in ustunde mobil sinifini kaldirir.
        $("nav.menu.mobil").removeClass("mobilmenu");
    }
    $("nav.menu ul li.acilir ul").each(function(){
        //cozunurluk degistiginde acilir menuler gizlenir.
        $(this).hide("600");
    });
}

//cozunurluk her degistiginde mobil fonksiyonunu calistir.
mobil(); $(window).resize(function() { mobil(); });

// Tab Menu
$(".tab").each(function() {
    $(this).find("nav a:first").addClass("aktif")
           .end()
           .find(".icerik").removeClass("gizle")
           .not(".icerik:first").addClass("gizle")
});
$(".tab").on("click", "nav a", function(){
    var index = $(this).index();
    $(this).addClass("aktif")
           .siblings().removeClass("aktif")
           .end()
           .parents(".tab").find(".tr.icerik").addClass("gizle")
           .eq(index).removeClass("gizle")
})

// Filtre Menu
$(".filtre [data-target='hepsi']").addClass("aktif");
$(".filtre").on("click", "nav a", function(){
    var target = $(this).data("target");
    $(this).addClass("aktif")
           .siblings().removeClass("aktif")
           .end()
           .parents(".filtre").find(".tr.icerik").removeClass("gizle")
           .not("." + target).addClass("gizle")
    if(target == "hepsi" || target == "hepsi aktif") {
        $(this).parents(".filtre").find(".icerik").removeClass("gizle")
    }
})



/* ============= 3. Notlar */

// Notlara Kapatma Butonu Getirir
//not class'ina ait tag'lari kapatmak icin sag ustune 'x' butonunu ekler.
$("div.not").append("<span class=kaldir>&times;</span>");

// Notlarin Kaldirilmasi
//'x' butonuna basinca o notu kaldirir.
$("div.not span.kaldir").click(function(){
    $(this).parent().fadeOut();
});
