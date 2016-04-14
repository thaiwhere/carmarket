$(function () {
    handler.inActiveTab($("#div_searching_criteria"));
    var tabIndex = $.cookie("tabIndex");
    if (tabIndex != 'undefined')
    {        
        switch(tabIndex)
        {
            case "0": $("#car_searching").addClass("tabactive"); break;
            case "1": $("#car_for_you").addClass("tabactive"); break;
            case "2": $("#car_new").addClass("tabactive"); break;
            case "3": $("#car_old").addClass("tabactive"); break;
            case "4": $("#car_import").addClass("tabactive"); break;
            case "5": $("#car_domestic").addClass("tabactive"); break;
        }

        if (location.href.indexOf("SearchingCar") > -1) {
            SearchingHandler.expandSearching();
        }
    }                
});