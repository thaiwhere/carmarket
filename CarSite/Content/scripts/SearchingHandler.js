
$("#select-model-all").change(function () {
    $(".checkbox-model").prop('checked', $(this).prop("checked"));
});


$(function () {    
    $("#div-left").hide();
    $("#search-car-firm").show();
    $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");    
});