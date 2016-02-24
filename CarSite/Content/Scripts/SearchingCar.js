
function generateData(numberRows, currentPage) {
    var rows = [];
    for (var index = 0; index < numberRows; index++) {

        var statusIcon = index % 2 == 0 ? "<div class='status-icon'></div>" : "";
        var source = "<div class='car-info-source'>Nhập khẩu</div>";
        if (currentPage % 2 != 0)
        {
            source = "<div class='car-info-source'>Trong nước</div>";
        }

        var href = "/Car/CarDetail";

        var title = "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";
        var image = "/content/images/cars/0" + (index + 1) + ".jpg";
        if (index >= 9)
        {
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

var gridOptions =
    {
        columns: [
            { HeaderText: "Hình", Width: 160, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Mô tả", Width: 420, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Thông tin", Width: 140, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
        ],
        bodyRows: generateData(10, 0),
        gridExpandHeight: 150,
        showPager: true,
        customPager: true,
        //hideYBackGroundScroller: true, //// default is false
        pagerOption: {
            itemsPerPage: 10,
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
    gridOptions.bodyRows = generateData(itemsPerPage, gridOptions.pagerOption.currentPage);

    $("#gridId").PagerGrid(gridOptions);
}

$(function () {
    expandSearching();

    $("#div-left").hide();
    var currentGrid = $("#gridId").PagerGrid(gridOptions);
});