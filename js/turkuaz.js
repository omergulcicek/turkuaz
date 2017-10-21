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
*    2.     Renk Gecisi
*    3.     Etiket Kapat
*    4.     Input Uzunluk
*    5.     Textarea Otomatik Yukseklik
*    6.     Modal
*    7.     Select
*    8.     Popovers
*    9.     Mobil Menu
*    10.    Tab Menu
*    11.    Akordiyon Menu
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

/* ============= 2. Renk Gecisi  */

var gradient = document.querySelectorAll("[tr-gradient]");
Array.prototype.forEach.call(gradient, function(el, i) {
	var attributeValue = el.attributes["0"].value;
	el.style.backgroundImage = "linear-gradient(to " + attributeValue + ")";
});

/* ============= 3. Etiket Kapat  */

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

/* ============= 4. Input Uzunluk  */

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

/* ============= 5. Textarea Otomatik Yukseklik  */

var textarea = document.getElementsByClassName("tr-textarea");
Array.prototype.forEach.call(textarea, function(el) {
    el.addEventListener("keyup", function () {
        var lineCount = el.value.split(/\r|\r\n|\n/).length;
        var newHeight = ++lineCount * 1.2;
        el.style.height = (lineCount > 4) ? newHeight.toString() + "em" : "6em";
    }, false);
});

/* ============= 6. Modal  */

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
    var modalVisible = document.querySelectorAll(".tr-modal.goster")["0"];
    if(overlayCount && typeof modalVisible !== "undefined") {
        fadeOut(overlay);
        modalVisible.classList.remove("goster");
        setTimeout(function(){
            overlay.remove();
        }, 250);
    }
}, false);

/* ============= 7. Select  */

var select = document.querySelectorAll("select");
Array.prototype.forEach.call(select, function(el, i) {
	var options = el.getElementsByTagName("option");
	var optionsLength = options.length;

	var div = document.createElement("div");
	div.className += "tr-dropdown";

	var span = document.createElement("span");
	span.className += "dropdown-secili";
	span.innerHTML = "Seçiniz";

	div.appendChild(span);

	var ul = document.createElement("ul");
	ul.className += "dropdown-icerik";

	for (var j=0; j<optionsLength; j++) {
		var li = document.createElement("li");
		li.innerHTML = options[j].text;
		ul.appendChild(li);
	}

	div.appendChild(ul);
	div.setAttribute("tr-dropdown",i);

	select[i].style.display = "none";

	select[i].parentNode.appendChild(div);
});

var dropdown = document.querySelectorAll(".tr-dropdown");
Array.prototype.forEach.call(dropdown, function(el, i) {
	dropdown[i].addEventListener("click", function(e) {
		e.preventDefault();
		el.classList.toggle("aktif");
	}, false);

	var liContent = dropdown[i].querySelectorAll("ul.dropdown-icerik li");
	var liContentLength = liContent.length;

	var span = dropdown[i].querySelectorAll("span.dropdown-secili");
	Array.prototype.forEach.call(liContent, function(el, i) {
		liContent[i].addEventListener("click", function(e) {
			e.preventDefault();
			for (var k=0; k<liContentLength; k++) {
				el.parentNode.querySelectorAll("li")[k].classList.remove("aktif");
			}
			el.classList.add("aktif");

			var selectText = el.innerHTML;
			var selectIndex = i;
			var whichSelect = span["0"].parentNode.getAttribute("tr-dropdown");
			span[0].textContent = selectText;
			select[whichSelect].selectedIndex = selectIndex;
		}, false);
	});
});

/* ============= 8. Popovers  */

var popovers = document.querySelectorAll(".tr-popovers");
Array.prototype.forEach.call(popovers, function(el, i) {
	el.addEventListener("click", function () {
		el.classList.toggle("aktif");
	}, false);
});

/* ============= 9. Mobil Menu  */

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

/* ============= 10. Tab Menu  */

var tabMenu =  document.querySelectorAll(".tr-tab");
Array.prototype.forEach.call(tabMenu, function(el, i) {
    var tabs = tabMenu[i].querySelectorAll(".tr-tab nav a");
    var tabContent = tabMenu[i].querySelectorAll(".tab-icerik");
    tabs["0"].classList.add("aktif");
    Array.prototype.forEach.call(tabContent, function(el, i) {
        tabContent[i].style.display = "none";
        tabContent["0"].style.display = "block";
        tabs[i].addEventListener("click", function(e) {
            e.preventDefault();
            Array.prototype.forEach.call(tabs, function(el, i) {
            	el.classList.remove("aktif");
            	tabContent[i].style.display = "none";
            });
            tabs[i].classList.add("aktif");
            tabContent[i].style.display = "block";
        }, false);
    });
});

/* ============= 11. Akordiyon Menu  */
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
