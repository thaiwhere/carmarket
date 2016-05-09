$(function () {        
    var CarDetail = new Car.CarDetail();
    CarDetail.Initialize();
});

Namespace.Register("Car.CarDetail");

Car.CarDetail = function () {
    var $this = this;

    function getListSimilarCar(gridId, searchingUrl, criteria, callback) {
        
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: searchingUrl,
            data: JSON.stringify(criteria),
            success: function (result) {
                callback(gridId, result);
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    };

    $this.showSimilarCarsList = function (carId) {        
        var callback = gridRender;
        var searchingUrl = "/Car/SearchingSimilarCars";
        var criteria = { carId: carId, itemsPerPage: itemsPerPage, currentPageIndex: 0 };

        getListSimilarCar("gridCarSimilar", searchingUrl, criteria, callback);
    };

    $this.Initialize = function () {
        handler.inActiveTab($("#div_searching_criteria"));
        
        handler.showResultSearching();
        $this.showSimilarCarsList(1);
    };    
}

var change_img = function (index) {
    $("#car_detail_carousel").carousel(index);
    //$("#car_detail_carousel").carousel("pause");
}


