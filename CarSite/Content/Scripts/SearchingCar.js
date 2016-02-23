﻿
function generateData(numberRows, autoHeight) {
    var rows = [];
    for (var index = 0; index < numberRows; index++) {

        var href = "http://banxehoi.com/xe-daewoo-lacetti-ha-noi/ban-xe--dang-ky-2009-tu-nhan-mau-den-con-moi-318-trieu-aid630947";
        var title = "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";
        var image = "/content/images/cars/20151227214928-b769_wm.jpg";
        var content = "Tôi cần bán xe Daewoo Laceti sản xuất năm 2009 tên tư nhân xe gia đình sử dụng nên còn chất lượng máy móc êm nội thất đẹp lốp mới đăng kiểm còn dài giá tốt 318 triệu liên hệ Mr Hải 0915558358.";
        var car = "<div class='car-photo'><a href='" + href + "'><img title='" + title + "' src='" + image + "' alt='" + title + "'></a></div>";
        var description = "<div class='car-type1'><a href='" + href + "'>" + title + "</a><br />" + content +"</div>";
        
        var param = "<div class='car-info-item'>Tình trạng:&nbsp;Cũ</div><div class='car-info-item'>Xuất xứ:&nbsp;Nhập khẩu</div><div class='car-info-item'>Km:&nbsp;40.000 km</div><div class='car-info-item'>Hộp số:&nbsp;Số tự động</div>";
        var price_location = "<div class='car-info-price'>350 triệu</div><div class='car-info-place'><a href='/xe-toyota-vios-ha-noi'>Hà Nội</a></div>";
        var contact = "<div class='car-info-user'>Chị Oanh</div><div class='car-info-tel'>0901500799</div>";
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

var gridOptions =
    {
        columns: [
            { HeaderText: "Car", Width: 150, Name: "Car", HeaderAlign: "center", CellAlign: "center"},
            { HeaderText: "Description", Width: 420, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Info", Width: 140, Name: "Info", HeaderAlign: "center", CellAlign: "center" }            
        ],
        bodyRows: generateData(20),
        gridExpandHeight: 100,
        showPager: true,
        customPager: true,
        pagerOption: {
            itemsPerPage: 20,
            currentPage: 0,
            itemsPerPageArray: [10, 20, 50],
            pagerSelectCallBack: reRenderAfterPaged,
            totalItem: 2000
        }
    };

function reRenderAfterPaged(currentPageIndex, itemsPerPage) {
    
    //// Set grid option for re-render pager
    gridOptions.pagerOption.itemsPerPage = itemsPerPage;
    gridOptions.pagerOption.currentPage = currentPageIndex;

    //// You should get data by ajax here, and then re-render grid.
    $("#gridId").PagerGrid(gridOptions);
}


$(function () {
   
    var currentGrid = $("#gridId").PagerGrid(gridOptions);
});