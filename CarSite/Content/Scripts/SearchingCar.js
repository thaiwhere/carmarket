
Namespace.Register("Car.SearchingCar");

Car.SearchingCar = function () {
    $this = this;

    function getListCar(gridId, searchingUrl, criteria, callback) {

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
    }

    $this.Initialize = function () {                
        handler.hideDivRight();
    };

    $this.Searching= function(searchingUrl, criteria)
    {
        var callback = gridRender;
        getListCar("gridSearchingCar", searchingUrl, criteria, callback);
    }
}