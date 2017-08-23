var tag = document.querySelectorAll("a.etiket.kapat");
Array.prototype.forEach.call(tag, function(el, i) {
    var tagSpan = document.createElement("span");
    tagSpan.className += "etiket-kaldir";
    tagSpan.innerHTML = "&times";
    el.appendChild(tagSpan);
    tag[i].addEventListener("click", function() {
        el.remove();
    }, false);
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

$placeholder = ".tr-input,.tr-textarea";
placeholder();

function placeholder() {
    $($placeholder).each(function() {
        var placeholder = $(this).attr("placeholder");
        if (placeholder !== undefined && placeholder !== "") {
            var inputId = $(this).attr("id");
            $("body").find("[for='" + inputId + "']").css({
                "color": "#057970",
                "font-size": ".75em",
                "top": "0"
            });
        }
    });
}

var textarea = document.getElementsByClassName("tr-textarea");
Array.prototype.forEach.call(textarea, function(el) {
    el.addEventListener("keyup", function (e) {
        var lineCount = el.value.split(/\r|\r\n|\n/).length;
        var newHeight = ++lineCount * 1.2;
        el.style.height = (lineCount > 4) ? newHeight.toString() + "em" : "6em";
    }, false);
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
$(".tr-tab").each(function(){
    $(this).find(".tab-icerik:not(:first-child)").addClass("gizle")
            .end()
            .find("nav>a:first").addClass("aktif");
});
$(".tr-tab").on("click", "nav>a", function(e) {
    var index = $(this).index();
    $(this).addClass("aktif").siblings().removeClass("aktif")
            .end().closest(".tr-tab")
            .find(".tab-icerikler").children().filter(".tab-icerik").eq(index).removeClass("gizle").siblings().addClass("gizle");
});

$(".tr-filtre [data-source='hepsi'], .filtre-icerik").addClass("aktif");
$(".tr-filtre").on("click", "nav a", function() {
    var source = $(this).data("source");
    $(this).addClass("aktif").siblings().removeClass("aktif").parents(".tr-filtre").find(".filtre-icerik").addClass("aktif").not("[data-target^=" + source + "]").removeClass("aktif");
    if (source == "hepsi" || source == "hepsi aktif") {
        $(this).parents(".tr-filtre").find(".filtre-icerik").addClass("aktif");
    }
})

$(".akordiyon-icerik").hide();
$(".tr-akordiyon > .akordiyon-baslik").on("click", function() {
    var t = $(this);
    var i = t.closest(".tr-akordiyon").children(".akordiyon-baslik").index(t);
    if (t.hasClass("aktif")) {
        t.removeClass("aktif").closest(".tr-akordiyon").children(".akordiyon-icerik").slideUp(250);
    } else {
        t.siblings().removeClass("aktif").end().addClass("aktif").closest(".tr-akordiyon").children(".akordiyon-icerik").eq(i).slideDown(250).siblings(".akordiyon-icerik").slideUp(250);
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
        overlay.animate({opacity: ".5"}, 250);
    }
});
$("body").on("click", "a.kapat,.tr-karart", function(e) {
    e.preventDefault();
    $(".tr-modal").removeClass("goster");
    $.when($(".tr-karart").fadeOut()).done(function() {
        $(".tr-karart").remove();
    });
});
