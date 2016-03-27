$(function () {        
    if (location.href.indexOf("home") > -1) {
        $.cookie("tabIndex", 1, { path: '/' });
        handler.inActiveTab($("#div_searching_criteria"));
        $("#car_for_you").addClass("tabactive");
    }
});
