
function decorateData(cars) {
    var list = [];

    for (var i = 0; i < cars.length; i++) {
        var href = "/Car/CarDetail/" + cars[i].CarId;
        var image = "/Images/Cars_" + cars[i].CarId + "/small.jpg";
        var title = cars[i].Title;

        var status = cars[i].IsNew == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe cũ";
        status += " (" + cars[i].Year + ")</div>";

        var source = "<div class='car-info-source'>" + (cars[i].IsImport == true ? "Nhập khẩu" : "Trong nước") + "</div>";
        var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
        var firm = "<div class='car-info-firm'>" + cars[i].FirmName + "</div>";        
        var km = "<div class='car-info-item'>Km: " + cars[i].Km + " (km)</div>";
        var gearBox = "<div class='car-info-item'>Hộp số: " + (cars[i].GearBox == 0 ? "Số tự động" : "Số tay") + "</div>";
        var price_location = "<div class='car-info-price'>" + cars[i].CurrencyVN + " triệu</div><div class='car-info-place'><a href='" + href + "'>" + cars[i].Province + "</a></div>";
        var contact = "<div class='car-info-user'>" + cars[i].ContactName + "</div><div class='car-info-tel'>" + cars[i].ContactTel + "</div>";

        var car = status + source + firm + photo
        var title = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a></div>";
        var description = "<div class='car-des'>" + cars[i].Description; + "</div>";
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
                { HeaderText: "Hình", Width: 150, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 470, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 150, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
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
    else
    {
        gridOptions =
            {
                columns: [
                { HeaderText: "Hình", Width: 150, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 260, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 130, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
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

    customGrid = function () {
        var gridObj = $("#" + gridId);                
        gridObj.find($(".free-cell")).remove();
        var width = gridObj.width() - 17;
        gridObj.width(width);

        if (!shrinkGrid) {
            gridObj.width(785);            
            gridObj.find(".grid-container").width(800);
        }
    }

    $("#" + gridId).PagerGrid(gridOptions);
    customGrid();
    
};
