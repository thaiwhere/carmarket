
Namespace.Register("Car.SearchingCar");

Car.SearchingCar = function () {
    $this = this;

    function getListCar(searchingUrl, criteria, callback) {

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: searchingUrl,
            data: JSON.stringify(criteria),
            success: function (result) {
                callback(result);
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    }

    $this.Initialize = function () {                
        handler.hideDivRight();
    };

    $this.Searching= function(searchingUrl, criteria)
    {        
        renderGrid("gridSearchingCar", searchingUrl, criteria, getListCar, itemsPerPage);
    }
}

var SearchingCar = new Car.SearchingCar();
SearchingCar.Initialize();
