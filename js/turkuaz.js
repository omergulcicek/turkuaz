$("a.etiket.kapat").click(function(e) {
    e.preventDefault();
});
$("a.etiket.kapat").append("<span class=kaldir>&times</span>").end().find("span.kaldir").click(function() {
    $(this).parents("a.etiket.kapat").addClass("gizle");
});


$("select.tr-select").each(function() {
    var optionLength = $(this).children("option").length;
    $(this).addClass("gizle").wrap("<div class='select'></div>").after("<div class='tr-select-secili'></div>");
    var selectSecili = $(this).next("div.tr-select-secili");
    selectSecili.text($(this).children("option").eq(0).text());
    var list = $("<ul/>", {
        "class": "tr-select"
    }).insertAfter(selectSecili);
    for (var i = 0; i < optionLength; i++) {
        $("<li/>", {
            text: $(this).children("option").eq(i).text(),
            rel: $(this).children("option").eq(i).val()
        }).appendTo(list);
    }
    var li = list.children("li");
    selectSecili.click(function(e) {
        e.stopPropagation();
        $("div.selectSecili.aktif").each(function() {
            $(this).removeClass("aktif").next("ul.tr-select").hide();
        });
        $(this).toggleClass("aktif").next("ul.tr-select").toggle();
    });
    li.click(function(e) {
        e.stopPropagation();
        selectSecili.text($(this).text()).removeClass("aktif");
        $(this).val($(this).attr("rel"));
        list.hide();
    });
    $(document).click(function() {
        selectSecili.removeClass("aktif");
        list.hide();
    });
});

$formEtiketleri = ".tr-input,.tr-search,.tr-checkbox,.tr-radio,.tr-textarea";
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
    var l = t.next("label.tr-label");
    var line = t.val().split("\n").length * 20;
    if (line > 100) {
        t.css("height", line);
        l.attr('style', 'transform: translateY(-' + (line+30) + 'px) scale(.75) !important');
    } else {
        t.css("height", 100);
        if (l.hasClass("dolu")) {
            l.attr('style', 'transform: translateY(-130px) scale(.75) !important');
        }
        else {
            l.attr('style', '');
        }
    }
});
$("nav.mobil li ul, nav.menu li ul").parents("li").addClass("acilir");
$("nav.mobil li.acilir ul").hide();
$("nav.mobil").on("click", "li.acilir>a", function() {
    $(this).parents("li.acilir:first").find("ul:first").slideToggle();
});
$("body").on("click", ".menuac", function() {
    $(this).animate({
        opacity: "0"
    }, 10).parents("body").append("<div class='tr-karart menu'></div>").find("nav.mobil").scrollTop(0);
    if ($("nav.mobil").hasClass("sag")) {
        $("nav.mobil").animate({
            right: "0"
        });
    }
    else {
        $("nav.mobil").animate({
            left: "0"
        });
    }
});
$("body").on("click", ".tr-karart.menu", function() {
    $(this).remove();
    $(".menuac").delay(400).animate({
        opacity: "1"
    }, 250);
    if ($("nav.mobil").hasClass("sag")) {
        $("nav.mobil").animate({
            right: "-250px"
        });
    }
    else {
        $("nav.mobil").animate({
            left: "-250px"
        });
    }
});
(function($) {
    $.fn.tab = function(ayarlar) {
        var obj = $.extend({
            "aktifSinifi": "aktif",
            "icerikSinifi": "tab-icerik",
            "aktifSekme": 1,
            "tema": ""
        }, ayarlar);
        return this.each(function() {
            $(this).addClass("tr-tab " + obj.tema).find("nav a").eq(obj.aktifSekme - 1).addClass(obj.aktifSinifi).parents(".tr-tab").find("." + obj.icerikSinifi).addClass("tab-icerik gizle").eq(obj.aktifSekme - 1).removeClass("gizle");
            $(this).find("nav a").click(function() {
                var index = $(this).index();
                $(this).addClass(obj.aktifSinifi).siblings().removeClass(obj.aktifSinifi).parents(".tr-tab").find("." + obj.icerikSinifi).addClass("gizle").eq(index).removeClass("gizle");
            });
        });
    };
})(jQuery);
$(".tr-tab").tab();


$(".tr-filtre [data-source='hepsi'], .filtre-icerik").addClass("aktif");
$(".tr-filtre").on("click", "nav a", function() {
    var source = $(this).data("source");
    $(this).addClass("aktif").siblings().removeClass("aktif").parents(".tr-filtre").find(".filtre-icerik").addClass("aktif").not("[data-target^=" + source + "]").removeClass("aktif");
    if (source == "hepsi" || source == "hepsi aktif") {
        $(this).parents(".tr-filtre").find(".filtre-icerik").addClass("aktif");
    }
})

$(".akordiyon-icerik").hide();
$(".tr-akordiyon > .baslik").on("click", function() {
    var t = $(this);
    var i = t.closest(".tr-akordiyon").children(".baslik").index(t);
    if (t.hasClass("aktif")) {
        t.removeClass("aktif").closest(".tr-akordiyon").children(".akordiyon-icerik").slideUp(100);
    } else {
        t.siblings().removeClass("aktif").end().addClass("aktif").closest(".tr-akordiyon").children(".akordiyon-icerik").eq(i).slideDown(100).siblings(".akordiyon-icerik").slideUp(100);
    }
})
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
