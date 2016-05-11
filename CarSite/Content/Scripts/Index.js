$(function () {        
    if (location.href.indexOf("home") > -1) {
        $.cookie("tabIndex", 1, { path: '/' });
        handler.inActiveTab($("#div_searching_tab"));
        $("#car_for_you").addClass("tabactive");
    }
});
