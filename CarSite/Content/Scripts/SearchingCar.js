
function getListCar(numberRows, currentPage) { // trong day se call Ajax de goi den CarController/SearchingCar
    var criteria = {};
    var cars = [];

    $.ajax({
        type: 'POST',        
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: "SearchingCars",
        data: JSON.stringify(criteria),                
        success: function (result) {
            var cars = result;
            for(var i =0; i< cars.length; i++)
            {
                //var statusIcon = cars[i].Status == true ? "<div class='status-icon'></div>" : "";
                //var source = "<div class='car-info-source'>" + cars[i].Source +"</div>";
                
                //var href = cars[i].Href;// "/Car/CarDetail";                
                //var title = cars[i].Title;// "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";
                //var image = cars[i].Image;// "/content/images/cars/0" + (index + 1) + ".jpg";

                //var content =cars[i].Content// "Tôi cần bán xe Daewoo Laceti sản xuất năm 2009 tên tư nhân xe gia đình sử dụng nên còn chất lượng máy móc êm nội thất đẹp lốp mới đăng kiểm còn dài giá tốt 318 triệu liên hệ Mr Hải 0915558358.";
                
                //var param = "<div class='car-info-item'>Km:&nbsp;" + cars[i].Km + "km</div><div class='car-info-item'>Hộp số:&nbsp;" + cars[i].Type + "</div>";
                //var price_location = "<div class='car-info-price'>" + cars[i].Price + " triệu</div><div class='car-info-place'><a href='" + href + "'>" + cars[i].Location + "</a></div>";
                //var contact = "<div class='car-info-user'>" + cars[i].ContactName +"</div><div class='car-info-tel'>" + cars[i].ContactTel +"</div>";

                //var car = statusIcon + source + "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
                //var description = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a><br /><div class='car-des'>" + content + "</div></div>";
                //var info = "<div class='car-info'>" + param + price_location + contact + "</div>";

                var row = {
                    Columns: [
                            { Name: "Car", Value: car },
                            { Name: "Description", Value: description },
                            { Name: "Info", Value: info }
                    ]
                };

                cars.push(row);
            }
        },
        error: function (error) { alert(error);}
    });
}


function generateCar(numberRows, currentPage) { // day cung chi la thong tin hard code
    var rows = [];
    for (var index = 0; index < numberRows; index++) {

        var statusIcon = index % 2 == 0 ? "<div class='status-icon'></div>" : "";
        var source = "<div class='car-info-source'>Nhập khẩu</div>";
        if (currentPage % 2 != 0) {
            source = "<div class='car-info-source'>Trong nước</div>";
        }

        var href = "/Car/CarDetail";

        var title = "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";
        var image = "/content/images/cars/0" + (index + 1) + ".jpg";
        if (index >= 9) {
            image = "/content/images/cars/" + (index + 1) + ".jpg";
        }

        var content = "Tôi cần bán xe Daewoo Laceti sản xuất năm 2009 tên tư nhân xe gia đình sử dụng nên còn chất lượng máy móc êm nội thất đẹp lốp mới đăng kiểm còn dài giá tốt 318 triệu liên hệ Mr Hải 0915558358.";

        var param = "<div class='car-info-item'>Km:&nbsp;40.000 km</div><div class='car-info-item'>Hộp số:&nbsp;Số tự động</div>";
        var price_location = "<div class='car-info-price'>350 triệu</div><div class='car-info-place'><a href='/xe-toyota-vios-ha-noi'>Hà Nội</a></div>";
        var contact = "<div class='car-info-user'>Chị Oanh</div><div class='car-info-tel'>0901500799</div>";

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
        rows.push(row);
    }

    return rows;
}

$(function () {
    expandSearching();
    $("#div-left").hide();

    //renderGrid("gridSearchingCar", getListCar, 10, 100);
});