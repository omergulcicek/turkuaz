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
    //ilk sekmeye aktif sinifini ekler.
    $(this).find(".sekme:first").addClass("aktif");
    //iceriklerin tamamını gizler.
    $(this).find(".icerik").hide();
    //ilk icerigi gosterir.
    $(this).find(".icerik:first").show();
});

$(".tab .sekme").parent().css("width",function(){
    //sekmelerin genislik yuzdesini ayarlar.
    return  100 / ($(this).parent().children("li").length) + "%";
})

$(".tab .sekme").click(function() {
    //sekmelerdeki aktif sinifini kaldirir.
    $(this).parent().siblings().find(".sekme").removeClass("aktif");
    //tiklanan sekmeye aktif sinifini ekler.
    $(this).addClass("aktif");
    //iceriklerin hepsini gizler.
    $(this).parents().find(".tab .icerik").hide();
    //kacinci sekme secildiyse, o sekmenin icerigini gosterir.
    $(this).parents().find(".tab .icerik:eq(" + $(this).parent().index() + ")").show();
});

// Filtre Menu
//s0 sinifina ait sekmeyi aktif yapar.
$(".filtre .sekme.s0").addClass("aktif");
$(".filtre .sekme").click(function() {
    //tiklanan sekmenin sinifini alir.
    var sinif = $(this).attr("class");
    //siniftan 'sekme' yazisini siler.
    sinif = sinif.replace("sekme " , "");
    //secilen sekmeye aktif sinifini ekleyip, diger sekmelerden aktif sinifini siler.
    $(this).addClass("aktif").parent().siblings().find("a").removeClass("aktif");
    if(sinif == "s0" || sinif == "s0 aktif") {
        //s0 sinifi secildiyse tum icerikler gosterilir.
        $(this).parents().find(".icerik").show();
    }
    else {
        //siniftan 'aktif' yazisini siler.
        sinif = sinif.replace(" aktif" , "");
        //secilen sinif haricindeki diger icerikleri gizler.
        $(this).parents().find(".filtre").find(".icerik:not(." + sinif + ")").hide();
        //secilen siniftaki tum icerikleri gosterir.
        $(this).parents().find(".filtre").find(".icerik." + sinif).fadeIn();
    }
});



/* ============= 3. Notlar */

// Notlara Kapatma Butonu Getirir
//not class'ina ait tag'lari kapatmak icin sag ustune 'x' butonunu ekler.
$("div.not").append("<span class=kaldir>&times;</span>");

// Notlarin Kaldirilmasi
//'x' butonuna basinca o notu kaldirir.
$("div.not span.kaldir").click(function(){
    $(this).parent().fadeOut();
});
