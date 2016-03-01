function getListSimilarCar(gridId, itemsPerPage, currentPageIndex, totalItem) { // trong day se call Ajax de goi den CarController/SearchingCar
    var criteria = {
        itemsPerPage: itemsPerPage,
        currentPageIndex: currentPageIndex
    };
    var carsList = [];

    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: "SearchingCars",
        data: JSON.stringify(criteria),
        success: function (result) {
            var cars = result;
            for (var i = 0; i < cars.length; i++) {
                var statusIcon = cars[i].Status == true ? "<div class='status-icon'></div>" : "";
                var source = "<div class='car-info-source'>" + cars[i].Source + "</div>";

                var href = cars[i].Href;// "/Car/CarDetail";                
                var title = cars[i].Title;// "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";
                var image = cars[i].Image;// "/content/images/cars/0" + (index + 1) + ".jpg";

                var content = cars[i].Content// "Tôi cần bán xe Daewoo Laceti sản xuất năm 2009 tên tư nhân xe gia đình sử dụng nên còn chất lượng máy móc êm nội thất đẹp lốp mới đăng kiểm còn dài giá tốt 318 triệu liên hệ Mr Hải 0915558358.";

                var param = "<div class='car-info-item'>Km:&nbsp;" + cars[i].Km + "km</div><div class='car-info-item'>Hộp số:&nbsp;" + cars[i].Type + "</div>";
                var price_location = "<div class='car-info-price'>" + cars[i].Price + " triệu</div><div class='car-info-place'><a href='" + href + "'>" + cars[i].Location + "</a></div>";
                var contact = "<div class='car-info-user'>" + cars[i].ContactName + "</div><div class='car-info-tel'>" + cars[i].ContactTel + "</div>";

                var car = statusIcon + source + "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
                var description = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a><br /><div class='car-des'>" + content + "</div></div>";
                var info = "<div class='car-info'>" + param + price_location + contact + "</div>";

                var row = {
                    Columns: [
                            { Name: "Car", Value: car },
                            { Name: "Description", Value: description },
                            { Name: "Info", Value: info }
                    ]
                };

                carsList.push(row);
            }

            var gridOptions = gridRender.getGridOptions();
            gridOptions.pagerOption.itemsPerPage = itemsPerPage;
            gridOptions.pagerOption.currentPage = currentPageIndex;
            gridOptions.pagerOption.totalItem = totalItem;
            gridOptions.bodyRows = carsList;

            $("#" + gridId).PagerGrid(gridOptions);
        },
        error: function (xhr) {
            common.HandleAjaxError(xhr);
        }
    });
}

function showSimilarCarModel()
{
    $("#car-similar-model").addClass("tabactive");
    $("#car-similar-price").removeClass("tabactive");    
}

function showSimilarCarPrice()
{
    $("#car-similar-price").addClass("tabactive");
    $("#car-similar-model").removeClass("tabactive");        
}

$(function () {
    collapseSearching();
    $("#div-left").hide();
    
    renderGrid("gridCarSimilar", getListSimilarCar, 10, 200);
});