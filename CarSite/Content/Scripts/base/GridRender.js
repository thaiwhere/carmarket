
var gridRender = function () {
    var _gridId = "";
    var _bindDataFunction;
    var _itemsPerPage = 20;
    var _totalItem = 0;

    var gridOptions = {
        columns: [
            { HeaderText: "Hình", Width: 160, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Mô tả", Width: 470, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Thông tin", Width: 170, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
        ],
        //bodyRows: generateData(10, 0),
        gridExpandHeight: 150,
        showPager: true,
        customPager: true,
        hideYBackGroundScroller: true, //// default is false        
        pagerOption: {
            itemsPerPage: _itemsPerPage,
            currentPage: 0,
            itemsPerPageArray: [10, 20, 50],
            pagerSelectCallBack: reRenderAfterPaged,
            totalItem: _totalItem
        }
    }    

    function reRenderAfterPaged(currentPageIndex, itemsPerPage) {                
        gridOptions.pagerOption.currentPage = currentPageIndex;
        gridOptions.pagerOption.itemsPerPage = itemsPerPage;        
        gridOptions.pagerOption.totalItem = _totalItem;

        $("#" + _gridId).PagerGrid(gridOptions);
        customGrid();
    }
           
    init = function (gridId, bindDataFunction, itemsPerPage) {
        _gridId = gridId;        
        _bindDataFunction = bindDataFunction;
        _itemsPerPage = itemsPerPage;        
    }

    bindData = function(){
        _bindDataFunction(render);
    }

    decorateData = function (cars) {
        var list = [];

        for (var i = 0; i < cars.length; i++) {
            var href = cars[i].Href + "/1.jpg";// "/Car/CarDetail";                
            var title = cars[i].Title;// "Bán Xe Daewoo Lacetti đăng ký 2009 tư nhân, màu đen còn mới, 318 triệu... (28/02/2016) ";            

            var year = " (2015)";
            var status = cars[i].Status == true ? "<div class='car-info-status-new'>" + "Xe mới" : "<div class='car-info-status-old'>" + "Xe cũ";
            status += year + "</div>";

            var source = "<div class='car-info-source'>" + (cars[i].Source == true ? "Nhập khẩu" : "Trong nước") + "</div>";
            var photo = "<div class='car-photo'>" + "<a href='" + href + "'><img title='" + title + "' src='" + href + "' alt='" + title + "'></a></div>";
            var firm = "<div class='car-info-firm'>" + "Toyota" + "</div>";

            var car = status + source + photo + firm;
            
            var content = cars[i].Content// "Tôi cần bán xe Daewoo Laceti sản xuất năm 2009 tên tư nhân xe gia đình sử dụng nên còn chất lượng máy móc êm nội thất đẹp lốp mới đăng kiểm còn dài giá tốt 318 triệu liên hệ Mr Hải 0915558358.";

            var param = "<div class='car-info-item'>Km:&nbsp;" + cars[i].Km + "km</div><div class='car-info-item'>Hộp số:&nbsp;" + cars[i].Type + "</div>";
            var price_location = "<div class='car-info-price'>" + cars[i].Price + " triệu</div><div class='car-info-place'><a href='" + href + "'>" + cars[i].Location + "</a></div>";
            var contact = "<div class='car-info-user'>" + cars[i].ContactName + "</div><div class='car-info-tel'>" + cars[i].ContactTel + "</div>";

            

            var title = "<div class='car-des-title'><a href='" + href + "'>" + title + "</a></div>";
            var description = "<div class='car-des'>" + content + "</div>";
            var info = "<div class='car-info'>" + param + price_location + contact + "</div>";

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

    customGrid = function () {
        var gridOjb = $("#" + _gridId);
        gridOjb.css("width", (gridOjb.width() - 16) + "px");
        gridOjb.css("height", "1860px");

        $(".grid-container").css("height", "1860px");
       
        gridOjb.find($(".x-scrollbar")).remove();
        gridOjb.find($(".y-scrollbar")).remove();        
    }

    render = function (data) {
        gridOptions.bodyRows = decorateData(data);
        
        _totalItem = gridOptions.bodyRows.length;
        gridOptions.pagerOption.totalItem = _totalItem ;

        $("#" + _gridId).PagerGrid(gridOptions);
        customGrid();
    }   
    
    return {
        init: init,
        bindData: bindData        
    };
};

function renderGrid(gridId, bindDataFunction, itemsPerPage)
{
    var grid = new gridRender();
    grid.init(gridId, bindDataFunction, itemsPerPage);
    grid.bindData();
}