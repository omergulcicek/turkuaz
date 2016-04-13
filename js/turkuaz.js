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
$input = "input[type=text],input[type=password],input[type=email],input[type=url],input[type=date],input[type=tel],input[type=number],input[type=search]";
//inputlara tiklandiginda labelin alta gelmesi
$($input).focus(function(){
    $(this).addClass("aktif dolu");
})
//inputtan ayrilindiginda, inputa yazi yoksa label eski haline doner, yazi varsa label aktif kalir
$($input).focusout(function(){
    if($(this).val() == ""){
        $(this).removeClass("dolu");
    }
    $(this).removeClass("aktif");
})

/* ============= 1.5 Radio Button */
/* ============= 1.6 Tarih Secici */
/* ============= 1.7 Textarea */
