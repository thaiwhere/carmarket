var shrinkGrid = true;
//var searchingUrl = $.cookie("searchingUrl") || "";
var ItemsPerPage = 20;

var tabIndex = $.cookie("tabIndex") || 0; // for set tab active in searching criteria.
var tabYourCars = $.cookie("tabYourCars") || "car_showing"; // for set tab active for your cars.

$(function () {
    handler.hideSearchCarFirm();
    handler.bindEvents();
    RenderFactory.renderModels("", "#select_model");

    $('[data-toggle="tooltip"]').tooltip();
});