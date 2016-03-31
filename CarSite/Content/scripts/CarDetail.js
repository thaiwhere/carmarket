$(function () {        
    var CarDetail = new Car.CarDetail();
    CarDetail.Initialize();
});

Namespace.Register("Car.CarDetail");

Car.CarDetail = function () {
    var $this = this;

    function getListSimilarCar(callback, itemsPerPage, currentPageIndex, totalItem) {
        var criteria = {
            itemsPerPage: itemsPerPage,
            currentPageIndex: currentPageIndex
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
    };

    $this.showSimilarCarsList = function (carId) {
        var bindDataFunction = getListSimilarCar;
        renderGrid("gridCarSimilar", bindDataFunction, 10, 200);
    };

    $this.Initialize = function () {
        handler.inActiveTab($("#div_searching_criteria"));

        SearchingHandler.expandSearching();
        handler.hideDivRight();        
        $this.showSimilarCarsList(1);
    };    
}

var change_img = function (index) {
    $("#car_detail_carousel").carousel(index);
    //$("#car_detail_carousel").carousel("pause");
}


