
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

    $this.YourActiveCar = function (searchingUrl, criteria) {
        
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: searchingUrl,
            data: JSON.stringify(criteria),
            success: function (result) {
                gridRenderMofify("gridCarShowing", result, 1);
                gridRenderMofify("gridCarWaiting", result, 0);
                gridRenderMofify("gridCarSaled", result, 2);
                gridRenderMofify("gridCarNotAllow", result, 3);

                $(".freegrid").hide();
                $("#gridCarShowing").show();

                RedirectAfterDeleted();
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    }

    $this.YourExpiredCar = function (searchingUrl, criteria) {
        //var callback = gridRenderMofify;
        //getListCar("gridCarExpired", searchingUrl, criteria, callback);

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: searchingUrl,
            data: JSON.stringify(criteria),
            success: function (result) {
                gridRenderMofify("gridCarExpired", result, 4);
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    }
}