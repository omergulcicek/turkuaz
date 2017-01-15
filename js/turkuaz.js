/*!
 * Turkuaz Framework v1.0
 * www.turkuazcss.com
 * MIT Lisansi (https://raw.githubusercontent.com/TurkuazCss/Framework/master/LICENSE)
 */

/*!
 *    Turkuaz Framework - JavaScript Kod Duzeni
 *
 *   1. Etiket
 *   2. Form
 *   3. Link
 *   4. Menu
 *   5. Medya
 *   6. Modal
 *
 */



/* ============= 1. Etiket */

$("a.etiket.kapat").click(function(e) {
    e.preventDefault();
});

$("a.etiket.kapat").append("<span class=kaldir>&times</span>")
    .end()
    .find("span.kaldir").click(function() {
        $(this).parents("a.etiket.kapat").addClass("gizle");
    });

/* ============= 2. Form */

$formEtiketleri = ".tr-input,.tr-checkbox,.tr-radio,.tr-textarea";
$placeholder = ".tr-input,.tr-textarea";

placeholder();

$($formEtiketleri).focus(function() {
    var inputId = $(this).attr("id");
    $("body").find("[for='" + inputId + "']").addClass("dolu");
}).focusout(function() {
    var inputId = $(this).attr("id");
    if (!$(this).val()) {
        $("body").find("[for='" + inputId + "']").removeClass("dolu");
    }
    placeholder();
});

function placeholder() {
    $($placeholder).each(function() {
        var placeholder = $(this).attr("placeholder");
        if (placeholder !== undefined && placeholder !== "") {
            var inputId = $(this).attr("id");
            $("body").find("[for='" + inputId + "']").addClass("dolu");
        }
    });
}

$(".tr-textarea").on("keydown focusout", function(e) {
    var t = $(this);
    var line = t.val().split("\n").length * 20;
    if (line > 100) {
        t.css("height", line);
    }
    else {
        t.css("height", 100);
    }
});

/* ============= 3. Linkler */

$("body").on("click", "a.pasif,a.aktif,.butonlar.pasif a.buton", function(e) {
    e.preventDefault();
});

/* ============= 4. Menu */

//Mobil Menu

$("nav.mobil li ul, nav.menu li ul").parents("li").addClass("acilir");
$("nav.mobil li.acilir ul, nav.menu li.acilir ul").hide();
$("nav.mobil").on("click", "li.acilir>a", function() {
    $(this).parents("li.acilir:first").find("ul:first").slideToggle();
});
$("body").on("click", ".menuac", function() {
    $(this).animate({ opacity: "0" }, 10).parents("body").append("<div class='tr-karart menu'></div>").find("nav.mobil").scrollTop(0).animate({ left: "0" });
});
$("body").on("click", ".tr-karart.menu", function() {
    $(this).remove();
    $(".menuac").delay(400).animate({ opacity: "1" }, 250);
    $("nav.mobil").animate({ left: "-250px" });
})

// Tab Menu
;
(function($) {
    $.fn.tab = function(ayarlar) {
        var obj = $.extend({
            "aktifSinifi": "aktif",
            "icerikSinifi": "tr-tab-icerik",
            "aktifSekme": 1,
            "tema": ""
        }, ayarlar);
        return this.each(function() {
            $(this).addClass("tr-tab " + obj.tema)
                .find("nav a").eq(obj.aktifSekme - 1).addClass(obj.aktifSinifi)
                .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("tr-tab-icerik gizle")
                .eq(obj.aktifSekme - 1).removeClass("gizle");
            $(this).find("nav a").click(function() {
                var index = $(this).index();
                $(this).addClass(obj.aktifSinifi)
                    .siblings().removeClass(obj.aktifSinifi)
                    .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("gizle")
                    .eq(index).removeClass("gizle");
            });
        });
    };
})(jQuery);

$(".tr-tab").tab();

// Filtre Menu
$(".tr-filtre [data-source=hepsi]").addClass("aktif");
$(".tr-filtre").on("click", "nav a", function() {
    var source = $(this).data("source");
    $(this).addClass("aktif")
        .siblings().removeClass("aktif")
        .end()
        .parents(".tr-filtre").find(".tr.icerik").removeClass("gizle")
        .not("[data-target^=" + source + "]").addClass("gizle");
    if (source == "hepsi" || source == "hepsi aktif") {
        $(this).parents(".tr-filtre").find(".icerik").removeClass("gizle");
    }
})

// Akordiyon Menu
;
(function($) {
    $.fn.akordiyon = function(ayarlar) {
        var obj = $.extend({
            "aktifSinifi": "aktif",
            "baslikSinifi": "baslik",
            "icerikSinifi": "tr-akordiyon-icerik",
            "aktifSekme": 1,
            "sure": 200,
            "gecikme": 0,
            "tema": ""
        }, ayarlar);
        return this.each(function() {
            $sekmeSayisi = $("." + obj.baslikSinifi, this).length;
            if (Math.abs(obj.aktifSekme) > $sekmeSayisi) {
                obj.aktifSekme = $sekmeSayisi;
            }
            $(this).addClass("tr-akordiyon " + obj.tema)
                .find("." + obj.icerikSinifi).addClass("tr-akordiyon-icerik").delay(obj.gecikme).slideUp(obj.sure)
                .eq(obj.aktifSekme - 1).slideDown(obj.sure)
                .end().end().find("." + obj.baslikSinifi).eq(obj.aktifSekme - 1).addClass("aktif");
            $(this).find("." + obj.baslikSinifi).click(function(e) {
                e.preventDefault();
                $(this).toggleClass(obj.aktifSinifi).siblings("." + obj.baslikSinifi).removeClass(obj.aktifSinifi)
                    .end().next().delay(obj.gecikme).slideToggle(obj.sure)
                    .end().next().delay(obj.gecikme).siblings("." + obj.icerikSinifi).slideUp(obj.sure);
            });
        });
    };
})(jQuery);

/* ============= 5. Medya */


/* ============= 6. Modal */

$("body").on("click", "a.modal", function(e) {
    e.preventDefault();
    var href = $(this).attr("href");
    var modal = $("#" + href);
    var overlay = $("<div class='tr-karart'></div>");
    modal.addClass("goster").scrollTop(0);
    if (!$(".tr-karart").length) {
        $("body").append(overlay);
    }
});

$("body").on("click", "a.kapat,.tr-karart", function(e) {
    e.preventDefault();
    $(".tr-modal").removeClass("goster");
    $(".tr-karart").remove();
});
