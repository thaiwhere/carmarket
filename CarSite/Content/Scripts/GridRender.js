
var gridRender = (function () {
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
        //hideYBackGroundScroller: true, //// default is false
        pagerOption: {
            //itemsPerPage: _itemsPerPage,
            //currentPage: 0,
            itemsPerPageArray: [10, 20, 50],
            pagerSelectCallBack: reRenderAfterPaged,
            //totalItem: _totalItem
        }
    }    

    function reRenderAfterPaged(currentPageIndex, itemsPerPage) {        
        _bindDataFunction(_gridId, itemsPerPage, currentPageIndex, _totalItem);
    }
           
    init = function (gridId, bindDataFunction, itemsPerPage, totalItem) {
        _gridId = gridId;
        _bindDataFunction = bindDataFunction;
        _itemsPerPage = itemsPerPage;
        _totalItem = totalItem;        
    }

    getGridOptions = function(){
        return gridOptions;
    }
    
    return {
        init: init,
        getGridOptions: getGridOptions
    };
}());

function renderGrid(gridId, bindDataFunction, itemsPerPage, totalItem)
{    
    gridRender.init(gridId, bindDataFunction, itemsPerPage, totalItem);
    bindDataFunction(gridId, itemsPerPage, 0, totalItem);
}