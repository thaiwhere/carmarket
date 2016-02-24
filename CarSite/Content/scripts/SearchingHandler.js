function expandSearching() {
    $("#search-car-firm").show();
    $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");
}

function collapseSearching() {
    $("#search-car-firm").hide();
    $("#span_searching").removeClass("collapse_searching").addClass("expand_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");
}
