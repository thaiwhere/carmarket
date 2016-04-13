var itemsPerPage = 20;

var tabIndex = $.cookie("tabIndex") || 0; // for set tab active in searching criteria.

$(function () {
    handler.hideSearchCarFirm();
    handler.bindEvents();
    SearchingHandler.renderModels("Acura");
});