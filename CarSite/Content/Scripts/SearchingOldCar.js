
$(function () {
    var SearchingCar = new Car.SearchingCar();
    SearchingCar.Initialize();
});

Namespace.Register("Car.SearchingCar");

Car.SearchingCar = function () {
    $this = this;

    function getListCar(callback, itemsPerPage, currentPageIndex, totalItem) { // trong day se call Ajax de goi den CarController/SearchingCar
        var criteria = {
            itemsPerPage: itemsPerPage,
            currentPageIndex: currentPageIndex,
            searchingType: 3
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

    $this.showTop50Cars = function () {
        var bindDataFunction = getListCar;
        renderGrid("gridSearchingCar", bindDataFunction, 10, 50);
    }

    $this.Initialize = function () {
        SearchingHandler.expandSearching();
        handler.hideDivLeft();
        $this.showTop50Cars();        
    };
}
