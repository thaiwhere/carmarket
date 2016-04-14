function generateData(numberRows, autoHeight) {
    var rows = [];
    for (var index = 0; index < numberRows; index++) {
        var row = {
            Columns: [
                    { Name: "No", Value: index },
                    { Name: "Text1", Value: parseFloat((Math.random() > 0.5 ? (Math.random() * 500).toFixed(3) : (Math.random() * 500 * -1).toFixed(3))) },
                    { Name: "Number1", Value: parseFloat((Math.random() * 20000).toFixed(4)) },
                    { Name: "Number2", Value: parseFloat((Math.random() * 100).toFixed(2)) },
                    { Name: "Number3", Value: parseFloat((Math.random() * 500).toFixed(3)) },
                    { Name: "Text2", Value: Math.random().toString(36).substring(7) },
                    { Name: "Text3", Value: Math.random().toString(36).substring(8) },
                    { Name: "Text4", Value: Math.random().toString(36).substring(9) },
                    { Name: "Number4", Value: parseFloat((Math.random() * 1000).toFixed(3)) },
                    { Name: "Number5", Value: parseFloat((index % 2 == 0 ? (Math.random() * 500).toFixed(3) : (Math.random() * 500 * -1).toFixed(3))) }
            ]
        };
        rows.push(row);
    }

    return rows;
}

var gridOptions =
    {
        columns: [
            { HeaderText: "Header 1", Width: 60, Name: "No", HeaderAlign: "center", CellAlign: "center", CustomAttr: "title='demo title'" },
            { HeaderText: "Header 2", Width: 70, Name: "Text1", HeaderAlign: "center", CellAlign: "right" },
            { HeaderText: "Header 3", Width: 100, Name: "Number1", HeaderAlign: "center", CellAlign: "right" },
            { HeaderText: "Header 4", Width: 100, Name: "Number2", HeaderAlign: "center", CellAlign: "right" },
            { HeaderText: "Header 5", Width: 160, Name: "Number3", HeaderAlign: "center", CellAlign: "right" },
            { HeaderText: "Header 6", Width: 110, Name: "Text2" },
            { HeaderText: "Header 7", Width: 120, Name: "Text3" },
            { HeaderText: "Header 8", Width: 150, Name: "Text4" },
            { HeaderText: "Header 9", Width: 90, Name: "Number4", HeaderAlign: "center", CellAlign: "right" },
            { HeaderText: "Header 10", Width: 120, Name: "Number5", HeaderAlign: "center", CellAlign: "right" }
        ],
        bodyRows: generateData(2000),
        gridExpandHeight: 100,
        showPager: true,
        pagerOption: {
            itemsPerPage: 100,
            currentPage: 0,
            itemsPerPageArray: [50, 100, 500],
            showDetail: true
        }
    };

$(function () {
    var currentGrid = $("#gridSearchingCar").PagerGrid(gridOptions);
});