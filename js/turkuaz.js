/*!
* Turkuaz Framework v1.0
* www.turkuazcss.com
* MIT Lisansi (https://raw.githubusercontent.com/TurkuazCss/Framework/master/LICENSE)
*/

/*!
*    Turkuaz Framework - JavaScript Kod Duzeni
*
*   1. Etiket
*   1. Form
*   2. Menu
*   3. Notlar
*
*/



/* ============= 1. Etiket */

$("a.etiket.kapat").click(function(e){ e.preventDefault(); });
$("a.etiket.kapat").append("<span class=kaldir>&times;</span>")
                   .end()
                   .find("span.kaldir").click(function(){
                       $(this).parents("a.etiket.kapat").addClass("gizle");
                    });


/* ============= 2. Form */

$formEtiketleri = ".tr-input,.tr-checkbox,.tr-radio,.tr-textarea";

$($formEtiketleri).focus(function(){
    $(this).addClass("aktif dolu");
}).focusout(function(){
    if($(this).val() == ""){
        $(this).removeClass("dolu");
    }
    $(this).removeClass("aktif");
});



/* ============= 3. Menu */

$("nav.menu.mobil").on("click", "img.logo", function(){
    $(this).hide()
           .parent().animate({left:"0"});
    $("body").append("<div class=karart></div>");
});

$("body").on("click", ".karart", function(){
    $(this).remove();
    $("nav.menu.mobil").animate({left:"-240px"})
                       .find("img.logo").delay(400).fadeIn();
});

$("nav.menu ul li").find("ul li a").parent().parent().parent().addClass("acilir");

$("body").on("click", "nav.menu.mobil ul li.acilir", function(){
    var yukseklik = $(this).find("li").length * 45;
    $(this).find("ul").css({
        "height": yukseklik + "px"
    })
        .slideToggle("500")
        .parent().siblings(".acilir")
        .find("ul:visible").slideToggle("500");
});

function mobil(){
    if ($(window).width() <= 1000) {
        $("nav.menu.mobil").addClass("mobilmenu");
    }
    else {
        $("nav.menu.mobil").removeClass("mobilmenu");
    }
    $("nav.menu ul li.acilir ul").each(function(){
        $(this).hide("600");
    });
}

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
$(".filtre [data-target=hepsi]").addClass("aktif");
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



/* ============= 4. Notlar */

$("div.not").append("<span class=kaldir>&times;</span>");

$("div.not").on("click", "span.kaldir", function(){
    $(this).parents("div.not").addClass("gizle")
})
