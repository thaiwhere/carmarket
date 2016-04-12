
$(function () {
    var SearchingCar = new Car.SearchingCar();
    SearchingCar.Initialize();
});

Namespace.Register("Car.SearchingCar");

Car.SearchingCar = function () {
    $this = this;

    function getListCar(callback) {        

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: "SearchingCars",
            data: JSON.stringify(criteria),
            success: function (result) {
                callback(result);
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    }

    $this.showSearchedCars = function () {
        var itemsPerPage = 20;
        var bindDataFunction = getListCar;
        renderGrid("gridSearchingCar", bindDataFunction, itemsPerPage);
    }

    $this.Initialize = function () {                
        handler.hideDivRight();
        $this.showSearchedCars();
    };
}
