var shrinkGrid = true;
//var searchingUrl = $.cookie("searchingUrl") || "";
var ItemsPerPage = 20;

var tabIndex = $.cookie("tabIndex") || 0; // for set tab active in searching criteria.

$(function () {
    handler.hideSearchCarFirm();
    handler.bindEvents();
    RenderFactory.renderModels("", "#select_model");
});