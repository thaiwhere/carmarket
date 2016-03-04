﻿
var gridRender = function () {
    var _gridId = "";
    var _bindDataFunction;
    var _itemsPerPage = 0;
    var _totalItem = 0;

    var gridOptions = {
        columns: [
            { HeaderText: "Hình", Width: 160, Name: "Car", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Mô tả", Width: 420, Name: "Description", HeaderAlign: "center", CellAlign: "center" },
            { HeaderText: "Thông tin", Width: 140, Name: "Info", HeaderAlign: "center", CellAlign: "center" }
        ],
        //bodyRows: generateData(10, 0),
        gridExpandHeight: 150,
        showPager: true,
        customPager: true,
        hideYBackGroundScroller: true, //// default is false        
        pagerOption: {
            //itemsPerPage: _itemsPerPage,
            //currentPage: 0,
            itemsPerPageArray: [10, 20, 50],
            pagerSelectCallBack: reRenderAfterPaged,
            //totalItem: _totalItem
        }
    }    

    function reRenderAfterPaged(currentPageIndex, itemsPerPage) {        
        _bindDataFunction(render, itemsPerPage, currentPageIndex, _totalItem);
    }
           
    init = function (gridId, bindDataFunction, itemsPerPage, totalItem) {
        _gridId = gridId;        
        _bindDataFunction = bindDataFunction;
        _itemsPerPage = itemsPerPage;
        _totalItem = totalItem;        
    }

    bindData = function(){
        _bindDataFunction(render, _itemsPerPage, 0, _totalItem);
    }

    decorateData = function (cars) {
        var list = [];

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

    render = function (data, itemsPerPage, currentPageIndex, totalItem) {
        gridOptions.bodyRows = decorateData(data);

        gridOptions.pagerOption.itemsPerPage = itemsPerPage;
        gridOptions.pagerOption.currentPage = currentPageIndex;
        gridOptions.pagerOption.totalItem = totalItem;        

        $("#" + _gridId).PagerGrid(gridOptions);
        customGrid();
    }   
    
    return {
        init: init,
        bindData: bindData        
    };
};

function renderGrid(gridId, bindDataFunction, itemsPerPage, totalItem)
{
    var grid = new gridRender();
    grid.init(gridId, bindDataFunction, itemsPerPage, totalItem);
    grid.bindData();
}