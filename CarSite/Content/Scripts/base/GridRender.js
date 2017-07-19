
function decorateData(cars) {
    var list = [];

    for (var i = 0; i < cars.length; i++) {

        var href = "/Car/CarDetail/" + cars[i].CarId;
        if (cars[i].IsBuy == 1) {
            href = "/Car/CarBuyDetail/" + cars[i].CarId;
        }
        else if (cars[i].IsBuy == 2) {
            href = "/Car/CarHireDetail/" + cars[i].CarId;
        }

        var hrefFirm = "/car/SearchingCars?firm=" + cars[i].FirmName;
        var hrefProvince = hrefFirm + "&province=" + cars[i].Province;
        var hrefContact = "/Car/CarOfUser/" + cars[i].UserId;

        var image = "/Images/Cars_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";
        var title = cars[i].Title;
        var status = cars[i].IsNew == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe đã sử dụng";

        if (cars[i].IsBuy == 2)
        {
            image = "/Images/Cars_Hire_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";
            status = "<div class='car-info-status-hire'>" + "Xe cho thuê";
        }
        status += " (" + cars[i].Year + ")</div>";

        var source = "<div class='car-info-source'>" + (cars[i].IsImport == true ? "Nhập khẩu" : "Trong nước") + "</div>";
        var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
        var firm = "<div class='car-info-firm'>" + "<a href='" + hrefFirm + "'>" + cars[i].FirmName + "</a></div>";
        var km = "<div class='car-info-item'>Km: " + cars[i].Km + " (km)</div>";
        var gearBox = "<div class='car-info-item'>Hộp số: " + (cars[i].GearBox == 0 ? "Tự động" : "Số tay") + "</div>";
        var price_location = "<div class='car-info-price'>" + common.ShowVietnameseCurrency(cars[i].CurrencyVN) + "</div><div class='car-info-place'><a href='" + hrefProvince + "'>" + cars[i].Province + "</a></div>";
        var contact = "<div class='car-info-item car-info-user'><a href='" + hrefContact + "'>" + cars[i].ContactName + "</a></div><div class='car-info-item car-info-tel'>" + cars[i].ContactTel + "</div>";

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
                { HeaderText: "Xe", Width: 140, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 470, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 180, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
                ],
                gridId: gridId,
                bodyRows: decorateData(data),                
                gridExpandHeight: 100,                
                showPager: true,
                customGrid: true,
                pagerOption: {
                    itemsPerPage: 10,
                    currentPage: 0,
                    showDetail: true,
                    customSelectCallBack: reRenderAfterPaged
                }
            };
    }
    else
    {
        gridOptions =
            {
                columns: [
                { HeaderText: "Xe", Width: 135, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Mô tả", Width: 250, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
                { HeaderText: "Thông tin", Width: 170, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
                ],
                gridId: gridId,
                bodyRows: decorateData(data),
                //scrollWidth: 0, //// Default is 24px
                gridExpandHeight: 100,
                showPager: true,
                customGrid: true,
                pagerOption: {
                    itemsPerPage: 10,
                    currentPage: 0,
                    showDetail: true,
                    customSelectCallBack: reRenderAfterPaged
                }
            };
    }
       
    $("#" + gridId).PagerGrid(gridOptions);
    //customGrid(gridId);
};

function decorateDataModify(cars, carStatus) {
    var list = [];

    for (var i = 0; i < cars.length; i++) {

        if (cars[i].Status == carStatus) {

            var href = "/Car/CarDetail/" + cars[i].CarId;
            if (cars[i].IsBuy == 1)
            {
                href = "/Car/CarBuyDetail/" + cars[i].CarId;
            }
            else if (cars[i].IsBuy == 2) {
                href = "/Car/CarHireDetail/" + cars[i].CarId;
            }

            var hrefFirm = "/car/SearchingCars?firm=" + cars[i].FirmName;

            var hrefModify = "/Car/Edit/" + cars[i].CarId;

            if (cars[i].IsBuy == 1) {
                hrefModify = "/Car/EditCarBuying/" + cars[i].CarId;
            }
            else if (cars[i].IsBuy == 2) {
                hrefModify = "/Car/EditCarHire/" + cars[i].CarId;
            }

            var image = "/Images/Cars_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";            
            var title = cars[i].Title;
            var isNew = cars[i].IsNew == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe đã sử dụng";

            if (cars[i].IsBuy == 1) {
                image = "/images/noimage_buy.gif";
            }

            if (cars[i].IsBuy == 2) {
                image = "/Images/Cars_Hire_" + cars[i].UserId + "_" + cars[i].CarId + "/1.jpg";
                isNew = "<div class='car-info-status-hire'>" + "Xe cho thuê";
            }
            isNew += " (" + cars[i].Year + ")</div>";

            var source = "<div class='car-info-source'>" + (cars[i].IsImport == true ? "Nhập khẩu" : "Trong nước") + "</div>";
            var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
            var firm = "<div class='car-info-firm'>" + "<a href='" + hrefFirm + "'>" + cars[i].FirmName + "</a></div>";

            var car = isNew + source + firm + photo
            var title = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a></div>";

            var status = "";
            switch (cars[i].Status) {
                case 0: status = "Chờ duyệt <span class='glyphicon glyphicon-dashboard'></span>"; break;
                case 1: status = "<font color='#0000ff'>Đang đăng <span class='glyphicon glyphicon-thumbs-up'></span></font>"; break;
                case 2: status = "<font color='#ff8707'>Đã bán <span class='glyphicon glyphicon-usd'></span></font>"; break;
                case 3: status = "<font color='#ff0000'>Không duyệt <span class='glyphicon glyphicon-thumbs-down'></span></font>"; break;
                case 4: status = "<font color='#ff0000'>Hết hạn <span class='glyphicon glyphicon-thumbs-down'></span></font>"; break;

            }
            var saled = "";
            if (cars[i].Status == 1) {
                saled = "<a href='javascript:void(0);' onclick='return SaledCar(this, \"" + cars[i].CarId + "\");'><font color='#ff8707'><span class='glyphicon glyphicon-usd'></span> Đã bán</font></a>";
            }

            var edit = "<br/><br/><a href='" + hrefModify + "'><span class='glyphicon glyphicon-pencil'></span> Sửa</a>";

            var remove = "<br/><br/><a href='javascript:void(0);' onclick='return DeleteCar(this, \"" + cars[i].CarId + "\"," + cars[i].IsBuy + ");'><font color='#ff0000'><span class='glyphicon glyphicon-remove'></span> Xoá</font></a>";

            var modify = "<div class='car-info' style='margin-left:20px' >" + saled + edit + remove;
                        
            if (typeof(IsAdmin) != 'undefined' && IsAdmin == "True")
            {                
                var approve = "<br/><br/><a href='javascript:void(0);' onclick='return ApproveCar(this, \"" + cars[i].CarId + "\",\"" + cars[i].UserName + "\",\"" + cars[i].Email + "\"," + cars[i].IsBuy + ");'><font color='#0000ff'><span class='glyphicon glyphicon-thumbs-up'></span> Duyệt</font></a>";
                var disApprove = "<br/><br/><a href='javascript:void(0);' onclick='return DisApproveCar(this, \"" + cars[i].CarId + "\",\"" + cars[i].UserName + "\",\"" + cars[i].Email + "\"," + cars[i].IsBuy + ");'><font color='#ff0000'><span class='glyphicon glyphicon-thumbs-down'></span> KO duyệt</font></a>";

                modify += approve + disApprove;
            }            

            modify += "</div>";

            var row = {
                Columns: [
                        { Name: "Car", Value: car },
                        { Name: "Title", Value: title },
                        { Name: "Status", Value: status },
                        { Name: "ModifiedDate", Value: cars[i].ModifiedDate },
                        //{ Name: "CountView", Value: cars[i].CountVisit },
                        { Name: "Modify", Value: modify }
                ]
            };

            list.push(row);
        }
    }

    return list;
}

var gridRenderMofify = function (gridId, data, carStatus) {

    gridOptions =
              {
                  columns: [
                  { HeaderText: "Xe", Width: 150, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Tiêu đề", Width: 250, Name: "Title", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Trạng thái", Width: 80, Name: "Status", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Ngày cập nhật", Width: 100, Name: "ModifiedDate", HeaderAlign: "center", CellAlign: "center" },
                  //{ HeaderText: "Luợt xem", Width: 70, Name: "CountView", HeaderAlign: "center", CellAlign: "center" },
                  { HeaderText: "Chỉnh sửa", Width: 160, Name: "Modify", HeaderAlign: "center", CellAlign: "center" }
                  ],
                  gridId: gridId,
                  bodyRows: decorateDataModify(data, carStatus),
                  scrollWidth: 0, //// Default is 24px
                  gridExpandHeight: 100,
                  showPager: true,
                  customGrid: true,
                  pagerOption: {
                      itemsPerPage: 10,
                      currentPage: 0,
                      showDetail: true,
                      customSelectCallBack: reRenderGridModifyAfterPaged
                  }
              };
    
    $("#" + gridId).PagerGrid(gridOptions);    
};

function customGrid(gridId) {
    var gridObj = $("#" + gridId);
    gridObj.find($(".free-cell")).remove();

    if (!shrinkGrid) {        
        var width = gridObj.width() + 30;        
        $(".col_header").width(width);
        gridObj.find(".grid-container").width(width);
        gridObj.find(".content-container").width(width);
    }
    else {
        var width = gridObj.width() - 20;        
        gridObj.width(width-20);
        $("#grid-pager-top").width(width);
        $("#grid-pager-bottom").width(width);
        $(".col_header").width(width);
        gridObj.find(".grid-container").width(width);
        gridObj.find(".content-container").width(width);        
        $(".car-info-user").css("maxWidth", 140);
    }

    $(".grid-container").height("100%");
}

function reRenderAfterPaged(gridId) {    
    customGrid(gridId);
    $(".col_header").css("top", 30);
    $(".grid-container").css("top", 30);
    return false;
}

function reRenderGridModifyAfterPaged(gridId) {
    customGrid(gridId);    
    $(".col_header").css("top", 30);
    $(".grid-container").css("top", 30);

    return false;
}

