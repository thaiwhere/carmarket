
function decorateData(cars) {
    var list = [];

    for (var i = 0; i < cars.length; i++) {
        var href = "/Car/CarDetail/" + cars[i].CarId;
        var hrefFirm = "/car/SearchingCars?firm=" + cars[i].FirmName;
        var hrefProvince = hrefFirm + "&province=" + cars[i].Province;

        var image = "/Images/Cars_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";
        var title = cars[i].Title;

        var status = cars[i].IsNew == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe đã sử dụng";
        status += " (" + cars[i].Year + ")</div>";

        var source = "<div class='car-info-source'>" + (cars[i].IsImport == true ? "Nhập khẩu" : "Trong nước") + "</div>";
        var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
        var firm = "<div class='car-info-firm'>" + "<a href='" + hrefFirm + "'>" + cars[i].FirmName + "</a></div>";
        var km = "<div class='car-info-item'>Km: " + cars[i].Km + " (km)</div>";
        var gearBox = "<div class='car-info-item'>Hộp số: " + (cars[i].GearBox == 0 ? "Tự động" : "Số tay") + "</div>";
        var price_location = "<div class='car-info-price'>" + cars[i].CurrencyVN + " triệu</div><div class='car-info-place'><a href='" + hrefProvince + "'>" + cars[i].Province + "</a></div>";
        var contact = "<div class='car-info-item car-info-user'>" + cars[i].ContactName + "</div><div class='car-info-item car-info-tel'>" + cars[i].ContactTel + "</div>";

        var car = status + source + firm + photo
        var title = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a></div>";
        var description = "<div class='car-des'>" + cars[i].Description.substring(0,200) + "..." + "</div>";
        var info = "<div class='car-info'>" + km + gearBox + price_location + contact + "</div>";

        var row = {
            Columns: [
                    { Name: "Car", Value: car },
                    { Name: "Description", Value: title + description },
                    { Name: "Info", Value: info }
            ]
        };

        list.push(row);
    }

    return list;
}

var gridRender = function (gridId, data) {
    var gridOptions = {};
    if (!shrinkGrid) {
        gridOptions =
            {
                columns: [
                { HeaderText: "Hình", Width: 140, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 470, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 180, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
                ],
                bodyRows: decorateData(data),                
                gridExpandHeight: 100,                
                showPager: true,
                pagerOption: {
                    itemsPerPage: 10,
                    currentPage: 0,
                    showDetail: true
                }
            };
    }
    else
    {
        gridOptions =
            {
                columns: [
                { HeaderText: "Hình", Width: 140, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 260, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 140, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
                ],
                bodyRows: decorateData(data),
                scrollWidth: 0, //// Default is 24px
                gridExpandHeight: 100,
                showPager: true,
                pagerOption: {
                    itemsPerPage: 10,
                    currentPage: 0,
                    showDetail: true
                }
            };
    }
    
    $("#" + gridId).PagerGrid(gridOptions);
    customGrid(gridId);
    
};

function decorateDataModify(cars) {
    var list = [];

    for (var i = 0; i < cars.length; i++) {
        var href = "/Car/CarDetail/" + cars[i].CarId;
        var hrefFirm = "/car/SearchingCars?firm=" + cars[i].FirmName;
        var hrefModify = "/Car/Edit/" + cars[i].CarId;        
        if (cars[i].IsBuy == 1)
        {
            hrefModify = "/Car/EditCarBuying/" + cars[i].CarId;
        }

        var image = "/Images/Cars_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";

        if (cars[i].IsBuy == 1) {
            hrefModify = "/Car/EditCarBuying/" + cars[i].CarId;
            image = "/images/noimage_buy.gif";
        }


        var title = cars[i].Title;

        var status = cars[i].IsNew == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe đã sử dụng";
        status += " (" + cars[i].Year + ")</div>";

        var source = "<div class='car-info-source'>" + (cars[i].IsImport == true ? "Nhập khẩu" : "Trong nước") + "</div>";
        var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
        var firm = "<div class='car-info-firm'>" + "<a href='" + hrefFirm + "'>" + cars[i].FirmName + "</a></div>";
        var km = "<div class='car-info-item'>Km: " + cars[i].Km + " (km)</div>";
        var gearBox = "<div class='car-info-item'>Hộp số: " + (cars[i].GearBox == 0 ? "Tự động" : "Số tay") + "</div>";
        var price_location = "<div class='car-info-price'>" + cars[i].CurrencyVN + " triệu</div><div class='car-info-place'><a href='" + href + "'>" + cars[i].Province + "</a></div>";
        var contact = "<div class='car-info-item car-info-user'>" + cars[i].ContactName + "</div><div class='car-info-item car-info-tel'>" + cars[i].ContactTel + "</div>";

        var car = status + source + firm + photo
        var title = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a></div>";
        var description = "<div class='car-des'>" + cars[i].Description.substring(0,200); + "</div>";
        var info = "<div class='car-info'>" + km + gearBox + price_location + contact + "</div>";
        var modify = "<div class='car-info'>" + "<a href='" + hrefModify + "'>Edit</a>" + "   " + "<a href='javascript:void(0);' onclick=\"return DeleteCar(this, '" + cars[i].CarId + "');\">Delete</a></div>";

        //var modify = "<div class='mdl car-info'>" + "<a href='" + hrefModify + "'>Edit</a>" + "   " + "<a id='btn-2' class='btn' data-overlayclick='true' data-fullscreen='false' data-type='confirm'> Confirm Dialog</a></div>";

        
        var row = {
            Columns: [
                    { Name: "Car", Value: car },
                    { Name: "Description", Value: title + description },
                    { Name: "Info", Value: info },
                    { Name: "Modify", Value: modify }
            ]
        };

        list.push(row);
    }

    return list;
}

var gridRenderMofify = function (gridId, data) {

    gridOptions =
              {
                  columns: [
                  { HeaderText: "Hình", Width: 140, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Mô tả", Width: 425, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Thông tin", Width: 160, Name: "Info", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Chỉnhsửa", Width: 20, Name: "Modify", HeaderAlign: "center", CellAlign: "center" }
                  ],
                  bodyRows: decorateDataModify(data),
                  scrollWidth: 0, //// Default is 24px
                  gridExpandHeight: 100,
                  showPager: true,
                  pagerOption: {
                      itemsPerPage: 10,
                      currentPage: 0,
                      showDetail: true
                  }
              };
    
    $("#" + gridId).PagerGrid(gridOptions);
    customGrid(gridId);

};

function customGrid(gridId) {
    var gridObj = $("#" + gridId);
    gridObj.find($(".free-cell")).remove();

    if (!shrinkGrid) {
        var width = gridObj.width() + 30;
        //gridObj.width(gridObj.width() + 10);
        $("#grid-pager-top").width(width);
        $("#grid-pager-bottom").width(width);
        $(".col_header").width(width);
        gridObj.find(".grid-container").width(width);
    }
    else {
        var width = gridObj.width() - 45;
        var width2 = width + 20;
        gridObj.width(width);
        $("#grid-pager-top").width(width2);
        $("#grid-pager-bottom").width(width2);
        $(".col_header").width(width2);
        gridObj.find(".grid-container").width(width2);
        $(".car-info-user").css("maxWidth", 140);
    }
}
