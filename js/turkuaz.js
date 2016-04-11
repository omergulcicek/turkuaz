/*!
* Turkuaz Framework v1.0
* www.turkuazcss.com
*/

/*!
*    Turkuaz Framework - JavaScript Kod Duzeni
*
*    1.     Form
*      1.1    Checkbox
*      1.2    Combobox
*      1.3    Dosya Secici
*      1.4    Input
*      1.5    Radio Buton
*      1.6    Tarih Secici
*      1.7    Textarea
*
*/



/* ============= 1. Form */
/* ============= 1.1 Checkbox */
/* ============= 1.2 Combobox */
/* ============= 1.3 Dosya Secici */

/* ============= 1.4 Input */
//inputlara tiklandiginda labelin alta gelmesi
$(".alan input").click(function(){
    $(this).parent().addClass("aktif dolu");
})
//inputtan ayrilindiginda, inputa yazi yoksa label eski haline doner, yazi varsa label aktif kalir
$(".alan input").focusout(function(){
    if($(this).val() == ""){
        $(this).parent().removeClass("dolu");
    }
    $(this).parent().removeClass("aktif");
})

/* ============= 1.5 Radio Button */
/* ============= 1.6 Tarih Secici */
/* ============= 1.7 Textarea */
