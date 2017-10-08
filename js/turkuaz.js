/*!
* Turkuaz Css v1.0.0
* www.turkuazcss.com
* MIT Lisansi (https://raw.githubusercontent.com/TurkuazCss/Framework/master/LICENSE)
* Roboto Yazi Stili (https://fonts.google.com/specimen/Roboto)
*/
/*!
*    Turkuaz Css - JavaScript Kod Duzeni
*
*    1.     Ortak Fonksiyonlar
*    2.     Etiket Kapat
*    3.     Input Uzunluk
*    4.     Textarea Otomatik Yukseklik
*    5.     Modal
*    6.     Select
*    7.     Mobil Menu
*    8.     Tab Menu
*    9.     Akordiyon Menu
*
*/
/* ============= 1. Ortak Fonksiyonlar  */

function fadeIn(el, time = 250) {
    var last = +new Date();
    var fade = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / time;
        last = +new Date();
        if (+el.style.opacity < 0.5) {
            (window.requestAnimationFrame && requestAnimationFrame(fade)) || setTimeout(fade, 16);
        }
    };
    fade();
}

function fadeOut(el, time = 250) {
    var last = +new Date();
    var fade = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / time;
        last = +new Date();
        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(fade)) || setTimeout(fade, 16);
        }
    };
    fade();
}

/* ============= 2. Etiket Kapat  */

var tag = document.querySelectorAll("a.etiket.kapat");
Array.prototype.forEach.call(tag, function(el, i) {
    var span = document.createElement("span");
    span.className += "etiket-kaldir";
    span.innerHTML = "&times";
    el.appendChild(span);
    tag[i].addEventListener("click", function() {
        el.remove();
    }, false);
});

/* ============= 3. Input Uzunluk  */

var inputLength = document.querySelectorAll("input[data-uzunluk]");
Array.prototype.forEach.call(inputLength, function(el, i) {
    inputLength[i].addEventListener("keyup", function() {
    	var maxLenght = el.getAttribute("data-uzunluk");
    	var currentLenght = el.value.length;
    	var span = el.parentNode.getElementsByTagName("span")[0];

    	if(typeof span == "undefined")
    	{
    		span = document.createElement("span");
    		el.parentNode.appendChild(span);
    	}

    	span.innerHTML = currentLenght  + '/' + maxLenght;

    	if(currentLenght > maxLenght)
    	{
    		el.style["border-bottom-color"] = "#F44336";
    	}
    	else if (currentLenght == 0) {
    		span.remove();
    		el.style["border-bottom-color"] = "";
    	}
    	else
    	{
    		el.style["border-bottom-color"] = "#03968A";
    	}
    }, false);
});

/* ============= 4. Textarea Otomatik Yukseklik  */

var textarea = document.getElementsByClassName("tr-textarea");
Array.prototype.forEach.call(textarea, function(el) {
    el.addEventListener("keyup", function () {
        var lineCount = el.value.split(/\r|\r\n|\n/).length;
        var newHeight = ++lineCount * 1.2;
        el.style.height = (lineCount > 4) ? newHeight.toString() + "em" : "6em";
    }, false);
});

/* ============= 5. Modal  */

var overlay = document.createElement("div");
overlay.className += "tr-karart modal";

var modal = document.querySelectorAll(".modal");
Array.prototype.forEach.call(modal, function(el, i) {
    modal[i].addEventListener("click", function(e) {
        e.preventDefault();
        var href = el.getAttribute("href");
        var modalTarget = document.getElementById(href);
        modalTarget.classList.add("goster");
        var overlayCount = document.querySelectorAll(".tr-karart").length;
        if(!overlayCount) {
            document.body.appendChild(overlay);
        }
        fadeIn(overlay);
    }, false);
});

function trModalClose(target = ".tr-modal a.kapat") {
    var modals = document.querySelectorAll(target);
    Array.prototype.forEach.call(modals, function(el, i) {
        modals[i].addEventListener("click", function(e) {
            e.preventDefault();
            overlay.click();
        }, false);
    });
}
trModalClose();

overlay.addEventListener("click", function() {
    var overlayCount = document.querySelectorAll(".tr-karart").length;
    if(overlayCount) {
        fadeOut(overlay);
        document.querySelectorAll(".tr-modal.goster")["0"].classList.remove("goster");
        setTimeout(function(){
            overlay.remove();
        }, 250);
    }
}, false);

/* ============= 6. Select  */

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

/* ============= 7. Mobil Menu  */

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

/* ============= 8. Tab Menu  */

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

/* ============= 8. Akordiyon Menu  */

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
