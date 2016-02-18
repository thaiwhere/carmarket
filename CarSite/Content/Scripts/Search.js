$("#search-car-firm").hide();

$("#span_searching").click(function () {
    $("#search-car-firm").toggle();

    if ($('#span_searching').hasClass("expand_searching")) {
        $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    }
    else {
        $("#span_searching").removeClass("collapse_searching").addClass("expand_searching");
    }
});

$("#select-model-all").change(function () {
    $(".checkbox-model").prop('checked', $(this).prop("checked"));
});