$("#search-car-firm").hide();

$("#seared").click(function () {
    $("#search-car-firm").toggle();
});

$("#select-model-all").change(function () {
    $(".checkbox-model").prop('checked', $(this).prop("checked"));
});