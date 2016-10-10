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

    $this.showSimilarModelCarsList = function (carId, model) {        
        var callback = gridRender;
        var searchingUrl = "/Car/SearchingCarsSimilarModel";
        var criteria = { CarId: carId, Model: model, ItemsPerPage: ItemsPerPage, CurrentPageIndex: 0 };

        getListSimilarCar("gridCarSimilarModel", searchingUrl, criteria, callback);
    };

    $this.showSimilarPriceCarsList = function (carId, price) {
        var callback = gridRender;
        var searchingUrl = "/Car/SearchingCarsSimilarPrice";
        var criteria = { CarId: carId, Price: price, ItemsPerPage: ItemsPerPage, CurrentPageIndex: 0 };

        getListSimilarCar("gridCarSimilarPrice", searchingUrl, criteria, callback);
    };

    $this.Initialize = function () {
        handler.inActiveTab($("#div_searching_tab"));
        $("#div_searching_tab").hide();
        $("#div_searching_tab_car_detail").show();
        $("#gridCarSimilarPrice").hide();
        
        handler.showResultSearching();

        $("#car_detail_price").html(common.ShowVietnameseCurrency(carDetailPrice));

        $this.showSimilarModelCarsList(carDetailId, carDetailModel);
    };    
}

var change_img = function (index) {
    $("#car_detail_carousel").carousel(index);
    //$("#car_detail_carousel").carousel("pause");
}


