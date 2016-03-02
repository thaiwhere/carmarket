
function getListCar(callback, itemsPerPage, currentPageIndex, totalItem) { // trong day se call Ajax de goi den CarController/SearchingCar
    var criteria = {
        itemsPerPage : itemsPerPage,
        currentPageIndex : currentPageIndex
    };
    
    $.ajax({
        type: 'POST',        
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: "SearchingCars",
        data: JSON.stringify(criteria),                
        success: function (result) {        
            callback(result, itemsPerPage, currentPageIndex, totalItem);
        },
        error: function (xhr) {
            common.HandleAjaxError(xhr);
        }
    });    
}

$(function () {
    expandSearching();
    $("#div-left").hide();

    var bindDataFunction = getListCar;    

    renderGrid("gridSearchingCar", bindDataFunction, 10, 100);
});