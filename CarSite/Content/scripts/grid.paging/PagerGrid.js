﻿

(function ($) {
    ////'use strict';


    //// Method expose for user use
    var methods =
    {
        createPagerGrid: function (opts) {
            if (opts.showColumnsShowHide === false || opts.enableHiddenColumns === false) {
                opts.enableHiddenColumns = false;
                opts.hiddenColumns = opts.hiddenColumns || [];
                opts.hiddenColumns = opts.hiddenColumns.concat(opts.columnsNeedHide || []);
                opts.columns = Pager.Grid.Helper.SetColumnDisplay(opts.columns, opts.hiddenColumns);
            }
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                PagerGrid.RenderGrid();
                return PagerGrid.GetjQueryInstance();
            });
        },
        reRender: function (opts) {
            if (opts.showColumnsShowHide === false || opts.enableHiddenColumns === false) {
                opts.enableHiddenColumns = false;
                opts.hiddenColumns = opts.hiddenColumns || [];
                opts.hiddenColumns = opts.hiddenColumns.concat(opts.columnsNeedHide);
                opts.columns = Pager.Grid.Helper.SetColumnDisplay(opts.columns, opts.hiddenColumns);
            }
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                PagerGrid.RenderGrid();
                return PagerGrid.GetjQueryInstance();
            });
        },
        reRenderBodyAfterSort: function (opts, sortColumnName, sortDirection) {
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                PagerGrid.ReRenderBodyAfterSort(sortColumnName, sortDirection);
                if (opts.showPager === true) {
                    PagerGrid.RenderPager();
                }
                return PagerGrid.GetjQueryInstance();
            });
        },
        showColumns: function (opts, columnsNeedShow) {
            opts.enableHiddenColumns = true;
            opts.columns = Pager.Grid.Helper.SetColumnDisplay(opts.columns, columnsNeedShow);
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                opts.pagerOption = Pager.Grid.List[PagerGrid.tableContentId].pagerOption;
                Pager.Grid.Helper.UpdateSortInforAfterShowHideColumns(opts, Pager.Grid.List[PagerGrid.tableContentId].sortOption);
                PagerGrid.RenderGrid();
                return PagerGrid.GetjQueryInstance();
            });
        },
        hideColumns: function (opts, hiddenColumns) {
            opts.enableHiddenColumns = false;
            opts.columns = Pager.Grid.Helper.SetColumnDisplay(opts.columns, hiddenColumns);
            opts.hiddenColumns = hiddenColumns;
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                opts.pagerOption = Pager.Grid.List[PagerGrid.tableContentId].pagerOption;
                Pager.Grid.Helper.UpdateSortInforAfterShowHideColumns(opts, Pager.Grid.List[PagerGrid.tableContentId].sortOption);
                //PagerGrid.RenderGrid();
                PagerGrid.RenderShowHideColumns(false);
                return PagerGrid.GetjQueryInstance();
            });
        },
        resizeGrid: function () {
            return this.each(function () {
                var $this = $(this);
                var currentContentId = 'tblContent_' + $this.attr('id');
                var gridOptions = Pager.Grid.List[currentContentId].gridOptions;
                gridOptions.isResetScroller = false;
                $this.gridScroller(Pager.Grid.List[currentContentId].gridOptions);
                return $this;
            });
        },
        resizeHeight: function (gridHeight) {
            return this.each(function () {
                var $this = $(this);
                if (gridHeight) {
                    var currentContentId = 'tblContent_' + $this.attr('id');
                    var currentOptions = Pager.Grid.List[currentContentId].gridOptions;
                    currentOptions.gridHeight = gridHeight;
                    $this.gridScroller(currentOptions);
                }
                return $this;
            });
        },
        appendBody: function (opts, rows) {
            opts = $.extend({}, $.fn.PagerGrid.defaults, opts);
            return this.each(function () {
                var PagerGrid = new Pager.Grid(this, opts);
                PagerGrid.AppendBodyRows(rows);
                $(this).PagerGrid('resizeGrid');
            });
        },
        getCurrentPage: function () {
        },
        getColumnsIdentify: function (opts) {
            return Pager.Grid.Helper.GetColumnsHastable(opts.columns);
        }
    };

    //// Plugin
    $.fn.PagerGrid = function (options) {
        if (methods[options]) {
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof options === 'object' || !options) {
            return methods.createPagerGrid.apply(this, arguments);
        }
        else {
            throw 'Options cannot be null';
        }
    };

    //// Default Options
    $.fn.PagerGrid.defaults =
    {
        customizeHeader: false,
        headerRows: [],
        columns: [],
        bodyRows: [],
        numberOfFrozenColumn: 0,
        showFooter: false,
        footerRows: [],
        showTitle: false,
        headerColumnHeight: 25,
        bodyRowHeight: 21,
        footerRowHeight: 21,
        titleInfo:
        {
            text: "",
            hideWhenNoData: true,
            showExcelButton: false,
            exportExcelFunction: null,
            showBackButton: false,
            backFunction: null,
            showSendMailButton: false,
            sendMailFunction: null,
            showCollapseExpandButton: false,
            customButtons: '',
            showButtonsWhenNoData: false
        },
        showPager: false,
        pagerOption:
        {
            itemsPerPage: 100,
            maxItemsPerPage: 500,
            currentPage: 1,
            totalItem: 0,
            startPerPage: 100,
            pageStep: 50,
            afterPagedFunction: null,
            showDetail: true
        },
        showTree: false,
        gridExpandHeight: 150,
        showNoDataOnFrozen: false,
        showColumnsShowHide: true,
        enableHiddenColumns: true,
        showDistinctRow: true,
        showHighlightRow: true,
        highlightFrozenWidth: 1,
        showNumberColumn: false,
        marginRight: 5,
        allowTruncate: false,
        columnsNeedHide: [],
        hiddenColumns: [],
        sortOption:
        {
            customGridSort: null,
            serverSortFunction: null,
            afterGridSorted: null,
            beforeGridSorted: null
        },
        hideYBackGroundScroller: false,
        bottomBorderWidth: 1,
        treeParentPaddingLeft: 20,
        isResetScroller: false,
        fullHeight: true,
        gridHeight: 400,
        gridWidth: 0,
        noDataText: "There is no data",
        language: 'en-US',
        autoFixFrozenRowHeight: false,
        autoResizeColumn: false,
        pixelsPerCharacter: 0,
        calTextWidthWithFontSize: true,
        timeZone: '',
        scrollWidth: 24
    };

    var Pager = Pager || {};

    Pager.Grid = function (grid, options) {
        this.$grid = $(grid);
        //// Calculate fontsize for hide cell value if cell value exceed
        try {
            this.currentFontSize = parseInt(this.$grid.css('font-size').replace('px', ''));
        }
        catch (e) {
            this.currentFontSize = 12;
        }
        this.currentFontSize -= 4;
        if (options.pixelsPerCharacter === 0) {
            options.pixelsPerCharacter = this.currentFontSize;
        }
        this.Options = options.autoResizeColumn ? Pager.Grid.Helper.ComputeResizeColumn(this.$grid, options) : options;

        this.gridObject = grid;
        this.gridId = this.$grid.attr('id');
        this.tableContentId = 'tblContent_' + this.gridId;
        this.frozenContentId = 'frozenContent_' + this.gridId;
        this.headerColumnsCloneFromOptionColumns = Pager.Grid.Helper.CreateHeaderColumnsFromOptionsColumn(options.columns.slice(0));

        if (PagerGridLanguage[options.language] == null) {
            alert('Cannot load language: ' + options.language);
        }
        else {
            PagerGridCurrentLanguage = PagerGridLanguage[options.language];
        }


        //// Create a hashtable contain columns information for esay retrieve data
        this.columnsHastable = Pager.Grid.Helper.GetColumnsHastable(options.columns);
        //// Create columnswidth array
        this.columnsWidth = Pager.Grid.Helper.GetArrayWidth(options.columns, options.enableHiddenColumns, false);
        this.columnsForComputingWidth = Pager.Grid.Helper.GetArrayWidth(options.columns, options.enableHiddenColumns, true);
        if (this.Options.customPager !== true) {
            this.Options.pagerOption.totalItem = this.Options.bodyRows.length;
        }
        this.gridOptions = null;
        this.frozenColsName = [];
        //// If frozen, then create an array contain frozen columns name
        if (options.numberOfFrozenColumn > 0) {
            //var frozenColumnNumber = isValid(options.numberOfFrozenColumnSaved) ? options.numberOfFrozenColumnSaved : options.numberOfFrozenColumn;
            for (var colIndex = 0; colIndex < options.numberOfFrozenColumn; colIndex++) {
                this.frozenColsName.push(options.columns[colIndex].Name);
            }
            //// If highlight frozen then set width for hightligth
            if (options.highlightFrozenWidth > 1) {
                var lastFrozenCol = options.columns[options.numberOfFrozenColumn - 1];
                if (isValid(lastFrozenCol.TrClass)) {
                    lastFrozenCol.TdClass += " border-right-highlight ";
                }
                else {
                    lastFrozenCol.TdClass = "border-right-highlight ";
                }
                options.highlightFrozenWidth--;
            }
        }
    };

    Pager.Grid.prototype =
    {
        RenderGrid: function () {
            if (typeof (PagerGridLanguage) === 'undefined') {
                return;
            }
            var me = this;
            var options = me.Options;
            var footer = '';
            if (options.showFooter && options.bodyRows.length > 0) {
                if (typeof (options.pagerOption.customRenderFooter) === 'function') {
                    var startIndex = (options.pagerOption.currentPage * options.pagerOption.itemsPerPage);
                    var endIndex = ((options.pagerOption.currentPage + 1) * options.pagerOption.itemsPerPage);
                    var currentBodyRows = options.bodyRows.slice(startIndex, endIndex);
                    me.Options.footerRows = options.pagerOption.customRenderFooter(
                                                                                currentBodyRows,
                                                                                options.pagerOption.currentPage,
                                                                                options.pagerOption.itemsPerPage);
                }

                footer = me.RenderFooter();
            }
            //// Render Table Main Frame
            var html = me.RenderBody(me.RenderHeader()) + footer;
            if (me.gridObject) {
                me.gridObject.innerHTML = html;
            }
            //me.$grid.empty().html(html);
            me.$grid.before(me.RenderTitle());
            //me.$grid.parent().css("float","left");
            me.RegisterMouseHoverEvent();
            me.Initialize();
            //// Render Title
            //
        },
        RenderShowHideColumns: function (isShow) {
            var me = this;
            var options = me.Options;
            var currentMainBodyHtml = me.$grid.find('#' + me.tableContentId + '> tbody').html();
            var currentFrozenBodyHeader = me.$grid.find('#' + me.frozenContentId + '> tbody').html();
            var bodyHtml = me.RenderHeader() + me.RenderCommonHeader('mainbody');
            var footer = (options.showFooter && options.bodyRows.length > 0 ? me.RenderFooter() : "");
            var bodyHtmlTemp = '',
                currentCol;
            // Fixbug for replace $' string
            if (options.numberOfFrozenColumn > 0) {
                bodyHtmlTemp = bodyHtml.split('{$}frozenBody');
                if (bodyHtmlTemp.length === 2) {
                    bodyHtml = bodyHtmlTemp[0] + currentFrozenBodyHeader + bodyHtmlTemp[1];
                }
            }
            bodyHtmlTemp = bodyHtml.split('{$}_');
            if (bodyHtmlTemp.length === 2) {
                bodyHtml = bodyHtmlTemp[0] + currentMainBodyHtml + bodyHtmlTemp[1];
            }

            bodyHtml += footer;

            me.$grid.empty(); //.html(bodyHtml);
            if (me.gridObject) {
                me.gridObject.innerHTML = bodyHtml;
            }

            var selector = [];
            var columnsShowLength = options.columns.length;
            for (var colIndex = 0; colIndex < columnsShowLength; colIndex++) {
                //selector.push('.free-grid-td-' + colIndex);
                me.$grid.find('.free-grid-td-' + colIndex).removeClass("grid-show-hide-column");
            }
            //me.$grid.find(selector.join(',')).show();

            if (!isShow) {
                var columnsHideLength = options.hiddenColumns.length,
                    nhIndex;
                selector = [];
                try {
                    for (var colIndex1 = 0; colIndex1 < columnsHideLength; colIndex1++) {
                        currentCol = options.hiddenColumns[colIndex1];
                        //selector.push('.free-grid-td-' + currentCol);
                        //me.$grid.find('.free-grid-td-' + currentCol).addClass("grid-show-hide-column");
                        me.$grid.find('.free-cell, .row_header_wrapper, .col_header, .grid-container')
                        .find('.free-grid-td-' + currentCol)
                        .addClass("grid-show-hide-column");
                    }

                    if (options.showFooter) {
                        //                        var footerLength = options.footerRows[0].Columns.length;
                        //                        var needHideCols = options.hiddenColumns.slice(0);
                        //                        var currentColIndex = 0;
                        //                        for (var ftColIndex = 0; ftColIndex < footerLength; ftColIndex++) {
                        //                            currentCol = options.footerRows[0].Columns[ftColIndex];
                        //                            if (currentCol.MergeColNumber) {
                        //                                var removeArray = [];
                        //                                for (nhIndex = 0; nhIndex < needHideCols.length; nhIndex++) {
                        //                                    if (ftColIndex + currentCol.MergeColNumber >= ftColIndex + needHideCols[nhIndex]) {
                        //                                        removeArray.push(nhIndex);
                        //                                    }
                        //                                    else if (ftColIndex < needHideCols[nhIndex]) {
                        //                                        needHideCols[nhIndex] -= currentCol.MergeColNumber - 1;
                        //                                    }
                        //                                }

                        //                                for (var rmIndex = removeArray.length - 1; rmIndex >= 0; rmIndex--) {
                        //                                    needHideCols.splice(removeArray[rmIndex], 1);
                        //                                }

                        //                                //currentColIndex += currentCol.MergeColNumber;
                        //                            }
                        //                            // currentColIndex++;
                        //                        }
                        var needHideCols = options.hiddenColumns.slice(0);
                        for (nhIndex = 0; nhIndex < needHideCols.length; nhIndex++) {
                            currentCol = needHideCols[nhIndex];
                            me.$grid.find('.row_footer, .col_footer').find('.free-grid-td-' + currentCol).addClass("grid-show-hide-column");
                        }
                    }
                }
                catch (e) {
                    window.console.log(e);
                }
                //me.$grid.find(selector.join(',')).hide();
            }

            me.RegisterMouseHoverEvent();
            me.Initialize();
        },
        ReRenderBodyAfterSort: function (sortColumnName, sortDirection) {
            var me = this;
            me.RenderBody('', true);
            me.gridOptions = Pager.Grid.List[me.tableContentId].gridOptions;
            me.gridOptions.isResetScroller = false;
            me.RegisterMouseHoverEvent();
            me.AutoResizeRowHeight();
            $(me.$grid).gridScroller(me.gridOptions);
            //// Save Current Sor
            Pager.Grid.List[me.tableContentId].sortOption =
            {
                SortColumnName: sortColumnName,
                SortDirection: sortDirection
            };
        },
        AppendBodyRows: function (rows) {
            var me = this;
            var options = me.Options;
            var rowLength = rows.length,
                currentRow;
            if (rowLength > 0) {
                var currentFrozenRows = (options.numberOfFrozenColumn > 0) ?
                                        Pager.Grid.Helper.CreateRowsForFrozenColumn(rows, options.numberOfFrozenColumn, me.frozenColsName) :
                                        [];
                var frozenBodyLength = currentFrozenRows.length;
                var bodyRowsHtml = [], bodyFrozenHtml = [];
                var currentPageStartIndex = options.bodyRows.length;

                //// Render Frozen Row and Main Row at the same time
                for (var rowIndex = 0; rowIndex < frozenBodyLength; rowIndex++) {
                    currentRow = rows[rowIndex];
                    var currentFrozenRow = currentFrozenRows[rowIndex];
                    bodyRowsHtml.push(me.RenderNormalRow(currentRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                    bodyFrozenHtml.push(me.RenderFrozenRow(currentFrozenRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                }

                //// If MainRow still has item, then continue render
                for (rowIndex = frozenBodyLength; rowIndex < rowLength; rowIndex++) {
                    currentRow = rows[rowIndex];
                    bodyRowsHtml.push(me.RenderNormalRow(currentRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                }

                //// Update Data
                me.$grid.find('#' + me.tableContentId + '> tbody').append(bodyRowsHtml.join(''));
                me.$grid.find('#' + me.frozenContentId + '> tbody').append(bodyFrozenHtml.join(''));
            }
        },
        GetjQueryInstance: function () {
            return this.$grid;
        },
        Initialize: function () {
            var me = this;
            var options = this.Options;
            var numberOfFrozenColumnNew = (options.enableHiddenColumns === false ?
                                            Pager.Grid.Helper.ComputeNewFrozenColumn(options.hiddenColumns, options.numberOfFrozenColumn) :
                                            options.numberOfFrozenColumn);
            //// Render Grid Scroller
            me.gridOptions =
            {
                tblContentId: me.tableContentId,
                column: me.columnsWidth,
                gridHeight: options.fullHeight ? options.gridExpandHeight : options.gridHeight,
                gridWidth: options.gridWidth,
                numberFreezeCol: numberOfFrozenColumnNew,
                highlightFrozenWidth: options.highlightFrozenWidth,
                heightScrollYAdd: 0,
                marginRight: options.marginRight,
                hideYBackGroundScroller: options.hideYBackGroundScroller,
                bottomBorderWidth: options.bottomBorderWidth,
                isResetScroller: options.isResetScroller,
                fullHeight: options.fullHeight
            };
            $(me.$grid).initGrid({
                isShowPager: (options.showPager && (options.bodyRows.length > 0))
            }).gridScroller(me.gridOptions);

            //// Render Pager
            if (options.showPager === true) {
                me.RenderPager();
                Pager.Grid.List[me.tableContentId].pagerOption = options.pagerOption;
            }
            me.RegisterEvents();
            me.AutoResizeRowHeight();

        },
        RenderTitle: function () {
            var me = this;
            var options = me.Options;
            var titleId = me.gridId + '-grid-title';
            if (options.showTitle === false) {
                return '';
            }
            else {
                me.$grid.parent().find('#' + titleId).remove();
                // style="width:' + me.$grid.width() + 'px"
                var titleHtml = [];
                titleHtml.push('<div id="' + me.gridId + '-grid-title' + '" class="grid-title display-none"><div class="grid-title-label" id="reporttile">');
                titleHtml.push(options.titleInfo.text);
                titleHtml.push('</div>');
                titleHtml.push('<div class="grid-toolbox">');
                if (options.titleInfo.showBackButton === true) {
                    titleHtml.push('<input id="btnBack' + me.gridId + '" class="btnBack" type="button" title="Back" value="" name="btnBack" />');
                }
                if (options.bodyRows.length > 0 || options.titleInfo.showButtonsWhenNoData === true) {
                    if (options.titleInfo.customButtons !== '') {
                        titleHtml.push(options.titleInfo.customButtons);
                    }
                    if (options.titleInfo.showCollapseExpandButton === true) {
                        titleHtml.push('<input class="btExpand expanded" id="btnCollapseExpand' +
                                        me.gridId +
                                        '" type="button" value="" title="Collapse/Expand" />');
                    }
                    if (options.titleInfo.showExcelButton === true) {
                        titleHtml.push('<input type="button" id="btnExport' + me.gridId + '" class="btnExcel" title="Export to Excel" />');
                    }
                    if (options.titleInfo.showSendMailButton === true) {
                        titleHtml.push('<input id="btnSendMail' + me.gridId + '" class="btnSendMail" type="button" title="Send Mail" />');
                    }
                }
                titleHtml.push('</div></div>');

                return titleHtml.join('');
            }
        },
        RenderHeader: function () {
            var me = this;
            var options = this.Options;
            var headerHtml = [];

            //// Clone and Add last row of Group Header
            if (options.customizeHeader) {
                this.Options.cloneGroupHeaderRows = options.groupHeaderRows.slice(0);
                this.Options.cloneGroupHeaderRows.push({
                    Columns: me.headerColumnsCloneFromOptionColumns.slice(0)
                });
            }

            //// If there are any item of header column
            var columnLength = options.columns.length;
            if (columnLength > 0) {
                if (options.numberOfFrozenColumn > 0) {
                    headerHtml.push(me.RenderCommonHeader('frozenheader').replace('{$}_', ''));
                    headerHtml.push(me.RenderCommonHeader('frozenbody'));
                }
                headerHtml.push(me.RenderCommonHeader('mainheader').replace('{$}_', ''));
            }

            return headerHtml.join('');
        },
        RenderCommonHeader: function (type) {
            var me = this;
            var options = this.Options;
            var divHeaderClass = '';
            var divContainerClass = '';
            var tableClass = '';
            var hasId = false;
            var tableContainId = me.tableContentId;
            var columnLength = me.headerColumnsCloneFromOptionColumns.length;
            var replaceMark = '_';

            // Grid Frame
            //////////////////////////////////
            // frozen Header //  main header//
            //////////////////////////////////
            // frozen body   // main body   //
            //////////////////////////////////
            switch (type) {
                case 'frozenheader':
                    divContainerClass = 'free-cell free-top-left';
                    tableClass = 'grid-fixed-table free-cell-top-left';
                    columnLength = options.numberOfFrozenColumn;
                    break;
                case 'frozenbody':
                    divHeaderClass = 'row_header_wrapper';
                    divContainerClass = 'row_header row-headers-background';
                    tableClass = 'grid-fixed-table row_header_content';
                    columnLength = options.numberOfFrozenColumn;
                    hasId = true;
                    tableContainId = me.frozenContentId;
                    replaceMark = 'frozenBody';
                    break;
                case 'mainheader':
                    divHeaderClass = 'col_header row-headers-background scroll-y';
                    divContainerClass = 'header-container';
                    tableClass = 'grid-fixed-table col_header_content';
                    break;
                case 'mainbody':
                    divHeaderClass = 'grid-container';
                    divContainerClass = 'content-container';
                    tableClass = 'grid-fixed-table col_body_content';
                    hasId = true;
                    break;
            }

            var headerHtml = [],
                trsHeader = [],
                cellInfo,
                colIndex,
                currentCol,
                customSpan;
            //// Build Header
            if (divHeaderClass !== '') {
                headerHtml.push('<div class="' + divHeaderClass + '">');
            }
            headerHtml.push('<div class="' + divContainerClass + '">');
            headerHtml.push('<table class="' + tableClass + '" ' + (hasId ? ('id="' + tableContainId + '"') : '') + ' ><thead>');

            if (options.customizeHeader) {
                var currentGroupHeader = options.cloneGroupHeaderRows;
                if (type === 'frozenheader' || type === 'frozenbody') {
                    //// Create Header Rows for Frozen Table
                    currentGroupHeader = Pager.Grid.Helper.CreateRowsForFrozenColumn(
                                                    options.cloneGroupHeaderRows.slice(0),
                                                    options.numberOfFrozenColumn,
                                                    me.frozenColsName);
                }
                for (var rowIndex = 0; rowIndex < currentGroupHeader.length; rowIndex++) {
                    var currentRow = currentGroupHeader[rowIndex];

                    if (currentRow.Columns.length > 0) {
                        headerHtml.push('<tr>');

                        for (colIndex = 0; colIndex < currentRow.Columns.length && colIndex < columnLength; colIndex++) {
                            currentCol = currentRow.Columns[colIndex];
                            if (isValid(currentCol)) {
                                customSpan = '';
                                var currentHeight = options.headerColumnHeight;
                                var showHeaderMergeCol = true;

                                if (isValid(currentCol) && isValid(currentCol.MergeRowNumber)) {
                                    //// If It has merge row and current row has only one columns and column has merge row, then remove next row
                                    Pager.Grid.Helper.RemoveItemForRowSpan(currentGroupHeader, rowIndex, currentCol, me.columnsHastable);
                                    var currentMergeRowNumber = ' rowspan="' + currentCol.MergeRowNumber + '"';
                                    //if (type === 'frozenheader' || type === 'frozenbody') {
                                    //// Calculate height for merger row
                                    currentHeight = ((options.headerColumnHeight * currentCol.MergeRowNumber) + (currentCol.MergeRowNumber - 1) * 5);
                                    //}
                                    customSpan += currentMergeRowNumber;
                                }

                                //// If Current cell has merge Col
                                if (isValid(currentCol) && isValid(currentCol.MergeColNumber)) {
                                    //// Compute for With for merge
                                    currentCol.Width = Pager.Grid.Helper.GetColMergeWidth(me.columnsForComputingWidth,
                                                                                            me.columnsHastable[currentCol.Name].ColumnIndex,
                                                                                            currentCol.MergeColNumber,
                                                                                            options.enableHiddenColumns,
                                                                                            options.columns);
                                    if (options.enableHiddenColumns === false) {
                                        showHeaderMergeCol = Pager.Grid.Helper.HideHeaderGroupWhenShowHide(options.hiddenColumns,
                                                                                                            me.columnsHastable[currentCol.Name].ColumnIndex,
                                                                                                            currentCol.MergeColNumber);
                                        customSpan += ' colspan="' + Pager.Grid.Helper.ReComputeMergeColumAfterShowHide(options.hiddenColumns,
                                                                                                            me.columnsHastable[currentCol.Name].ColumnIndex,
                                                                                                            currentCol.MergeColNumber) + '"';
                                    }
                                    else {
                                        customSpan += ' colspan="' + currentCol.MergeColNumber + '"';
                                    }
                                }

                                if (isValid(currentCol) && isValid(currentCol.MergeHeaderColNumber)) {
                                    customSpan += ' colspan="' + currentCol.MergeHeaderColNumber + '"';
                                }

                                cellInfo =
                                {
                                    CellTag: 'th',
                                    CustomSpan: customSpan,
                                    CssClass: currentCol.CssClass,
                                    SortClass: (currentRow.Columns[colIndex].Sort === true ? ' colSorter' : ''),
                                    CellWidth: (currentCol.Width || me.columnsHastable[currentCol.Name].Width),
                                    CellHeight: currentHeight,
                                    CellId: (me.columnsHastable[currentCol.Name].Sort === true ? (me.gridId + '_header_sort_' + currentCol.Name) : ''),
                                    Sort: currentRow.Columns[colIndex].Sort,
                                    CellColumnName: currentCol.Name,
                                    HeaderText: currentCol.HeaderText,
                                    CustomAttr: (currentGroupHeader.length > 1 && rowIndex === (currentGroupHeader.length - 1)) ?
                                                    me.columnsHastable[currentCol.Name].CustomAttr :
                                                    undefined,
                                    CustomHeaderRender: currentCol.CustomHeaderRender || me.columnsHastable[currentCol.Name].CustomHeaderRender,
                                    SortDirection: currentRow.Columns[colIndex].SortDirection || '',
                                    CanShowHide: (me.columnsHastable[currentCol.Name].CanShowHide && (!options.enableHiddenColumns) && showHeaderMergeCol),
                                    TdClass: me.columnsHastable[currentCol.Name].TdClass || '',
                                    ThClass: currentRow.Columns[colIndex].ThClass || '',
                                    //                                    (currentGroupHeader.length > 1 && rowIndex === (currentGroupHeader.length - 1)) ?
                                    //                                                        me.columnsHastable[currentCol.Name].ThClass :
                                    //                                                        '',
                                    CellAlign: me.columnsHastable[currentCol.Name].HeaderAlign || (me.columnsHastable[currentCol.Name].CellAlign || 'center')
                                };
                                trsHeader.push(me.RenderHeaderCell(cellInfo, currentCol));
                            }
                        }
                        headerHtml.push(trsHeader.join(''));
                        headerHtml.push('</tr>');
                        trsHeader = [];
                    }
                }
            }
            else {
                //// Has no frozen column
                headerHtml.push('<tr>');
                for (colIndex = 0; colIndex < columnLength; colIndex++) {
                    currentCol = me.headerColumnsCloneFromOptionColumns[colIndex];
                    customSpan = '';
                    if (isValid(currentCol) && isValid(currentCol.MergeHeaderColNumber)) {
                        customSpan += ' colspan="' + currentCol.MergeHeaderColNumber + '"';
                    }
                    cellInfo =
                    {
                        CellTag: 'th',
                        CustomSpan: customSpan,
                        CssClass: currentCol.CssClass,
                        SortClass: (currentCol.Sort === true ? ' colSorter' : ''),
                        CellWidth: (currentCol.Width || me.columnsHastable[currentCol.Name].Width),
                        CellHeight: options.headerColumnHeight,
                        CellId: (me.columnsHastable[currentCol.Name].Sort === true ? (me.gridId + '_header_sort_' + currentCol.Name) : ''),
                        Sort: currentCol.Sort,
                        CellColumnName: currentCol.Name,
                        HeaderText: currentCol.HeaderText,
                        CustomHeaderRender: currentCol.CustomHeaderRender || me.columnsHastable[currentCol.Name].CustomHeaderRender,
                        SortDirection: currentCol.SortDirection || '',
                        CustomAttr: me.columnsHastable[currentCol.Name].CustomAttr,
                        CanShowHide: me.columnsHastable[currentCol.Name].CanShowHide && (!options.enableHiddenColumns),
                        TdClass: me.columnsHastable[currentCol.Name].TdClass || '',
                        ThClass: me.columnsHastable[currentCol.Name].ThClass || '',
                        CellAlign: me.columnsHastable[currentCol.Name].HeaderAlign || (me.columnsHastable[currentCol.Name].CellAlign || 'center')
                    };
                    trsHeader.push(me.RenderHeaderCell(cellInfo, currentCol));
                }
                headerHtml.push(trsHeader.join(''));
                headerHtml.push('</tr>');
            }
            headerHtml.push('</thead><tbody>{$}' + replaceMark + '</tbody></table>');
            headerHtml.push('</div>');
            if (divHeaderClass !== '') {
                headerHtml.push('</div>');
            }
            return headerHtml.join('');
        },
        RenderFrozenRow: function (currentRow, colHtmlTag, isBody, rowIndex, treeCollapseExpandClass, isForNoData, parentHighlight, level) {
            var me = this;
            var options = me.Options;
            var frozenRowHtml = [];
            var colsLength = currentRow.Columns.length;
            var currentCollapseExpandId = '';
            var parentRowClass = '';
            var currentMergeColsIndex = 0;
            var trHighlightAtt = (options.showHighlightRow ? (' highlightatt="highlight-att-frozen-' + parentHighlight + '-' + rowIndex + '"') : '');
            var trClass = (options.showHighlightRow ? 'highlight-row ' : '') +
                            (treeCollapseExpandClass || '') +
                            (currentRow.CssClass || '') +
                            (options.showDistinctRow ? ((rowIndex + 1) % 2 === 0 ? ' freegrid-even' : '') : '');
            if (options.showTree === true && currentRow.SubRows) {
                parentRowClass = 'parent-row parent-level-' + level;
            }

            frozenRowHtml.push('<tr class="' + trClass + ' ' + parentRowClass + '" ' + (currentRow.CustomAttr || '') + trHighlightAtt + '>');
            for (var columnIndex = 0; columnIndex < colsLength; columnIndex++) {
                var currentCol = currentRow.Columns[columnIndex];
                var customSpan = '';
                var currentHeight = 'height:' + (currentRow.RowHeight || options.bodyRowHeight) + 'px;';
                var currentWidth = me.columnsHastable[currentCol.Name].Width;
                var currentHeightForComputeCenter = options.bodyRowHeight;

                //// If Merge Row, then add rowspan, If in the same row and there are no other columns, then cal height, 
                //// or there are some columns but they also have colspan, then cal height
                if (isValid(currentCol.MergeRowNumber)) {
                    customSpan += ' rowspan="' + currentCol.MergeRowNumber + '" ';
                    if (Pager.Grid.Helper.CheckHideColSpan(currentRow.Columns)) {
                        currentHeightForComputeCenter = ((options.bodyRowHeight * currentCol.MergeRowNumber) + (currentCol.MergeRowNumber - 1) * 5);
                        currentHeight = 'height:' + currentHeightForComputeCenter + 'px;';
                        customSpan = '';
                    }
                }

                //// If Merge Column and current row is footer, then calculate height
                if (isValid(currentCol.MergeColNumber)) {
                    customSpan += ' colspan="' + currentCol.MergeColNumber + '" ';
                    currentWidth = Pager.Grid.Helper.GetColMergeWidth(me.columnsForComputingWidth,
                                                                        me.columnsHastable[currentCol.Name].ColumnIndex,
                                                                        currentCol.MergeColNumber,
                                                                        options.enableHiddenColumns,
                                                                        options.columns);
                }

                if (currentCol.PrevRowsColMergeNumber) {
                    currentMergeColsIndex += currentCol.PrevRowsColMergeNumber;
                }

                var renderObject = me.RenderBodyCell(
                        {
                            HtmlTag: colHtmlTag,
                            CustomSpan: customSpan,
                            Height: currentHeight
                        },
                        {
                            IsNoData: isForNoData,
                            ColIndex: columnIndex,
                            RowIndex: rowIndex,
                            CssClass: (currentCol.CssClass || (me.columnsHastable[currentCol.Name].CellCssClass || '')),
                            Width: currentWidth,
                            Align: (currentCol.CellAlign || (me.columnsHastable[currentCol.Name].CellAlign || 'left')),
                            CustomAttr: (currentCol.CustomAttr || ''),
                            ParentHighlight: parentHighlight,
                            MergeColumnIndex: currentMergeColsIndex
                        },
                        currentCol,
                        currentRow,
                        isBody,
                        level
                    );
                frozenRowHtml.push(renderObject.CellHtml);
                if (renderObject.CurrentColumnShowTree === true) {
                    currentCollapseExpandId = renderObject.CurrentCollapseExpandId;
                }
                if (isValid(currentCol.MergeColNumber)) {
                    currentMergeColsIndex += currentCol.MergeColNumber - 1;
                }
            }
            frozenRowHtml.push('</tr>');

            if (options.showTree === true && currentRow.SubRows) {
                frozenRowHtml.push(me.RenderSubRow(currentRow, false, isBody, 0, currentCollapseExpandId, parentHighlight, level));
            }

            return frozenRowHtml.join('');
        },
        RenderNormalRow: function (currentRow, colHtmlTag, isBody, rowIndex, treeCollapseExpandClass, isForNoData, parentHighlight, level) {
            var me = this;
            var options = me.Options;
            var rowHtml = [];
            var colsLength = currentRow.Columns.length;
            var currentCollapseExpandId = '';
            var parentRowClass = '';
            var currentMergeColsIndex = 0;
            var trHighlightAtt = (options.showHighlightRow && isBody ? (' highlightatt="highlight-att-main-' + parentHighlight + '-' + rowIndex + '"') : '');
            var trClass = (options.showHighlightRow ? 'highlight-row ' : '') +
                            (currentRow.CssClass || '') + ' ' +
                            (treeCollapseExpandClass || '') + ' ' +
                            (options.showDistinctRow ? ((rowIndex + 1) % 2 === 0 ? ' freegrid-even' : '') : '');

            if (colsLength > 0) {
                //// If show grid with tree, then add class to parent row
                if (options.showTree === true && currentRow.SubRows) {
                    parentRowClass = 'parent-row parent-level-' + level;
                }
                rowHtml.push('<tr class="' + trClass + ' ' + parentRowClass + '" ' + (currentRow.CustomAttr || '') + ' ' + trHighlightAtt + '>');

                for (var colIndex = 0; colIndex < colsLength; colIndex++) {
                    var currentCol = currentRow.Columns[colIndex];
                    var currentWidth = me.columnsHastable[currentCol.Name].Width;
                    var customSpan = '';
                    var currentHeight = 'height:' + (currentRow.RowHeight || options.bodyRowHeight) + 'px;';
                    var currentHeightForComputeCenter = options.bodyRowHeight;
                    if (isValid(currentCol.MergeRowNumber)) {
                        customSpan += ' rowspan="' + currentCol.MergeRowNumber + '" ';
                        currentHeightForComputeCenter *= currentCol.MergeRowNumber;
                    }

                    //// If merge Column, then calculate width for merging
                    if (isValid(currentCol.MergeColNumber)) {
                        customSpan += ' colspan="' + currentCol.MergeColNumber + '" ';
                        currentWidth = Pager.Grid.Helper.GetColMergeWidth(me.columnsForComputingWidth,
                                                                            me.columnsHastable[currentCol.Name].ColumnIndex,
                                                                            currentCol.MergeColNumber,
                                                                            options.enableHiddenColumns,
                                                                            options.columns);
                    }
                    if (currentCol.PrevRowsColMergeNumber) {
                        currentMergeColsIndex += currentCol.PrevRowsColMergeNumber;
                    }
                    var renderObject = me.RenderBodyCell({
                        HtmlTag: colHtmlTag,
                        CustomSpan: customSpan,
                        Height: currentHeight
                    }, {
                        IsNoData: isForNoData,
                        ColIndex: colIndex,
                        RowIndex: rowIndex,
                        CssClass: (currentCol.CssClass || (me.columnsHastable[currentCol.Name].CellCssClass || '')),
                        Width: currentWidth,
                        Align: (currentCol.CellAlign || (me.columnsHastable[currentCol.Name].CellAlign || 'left')),
                        CustomAttr: (currentCol.CustomAttr || ''),
                        ParentHighlight: parentHighlight,
                        MergeColumnIndex: currentMergeColsIndex
                    },
                        currentCol,
                        currentRow,
                        isBody,
                        level
                    );
                    rowHtml.push(renderObject.CellHtml);
                    if (renderObject.CurrentColumnShowTree === true) {
                        currentCollapseExpandId = renderObject.CurrentCollapseExpandId;
                    }
                    if (isValid(currentCol.MergeColNumber)) {
                        currentMergeColsIndex += currentCol.MergeColNumber - 1;
                    }
                }
                rowHtml.push('</tr>');

                if (options.showTree === true && currentRow.SubRows) {
                    rowHtml.push(me.RenderSubRow(currentRow, true, isBody, 0, currentCollapseExpandId, parentHighlight, level));
                }
            }

            return rowHtml.join('');
        },
        RenderSubRow: function (currentRow, isMain, isBody, rowIndex, currentCollapseExpandId, parentHighlight, level) {
            var me = this;
            var options = me.Options;
            var subRowHtml = [];
            var currentSubRows = (isMain === true ? currentRow.SubRows :
                                    Pager.Grid.Helper.CreateRowsForFrozenColumn(currentRow.SubRows, options.numberOfFrozenColumn, me.frozenColsName));
            var subRowsLength = currentSubRows.length;
            level++;
            for (var subRowIndex = 0; subRowIndex < subRowsLength; subRowIndex++) {
                var currentSubRow = currentSubRows[subRowIndex];
                if (isMain === true) {
                    subRowHtml.push(me.RenderNormalRow(currentSubRow,
                                                        'td',
                                                        isBody,
                                                        subRowIndex,
                                                        currentCollapseExpandId,
                                                        false,
                                                        parentHighlight + '-' + rowIndex + '-' + subRowIndex, level));
                }
                else {
                    subRowHtml.push(me.RenderFrozenRow(
                                                    currentSubRow,
                                                    'td',
                                                    isBody,
                                                    subRowIndex,
                                                    currentCollapseExpandId,
                                                    false,
                                                    parentHighlight + '-' + rowIndex + '-' + subRowIndex, level));
                }
            }
            return subRowHtml.join('');
        },
        RenderBodyCell: function (container, cell, currentCol, currentRow, isBody, level) {
            var me = this;
            var options = me.Options;
            var cellHtml = [];
            var currentCollapseExpandId = '';

            var currentValue = currentCol.Value;
            if (me.columnsHastable[currentCol.Name].IsAbs && currentValue < 0) {
                currentValue = Math.abs(currentValue);
            }

            if (me.columnsHastable[currentCol.Name].FormatNumber && !isNaN(currentValue) && currentValue !== '') {
                currentValue = numeral(currentValue).format(me.columnsHastable[currentCol.Name].FormatNumber);
            }

            if (me.columnsHastable[currentCol.Name].FormatDateTime &&
                isValid(currentValue) &&
                currentValue !== '' &&
                currentValue != null) {
                var momentObject = moment(currentValue);
                if (momentObject.isValid()) {
                    if (options.timeZone !== '') {
                        momentObject = momentObject.zone(options.timeZone);
                    }

                    currentValue = momentObject.format(me.columnsHastable[currentCol.Name].FormatDateTime);
                }
            }

            if (me.columnsHastable[currentCol.Name].FormatNegative) {
                if (currentCol.Value < 0) {
                    currentValue = '<span class="format-negative">' + me.columnsHastable[currentCol.Name].FormatNegative.replace('$', currentValue) + '</span>';
                }
            }

            if (me.columnsHastable[currentCol.Name].FormatPositive) {
                if (currentCol.Value > 0) {
                    currentValue = '<span class="format-positive">' + me.columnsHastable[currentCol.Name].FormatPositive.replace('$', currentValue) + '</span>';
                }
            }

            var cellContent = '';
            if (cell.IsNoData === true) {
                cellContent = currentCol.Value;
            }
            else {
                cellContent = typeof currentCol.CustomCellRender === 'function' ?
                                                currentCol.CustomCellRender(currentCol, currentValue) :
                                                ((typeof (me.columnsHastable[currentCol.Name].CustomCellRender) === 'function' && isBody) ?
                                                            me.columnsHastable[currentCol.Name].CustomCellRender(currentCol, currentValue) :
                                                            currentValue);
            }

            //// If show tree, then add icon expand
            var tdClass = 'free-grid-td-' + (cell.ColIndex + cell.MergeColumnIndex) + ' '
                            + (currentCol.TdClass || (me.columnsHastable[currentCol.Name].TdClass || ''));
            if (options.showTree === true && currentRow.SubRows && me.columnsHastable[currentCol.Name].ShowCollapseExpand === true) {
                tdClass = 'tr-grid-collapse-expand';
            }

            //// For show/hide column
            if (me.columnsHastable[currentCol.Name].CanShowHide && me.columnsHastable[currentCol.Name].CanShowHide === true && (!options.enableHiddenColumns)) {
                tdClass += ' grid-show-hide-column';
            }

            var truncateClass = '';
            var allowTruncate = me.columnsHastable[currentCol.Name].AllowTruncate === true ? true : options.allowTruncate;
            if (allowTruncate === true) {
                truncateClass = ' column-truncate';
            }

            var titleTooltip = '';
            if (typeof (currentCol.Value) === 'string' &&
                (currentCol.Value.length * me.currentFontSize > me.columnsHastable[currentCol.Name].Width) &&
                allowTruncate === true) {
                titleTooltip = ' title="' + currentCol.Value + '" ';
            }

            var isCurrentColShowTree = (options.showTree === true &&
            currentRow.SubRows &&
            currentRow.SubRows.length > 0 && me.columnsHastable[currentCol.Name].ShowCollapseExpand === true);

            var paddingLeft = '';
            if ((isCurrentColShowTree && level !== 0) ||
            (level > 0 &&
                !(currentRow.SubRows && currentRow.SubRows.length > 0) &&
                me.columnsHastable[currentCol.Name].ShowCollapseExpand === true) ||
            (level === 0 && isCurrentColShowTree &&
                (!isValid(currentRow.SubRows) || currentRow.SubRows.length === 0))) {
                var totalPaddingLeft = level * options.treeParentPaddingLeft;
                paddingLeft = 'padding-left:' + totalPaddingLeft + 'px;';
                cell.Width -= totalPaddingLeft;
            }

            cellHtml.push('<' + container.HtmlTag + ' ' + container.CustomSpan + ' class="' + tdClass + '"' + ' style="' + container.Height + '"' + ' >');
            cellHtml.push('<div class="table-cell ' +
                            cell.CssClass + ' ' +
                            truncateClass +
                            '" style="width:' + cell.Width + 'px;' + paddingLeft + '" ' +
                            'align="' + cell.Align + '" ' + titleTooltip + cell.CustomAttr + '>');

            if (isCurrentColShowTree) {
                currentCollapseExpandId = me.gridId + '_tree_' + cell.ParentHighlight;
                cellHtml.push('<span class="grid-collapse-expand grid-expand ' +
                                currentCollapseExpandId + '-class' +
                                '" id="' + currentCollapseExpandId + '"></span>');
                currentCollapseExpandId += ' child-row';
            }

            var showRowIndexNumber = (isBody && options.showNumberColumn && cell.ColIndex === 0 && !cell.IsNoData);
            var currentRowIndexForCustomPager = 0;
            if (showRowIndexNumber) {
                if (options.customPager) {
                    currentRowIndexForCustomPager = cell.RowIndex + options.currentStartRowIndex + 1;
                }
                else {
                    currentRowIndexForCustomPager = (cell.RowIndex + 1);
                }
            }

            cellHtml.push(showRowIndexNumber ? currentRowIndexForCustomPager : cellContent);
            cellHtml.push('</div></' + container.HtmlTag + '>');

            return {
                CellHtml: cellHtml.join(''),
                CurrentCollapseExpandId: currentCollapseExpandId,
                CurrentColumnShowTree: isCurrentColShowTree
            };
        },
        RenderEmptyRow: function (columnName, columnValue, mergeColumnNumber, cssClass, showOnMainBody) {
            var me = this;
            var options = me.Options;
            var minusColumnNumber = 0;
            var hiddenColumns = options.hiddenColumns,
                i;
            if (options.numberOfFrozenColumn > 0) {
                for (i = 0; i < hiddenColumns.length; i++) {
                    if (hiddenColumns[i] < mergeColumnNumber) {
                        minusColumnNumber++;
                    }
                }
            }
            var columns = [{
                Name: columnName,
                Value: columnValue,
                MergeColNumber: mergeColumnNumber - minusColumnNumber,
                CssClass: cssClass
            }];
            if (showOnMainBody) {
                var minusMainColumnNumber = mergeColumnNumber - minusColumnNumber;
                if (options.numberOfFrozenColumn > 0) {
                    for (i = 0; i < hiddenColumns.length; i++) {
                        if (hiddenColumns[i] >= mergeColumnNumber) {
                            minusMainColumnNumber++;
                        }
                    }
                }
                columns.push({
                    Name: options.columns[minusMainColumnNumber].Name,
                    Value: PagerGridCurrentLanguage.noData,
                    MergeColNumber: (options.columns.length - minusMainColumnNumber),
                    CssClass: cssClass
                });
            }

            var emptyRowHtml = this.RenderNormalRow({
                Columns: columns
            }, 'td', true, 0, '', true, '');
            return emptyRowHtml;
        },
        RenderHeaderCell: function (cellInfo, currentColumn) {
            var me = this;
            var options = me.Options;
            var cellHtml = [];
            var cellTag = cellInfo.CellTag || 'td';
            var customSpan = cellInfo.CustomSpan || ' ';
            var cssClass = cellInfo.CssClass || ' ';
            var sortClass = cellInfo.SortClass || ' ';
            var customAttr = cellInfo.CustomAttr || ' ';
            var thClass = cellInfo.ThClass || ' ';
            var cellWidth = 'width:' + (cellInfo.CellWidth || '200') + 'px;';
            var cellHeight = isValid(cellInfo.CellHeight) ? ('height:' + (cellInfo.CellHeight || options.headerColumnHeight) + 'px;') : ' ';
            var cellId = isValid(cellInfo.CellId) ? ' id="' + cellInfo.CellId + '"' : " ";
            var sort = cellInfo.Sort || false;
            var cellColumnName = cellInfo.CellColumnName || '';
            var showClass = (isValid(cellInfo.CanShowHide) && cellInfo.CanShowHide) ? ('grid-show-hide-column') : ' ' + thClass;

            cellHtml.push('<' + cellTag + ' ' + customSpan + ' class="' + showClass + '" >');

            cellHtml.push('<div class="table-cell ' + cssClass + ' ' + sortClass +
                            '" style="' + cellWidth + cellHeight + '" ' + cellId +
                            ' align="' + cellInfo.CellAlign + '" ' + customAttr + '>');
            if (sort === true) {
                cellHtml.push('<div class="display-inline-block">');
            }

            if (typeof cellInfo.CustomHeaderRender === 'function') {
                cellHtml.push(cellInfo.CustomHeaderRender(currentColumn));
            }
            else {
                cellHtml.push(cellInfo.HeaderText);
            }

            if (sort === true) {
                var sortDirection = cellInfo.SortDirection || '';
                cellHtml.push('</div><div class="divSorter ' + sortDirection.toLowerCase() + '" data-columnname="' + cellColumnName + '"> </div>');
            }

            cellHtml.push('</div>');
            cellHtml.push('</' + cellTag + '>');
            return cellHtml.join('');
        },
        RenderBody: function (headerHtml, reRenderBody) {
            var me = this;
            var options = this.Options;
            var bodyHtml = (reRenderBody === true ? '' : (headerHtml + me.RenderCommonHeader('mainbody')));
            var bodyRowsHtml = [];
            var bodyFrozenHtml = [];
            var currentBodyRows = [];
            var currentPageStartIndex = 0,
                currentRow;

            if (options.sortOption.serverSortFunction == null &&
                options.sortOption.customGridSort == null) {
                var defaultSort = false,
                customSortFunction = null,
                sortType = null,
                columnName = '',
                currentDirection = '';
                for (var colIndex = 0; colIndex < options.columns.length; colIndex++) {
                    if (options.columns[colIndex].SortDirection != null
                    && options.columns[colIndex].SortDirection !== '') {
                        defaultSort = true;
                        currentDirection = options.columns[colIndex].SortDirection;
                        customSortFunction = options.columns[colIndex].CustomSortFunction;
                        columnName = options.columns[colIndex].Name;
                        sortType = options.columns[colIndex].SortType;
                        break;
                    }
                }

                if (defaultSort) {
                    options.bodyRows = Pager.Grid.Helper.GetSortedArray(options.bodyRows,
                                                                    columnName,
                                                                    currentDirection,
                                                                    customSortFunction,
                                                                    sortType);

                }
            }

            //// If show pager, then take approriate data range
            if (options.showPager === true && options.customPager !== true) {
                var startIndex = (options.pagerOption.currentPage * options.pagerOption.itemsPerPage);
                var endIndex = ((options.pagerOption.currentPage + 1) * options.pagerOption.itemsPerPage);
                currentBodyRows = options.bodyRows.slice(startIndex, endIndex);
                currentPageStartIndex = startIndex;
            }
            else {
                this.Options.currentStartRowIndex = options.pagerOption.currentPage * options.pagerOption.itemsPerPage;
                currentBodyRows = options.bodyRows;
            }

            var bodyLength = currentBodyRows.length;
            var currentFrozenRows = (options.numberOfFrozenColumn > 0) ?
                                    Pager.Grid.Helper.CreateRowsForFrozenColumn(currentBodyRows, options.numberOfFrozenColumn, me.frozenColsName) :
                                    [];
            var frozenBodyLength = currentFrozenRows.length;

            if (bodyLength > 0) {
                //// Render Frozen Row and Main Row at the same time
                for (var rowIndex = 0; rowIndex < frozenBodyLength; rowIndex++) {
                    currentRow = currentBodyRows[rowIndex];
                    var currentFrozenRow = currentFrozenRows[rowIndex];
                    bodyRowsHtml.push(me.RenderNormalRow(currentRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                    bodyFrozenHtml.push(me.RenderFrozenRow(currentFrozenRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                }

                //// If MainRow still has item, then continue render
                for (rowIndex = frozenBodyLength; rowIndex < bodyLength; rowIndex++) {
                    currentRow = currentBodyRows[rowIndex];
                    bodyRowsHtml.push(me.RenderNormalRow(currentRow, 'td', true, rowIndex + currentPageStartIndex, '', false, rowIndex, 0));
                }
            }
            else {
                //// Render There is no data, showNoDataOnFrozen
                var emptyData = PagerGridCurrentLanguage.noData;
                if (options.numberOfFrozenColumn > 0) {
                    if (options.showNoDataOnFrozen) {
                        //// Show No Info on the frozen table
                        bodyRowsHtml.push(me.RenderEmptyRow(options.columns[0].Name, emptyData, options.columns.length, 'no-data-frozen', false));
                        bodyFrozenHtml.push(me.RenderEmptyRow(options.columns[0].Name, emptyData, options.numberOfFrozenColumn, 'no-data-frozen', false));
                    }
                    else {
                        //// Show No Info on the main table
                        bodyRowsHtml.push(me.RenderEmptyRow(options.columns[0].Name, '', options.numberOfFrozenColumn, 'no-data-frozen', true));
                        bodyFrozenHtml.push(me.RenderEmptyRow(options.columns[0].Name, '', options.numberOfFrozenColumn, '', false));
                    }
                }
                else {
                    //// Show No Info on the main table
                    bodyRowsHtml.push(me.RenderEmptyRow(options.columns[0].Name, emptyData, options.columns.length, 'no-data-not-frozen', false));
                }
            }

            if (reRenderBody === true) {
                //if (ub.msie) {
                me.$grid.find('#' + me.frozenContentId + '> tbody').remove();
                me.$grid.find('#' + me.tableContentId + '> tbody').remove();
                var div = document.createElement("div");
                div.innerHTML = "<table><tbody>" + bodyFrozenHtml.join('') + "</tbody></table>";
                var frozenContainer = document.getElementById(me.frozenContentId);
                if (frozenContainer) {
                    frozenContainer.appendChild(div.firstChild.tBodies[0]);
                }
                div.innerHTML = "<table><tbody>" + bodyRowsHtml.join('') + "</tbody></table>";
                var mainContainer = document.getElementById(me.tableContentId);
                if (mainContainer) {
                    mainContainer.appendChild(div.firstChild.tBodies[0]);
                }
                //document.getElementById(me.tableContentId).getElementsByTagName('tbody')[0].outerHTML = '<body>' + bodyRowsHtml.join('') + '</body>';
                //                }
                //                else {
                //                    
                //                }
            }
            else {
                // Fixbug for replace $' string
                var bodyHtmlTemp = bodyHtml.split('{$}frozenBody');
                if (bodyHtmlTemp.length === 2) {
                    bodyHtml = bodyHtmlTemp[0] + bodyFrozenHtml.join('') + bodyHtmlTemp[1];
                }
                bodyHtmlTemp = bodyHtml.split('{$}_');
                if (bodyHtmlTemp.length === 2) {
                    bodyHtml = bodyHtmlTemp[0] + bodyRowsHtml.join('') + bodyHtmlTemp[1];
                }
            }

            return Pager.Grid.Helper.RemoveSpaceIE9(bodyHtml);
        },
        RenderFooter: function (reRender) {
            var me = this,
            //options = me.Options,
                footerHtml = [],
                frozenFooterHtml = [],
                currentFooterHtml = me.RenderFooterBody();
            reRender = reRender || false;
            if (reRender) {
                //currentFooterHtml
                me.$grid.find('.row_footer_content > thead').empty().append(currentFooterHtml.frozenFooterHtml);
                me.$grid.find('.col_footer_content > thead').empty().append(currentFooterHtml.footerHtml);
            }
            else {
                footerHtml.push('<div class="col_footer row-footer-background scroll-y">' +
                                '<div class="footer-container">' +
                                    '<table class="col_footer_content grid-fixed-table">' +
                                        '<thead>');

                frozenFooterHtml.push(' <div class="row_footer row-footer-background z999">' +
                                    ' <table class="grid-fixed-table row_footer_content">' +
                                    '    <thead>');


                currentFooterHtml = me.RenderFooterBody();

                footerHtml.push(currentFooterHtml.footerHtml);

                frozenFooterHtml.push(currentFooterHtml.frozenFooterHtml);

                frozenFooterHtml.push('   </thead>' + '</table>' + '</div>');

                footerHtml.push(' </thead>' + '</table>' + '</div>' + '</div>');

                return frozenFooterHtml.join('') + footerHtml.join('');
            }
        },
        RenderFooterBody: function () {
            var me = this;
            var options = me.Options;
            var footerHtml = [];
            var frozenFooterHtml = [];
            var footerRowsLength = options.footerRows.length,
                currentRow;

            var currentFrozenRows = (options.numberOfFrozenColumn > 0) ?
                                    Pager.Grid.Helper.CreateRowsForFrozenColumn(options.footerRows, options.numberOfFrozenColumn, me.frozenColsName) :
                                    [];
            var frozenFooterLength = currentFrozenRows.length;

            //// Render Frozen fotter and main Footer
            for (var rowIndex = 0; rowIndex < frozenFooterLength; rowIndex++) {
                currentRow = options.footerRows[rowIndex];
                var currentFrozenRow = currentFrozenRows[rowIndex];
                footerHtml.push(me.RenderNormalRow(currentRow, 'th', false, rowIndex, '', false, ''));
                frozenFooterHtml.push(me.RenderFrozenRow(currentFrozenRow, 'th', false, rowIndex, '', false, ''));
            }

            //// Render only main Footer
            for (rowIndex = frozenFooterLength; rowIndex < footerRowsLength; rowIndex++) {
                currentRow = options.footerRows[rowIndex];
                footerHtml.push(me.RenderNormalRow(currentRow, 'th', false, rowIndex, '', false, ''));
            }

            return {
                footerHtml: footerHtml.join(''),
                frozenFooterHtml: frozenFooterHtml.join('')
            };
        },
        RenderPager: function () {
            var me = this;
            var options = this.Options;
            var pagerOption = {};
            if (options.bodyRows.length > 0) {
                if ($.fn.PagerPagination === undefined) {
                    alert('Please include Pager.Pagination.cs');
                    return;
                }

                if (options.customPager && options.customPager === true) {
                    pagerOption =
                    {
                        callback: function (pageIndex, itemsPerPage, jq) {
                            if (me.Options.pagerOption.itemsPerPage !== itemsPerPage) {
                                pageIndex = 0;
                            }
                            options.pagerOption.pagerSelectCallBack(pageIndex, itemsPerPage, jq);
                        }
                    };
                }
                else {
                    pagerOption =
                    {
                        callback: function (pageIndex, itemsPerPage) {
                            if (me.Options.pagerOption.itemsPerPage !== itemsPerPage) {
                                pageIndex = 0;
                            }
                            me.Options.pagerOption.currentPage = pageIndex;
                            me.Options.pagerOption.itemsPerPage = itemsPerPage;
                            me.RenderBody('', true);
                            ////Re-render footer 
                            ////options.showFooter && options.bodyRows.length > 0 ? me.RenderFooter() : ""
                            if (options.showFooter && options.bodyRows.length > 0 && typeof (options.pagerOption.customRenderFooter) === 'function') {
                                var startIndex = (options.pagerOption.currentPage * options.pagerOption.itemsPerPage);
                                var endIndex = ((options.pagerOption.currentPage + 1) * options.pagerOption.itemsPerPage);
                                var currentBodyRows = options.bodyRows.slice(startIndex, endIndex);
                                me.Options.footerRows = options.pagerOption.customRenderFooter(
                                                                                                currentBodyRows,
                                                                                                options.pagerOption.currentPage,
                                                                                                options.pagerOption.itemsPerPage);
                                me.RenderFooter(true);
                            }
                            //                            if (typeof (options.pagerOption.afterPagedFunction) === 'function') {
                            //                                options.pagerOption.afterPagedFunction(options.pagerOption);
                            //                            }
                            me.gridOptions.isResetScroller = true;
                            $(me.$grid).gridScroller(me.gridOptions);
                            me.RenderPager();
                            me.RegisterMouseHoverEvent();
                            me.AutoResizeRowHeight();
                            //// Save for rerender
                            Pager.Grid.List[me.tableContentId].pagerOption = me.Options.pagerOption;
                            if (typeof (options.pagerOption.afterPagedFunction) === 'function') {
                                options.pagerOption.afterPagedFunction(options.pagerOption);
                            }
                            return false;
                        }
                    };
                }

                pagerOption.startPerPage = options.pagerOption.startPerPage;
                pagerOption.stepPerPage = options.pagerOption.pageStep;
                pagerOption.maxTtemsPerPage = options.pagerOption.maxItemsPerPage;
                pagerOption.itemsPerPage = options.pagerOption.itemsPerPage;
                pagerOption.currentPage = options.pagerOption.currentPage;
                pagerOption.totalItem = options.pagerOption.totalItem;
                pagerOption.itemsPerPageArray = options.pagerOption.itemsPerPageArray;
                pagerOption.showDetail = options.pagerOption.showDetail;

                this.$grid.find('#pagination').PagerPagination(pagerOption.totalItem, pagerOption);
            }
        },
        RegisterEvents: function () {
            var me = this;
            var options = me.Options;
            //// Sorting
            me.RegisterSortEvent();

            //// For Onclick Title Button
            if (options.showTitle === true) {
                if (typeof options.titleInfo.exportExcelFunction === 'function') {
                    me.$grid.parent().off('click', '#btnExport' + me.gridId, null).on('click', '#btnExport' + me.gridId, options.titleInfo.exportExcelFunction);
                }
                if (typeof options.titleInfo.backFunction === 'function') {
                    me.$grid.parent().off('click', '#btnBack' + me.gridId, null).on('click', '#btnBack' + me.gridId, options.titleInfo.backFunction);
                }
                if (typeof options.titleInfo.sendMailFunction === 'function') {
                    me.$grid.parent()
                            .off('click', '#btnSendMail' + me.gridId, null)
                            .on('click', '#btnSendMail' + me.gridId, options.titleInfo.sendMailFunction);
                }
                if (options.titleInfo.showCollapseExpandButton === true) {
                    me.$grid.parent().off('click', '#btnCollapseExpand' + me.gridId, null).on('click', '#btnCollapseExpand' + me.gridId, function () {
                        var $this = $(this);
                        if ($this.hasClass('expanded')) {
                            me.$grid.find('.child-row').hide();
                            me.$grid.find('.grid-collapse-expand').removeClass('grid-expand').addClass('grid-collapse');
                            $this.removeClass('expanded').addClass('collapsed');
                        }
                        else {
                            $this.removeClass('collapsed').addClass('expanded');
                            me.$grid.find('.grid-collapse-expand').removeClass('grid-collapse').addClass('grid-expand');
                            me.$grid.find('.child-row').show();
                        }
                        me.gridOptions.isResetScroller = false;
                        var gridOptions = Pager.Grid.List[me.tableContentId].gridOptions;
                        if (gridOptions) {
                            me.gridOptions.gridHeight = gridOptions.gridHeight;
                        }
                        $(me.$grid).gridScroller(me.gridOptions);
                    });
                }
            }

            //// Bind collapse expand event
            if (options.showTree === true) {
                me.$grid.off('click', '.parent-row > td.tr-grid-collapse-expand', null).on('click', '.parent-row > td.tr-grid-collapse-expand', function () {
                    var $this = $(this);
                    var collapseexpandspan = $this.find('.grid-collapse-expand');
                    var isExpand = false;
                    if (collapseexpandspan.hasClass('grid-expand')) {
                        me.$grid.find('.' + collapseexpandspan.attr('id') + '-class').removeClass('grid-expand').addClass('grid-collapse');
                        isExpand = false;
                    }
                    else {
                        me.$grid.find('.' + collapseexpandspan.attr('id') + '-class').removeClass('grid-collapse').addClass('grid-expand');
                        isExpand = true;
                    }
                    var $child = me.$grid.find('.' + collapseexpandspan.attr('id'));
                    if ($child.length > 0) {
                        $child.toggle();
                        for (var index = 0; index < $child.length; index++) {
                            var $currentChild = $($child[index]);
                            me.RecursiveCollapseExpandChild($currentChild, isExpand);
                        }
                        me.gridOptions.isResetScroller = false;
                        $(me.$grid).gridScroller(me.gridOptions);
                    }
                });
            }
        },
        RecursiveCollapseExpandChild: function ($current, isExpand) {
            var me = this;
            var collapseexpandspan = $current.find('.grid-collapse-expand');
            var $child = me.$grid.find('.' + collapseexpandspan.attr('id'));

            if (isExpand) {
                if (collapseexpandspan.hasClass('grid-expand')) {
                    $child.show();
                }
                else {
                    $child.hide();
                }
            }
            else {
                $child.hide();
            }

            for (var index = 0; index < $child.length; index++) {
                var $currentChild = $($child[index]);
                me.RecursiveCollapseExpandChild($currentChild, isExpand);
            }
        },
        RegisterSortEvent: function () {
            var me = this;
            var options = me.Options;
            //// For Sorting
            var colsLength = options.columns.length;
            for (var colIndex = 0; colIndex < colsLength; colIndex++) {
                var currentCol = options.columns[colIndex];

                if (currentCol.Sort === true) {
                    /*jshint ignore:start*/
                    me.$grid.off('click', '#' + me.gridId + '_header_sort_' + currentCol.Name, null)
                            .on('click', '#' + me.gridId + '_header_sort_' + currentCol.Name, function () {
                                var $this = $(this).find('.divSorter');
                                var currentDirection = '';
                                if ($this.hasClass('desc')) {
                                    me.$grid.find('.divSorter').removeClass('asc').removeClass('desc');
                                    $this.addClass('asc');
                                    currentDirection = 'asc';
                                }
                                else if ($this.hasClass('asc')) {
                                    me.$grid.find('.divSorter').removeClass('asc').removeClass('desc');
                                    $this.addClass('desc');
                                    currentDirection = 'desc';
                                }
                                else {
                                    me.$grid.find('.divSorter').removeClass('asc').removeClass('desc');
                                    $this.addClass('desc');
                                    currentDirection = 'desc';
                                }
                                var customSortFunction = null;
                                var sortType = null;
                                for (var colIndex = 0; colIndex < options.columns.length; colIndex++) {
                                    if (options.columns[colIndex].Name === $this.data('columnname')) {
                                        options.columns[colIndex].SortDirection = currentDirection.toLowerCase();
                                        customSortFunction = options.columns[colIndex].CustomSortFunction;
                                        sortType = options.columns[colIndex].SortType;
                                    }
                                    else {
                                        options.columns[colIndex].SortDirection = '';
                                    }
                                }
                                //customGridSort: null
                                if (typeof (options.sortOption.serverSortFunction) === 'function') {
                                    options.sortOption.serverSortFunction($this.data('columnname'), currentDirection);
                                }
                                else {
                                    if (typeof (options.sortOption.beforeGridSorted) === 'function') {
                                        options.bodyRows = options.sortOption.beforeGridSorted(options.bodyRows, $this.data('columnname'), currentDirection);
                                    }
                                    if (typeof (options.sortOption.customGridSort) === 'function') {
                                        options.bodyRows = options.sortOption.customGridSort(
                                                            options.bodyRows,
                                                            $this.data('columnname'),
                                                            currentDirection,
                                                            customSortFunction,
                                                            sortType);
                                    }
                                    else {
                                        options.bodyRows = Pager.Grid.Helper.GetSortedArray(options.bodyRows,
                                                                                        $this.data('columnname'),
                                                                                        currentDirection,
                                                                                        customSortFunction,
                                                                                        sortType);
                                    }
                                    me.ReRenderBodyAfterSort($this.data('columnname'), currentDirection);
                                    if (typeof (options.sortOption.afterGridSorted) === 'function') {
                                        options.bodyRows = options.sortOption.afterGridSorted(options.bodyRows, $this.data('columnname'), currentDirection);
                                    }
                                }
                            });
                    /*jshint ignore:end*/
                    continue;
                }
            }
        },
        RegisterMouseHoverEvent: function () {
            var me = this;
            var options = me.Options;
            //// For Mouse hover event
            if (options.showHighlightRow === true && options.numberOfFrozenColumn > 0) {
                me.$grid.find('.highlight-row').unbind('mouseenter mouseleave').mouseenter(function () {
                    var $this = $(this);
                    var hlattr = $this.attr('highlightatt');
                    if (isValid(hlattr)) {
                        if (hlattr.indexOf('frozen') > 0) {
                            me.$grid.find('tr[highlightatt="' + hlattr.replace('frozen', 'main') + '"]').addClass('mousehoverbeyond');
                        }
                        else {
                            me.$grid.find('tr[highlightatt="' + hlattr.replace('main', 'frozen') + '"]').addClass('mousehoverbeyond');
                        }
                    }
                }).mouseleave(function () {
                    var $this = $(this);
                    var hlattr = $this.attr('highlightatt');
                    if (isValid(hlattr)) {
                        if (hlattr.indexOf('frozen') > 0) {
                            me.$grid.find('tr[highlightatt="' + hlattr.replace('frozen', 'main') + '"]').removeClass('mousehoverbeyond');
                        }
                        else {
                            me.$grid.find('tr[highlightatt="' + hlattr.replace('main', 'frozen') + '"]').removeClass('mousehoverbeyond');
                        }
                    }
                });
            }
        },

        AutoResizeRowHeight: function () {
            var me = this,
                options = me.Options;
            if (options.autoFixFrozenRowHeight) {
                me.$grid.find('.content-container .highlight-row').each(function () {
                    var $this = $(this),
                        currentHeight = $this.height(),
                        hlattr = $this.attr('highlightatt');

                    if (isValid(hlattr)) {
                        me.$grid.find('.row_header tr[highlightatt="' + hlattr.replace('main', 'frozen') + '"]').css('height', currentHeight + 'px');
                    }
                });
                // Header
                var currentFrozenHeader = me.$grid.find('.grid-fixed-table.free-cell-top-left thead tr'),
                    currentFrozenBody = me.$grid.find('.grid-fixed-table.row_header_content thead tr');
                if (currentFrozenHeader.length > 0 && currentFrozenBody.length) {
                    me.$grid.find('.grid-fixed-table.col_header_content thead tr').each(function (index) {
                        var $trTable = $(this),
                            currentHeight = $trTable.height();

                        $(currentFrozenHeader[index]).css('height', currentHeight + 'px');
                        $(currentFrozenBody[index]).css('height', currentHeight + 'px'); s
                    });
                }
                // Footer
                var currentFrozenFooter = me.$grid.find('.grid-fixed-table.row_footer_content thead tr');
                if (currentFrozenFooter.length > 0) {
                    me.$grid.find('.col_footer_content.grid-fixed-table thead tr').each(function (index) {
                        var $trTable = $(this),
                            currentHeight = $trTable.height();

                        $(currentFrozenFooter[index]).css('height', currentHeight + 'px');
                    });
                }
            }
        }
    };

    //// Grid Helper
    Pager.Grid.Helper =
    {
        DetectBrowser: function () {
            //// Grid Scroller
            var matchedBrowser, browserDectect;

            // Use of jQuery.browser is frowned upon.
            // More details: http://api.jquery.com/jQuery.browser
            // jQuery.uaMatch maintained for back-compat
            function ubMatch(ua) {
                ua = ua.toLowerCase();

                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(trident)(?:.*rv:([\w.]+))?/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];

                return {
                    browserDectect: match[1] || "",
                    version: match[2] || "0"
                };
            }

            matchedBrowser = ubMatch(navigator.userAgent);
            browserDectect = {};

            if (matchedBrowser.browserDectect) {
                browserDectect[matchedBrowser.browserDectect] = true;
                browserDectect.version = matchedBrowser.version;

                if (matchedBrowser.browserDectect === 'trident') {
                    browserDectect.msie = true;
                }
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (browserDectect.chrome) {
                browserDectect.webkit = true;
            } else if (browserDectect.webkit) {
                browserDectect.safari = true;
            }

            return browserDectect;
        },
        RemoveItemForRowSpan: function (rows, currentRowIndex, mainColumn) {
            var rowSpanSize = mainColumn.MergeRowNumber;
            var columnName = mainColumn.Name;
            var currentLength = currentRowIndex + rowSpanSize;
            var rowsLength = currentLength < rows.length ? currentLength : rows.length;
            for (var rowIndex = currentRowIndex + 1; rowIndex < rowsLength; rowIndex++) {
                for (var colIndex = 0; colIndex < rows[rowIndex].Columns.length; colIndex++) {
                    var currentCol = rows[rowIndex].Columns[colIndex];
                    if (currentCol.Name === columnName) {
                        if (isValid(currentCol.Sort) && currentCol.Sort === true) {
                            var firstColIndex = Pager.Grid.Helper.GetColumnIndexFromColumnName(rows[currentRowIndex], currentCol.Name);
                            rows[currentRowIndex].Columns[firstColIndex].Sort = true;
                            rows[currentRowIndex].Columns[firstColIndex].SortDirection = currentCol.SortDirection;
                        }

                        if (isValid(mainColumn.MergeColNumber)) {
                            var mergeColLength = mainColumn.MergeColNumber + colIndex;
                            mergeColLength = (mergeColLength <= rows[rowIndex].Columns.length ? mergeColLength : 0);
                            for (var mergeColIndex = mergeColLength; mergeColIndex >= colIndex; mergeColIndex--) {
                                rows[rowIndex].Columns.splice(mergeColIndex, 1);
                                //rows[rowIndex].Columns.remove(mergeColIndex);
                            }
                        }
                        rows[rowIndex].Columns.splice(colIndex, 1);
                    }
                }
            }
        },
        GetColumnIndexFromColumnName: function (row, columnName) {
            for (var index = 0; index < row.Columns.length; index++) {
                if (row.Columns[index].Name === columnName) {
                    return index;
                }
            }
            return -1;
        },
        CreateRowsForFrozenColumn: function (mainRows, frozenColNumber, frozenColsName) {
            var frozenRows = [];
            var rowLength = mainRows.length;

            for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                var currentRow = mainRows[rowIndex];
                var newRow = clone(currentRow);
                newRow.Columns = [];
                var isset = false;
                var colsLength = currentRow.Columns.length < frozenColNumber ? currentRow.Columns.length : frozenColNumber;

                for (var colIndex = 0; colIndex < colsLength; colIndex++) {
                    var currentCol = currentRow.Columns[colIndex];
                    if (Pager.Grid.Helper.CheckExistName(frozenColsName, currentCol.Name)) {
                        newRow.Columns.push(clone(currentRow.Columns[colIndex]));
                        isset = true;
                    }
                }
                if (isset) {
                    frozenRows.push(newRow);
                }
            }

            return frozenRows;
        },
        CheckExistName: function (frozenColsName, name) {
            for (var colIndex = 0; colIndex < frozenColsName.length; colIndex++) {
                if (frozenColsName[colIndex] === name) {
                    return true;
                }
            }
            return false;
        },
        CheckHideColSpan: function (currentFrozenColums) {
            var colsLength = currentFrozenColums.length;
            for (var colIndex = 0; colIndex < colsLength; colIndex++) {
                if (!isValid(currentFrozenColums[colIndex].MergeRowNumber)) {
                    return false;
                }
            }
            return true;
        },
        GetArrayWidth: function (columns, enableHiddenColumns, isForComputingWidth) {
            var arrayWidth = [];
            var columnLength = columns.length;
            for (var columnIndex = 0; columnIndex < columnLength; columnIndex++) {
                var currentColumn = columns[columnIndex];
                if (isValid(enableHiddenColumns) &&
                    enableHiddenColumns === false &&
                    currentColumn.CanShowHide &&
                    currentColumn.CanShowHide === true &&
                    isForComputingWidth === false) {
                    continue;
                }
                else {
                    arrayWidth.push(currentColumn.Width);
                }
            }
            return arrayWidth;
        },
        GetColMergeWidth: function (arrayWidth, startIndex, colMergeNumber, enableHiddenColumns, columns) {
            var colWidth = 0;
            var finalColMergeNumber = colMergeNumber;
            var colLength = arrayWidth.length < (startIndex + colMergeNumber) ? arrayWidth.length : (startIndex + colMergeNumber);
            for (var colIndex = startIndex; colIndex < colLength; colIndex++) {
                if (isValid(enableHiddenColumns) && enableHiddenColumns === false && columns[colIndex].CanShowHide && columns[colIndex].CanShowHide === true) {
                    finalColMergeNumber--;
                }
                else {
                    colWidth += arrayWidth[colIndex];
                }
            }
            colWidth += ((finalColMergeNumber - 1) * 5);
            return colWidth;
        },
        GetColumnWidth: function (columns, name) {
            var colLength = columns.length;
            for (var colIndex = 0; colIndex < colLength; colIndex++) {
                if (columns[colIndex].Name === name) {
                    return columns[colIndex].Width;
                }
            }
            return 0;
        },
        GetColumnsHastable: function (columns) {
            var hastable = {};
            var colLength = columns.length;
            for (var colIndex = 0; colIndex < colLength; colIndex++) {
                var currentCol = columns[colIndex];
                hastable[currentCol.Name] = currentCol;
                hastable[currentCol.Name].ColumnIndex = colIndex;
            }
            return hastable;
        },
        SortByNumber: function (col1Value, col2Value, sortDirection) {
            var isNumber1 = !isNaN(col1Value);
            var isNumber2 = !isNaN(col2Value);

            if (isNumber1 && isNumber2) {
                var parseValCol1 = parseFloat(col1Value);
                var parseValCol2 = parseFloat(col2Value);
                if (sortDirection === 'asc') {
                    return parseValCol1 > parseValCol2 ? 1 : -1;
                }
                else {
                    return parseValCol1 < parseValCol2 ? 1 : -1;
                }
            }

            if (sortDirection === 'asc') {
                if (!isNumber1) {
                    return 1;
                }
            }
            else {
                if (!isNumber2) {
                    return 1;
                }
            }

            return -1;
        },
        GetSortedArray: function (rows, sortField, sortDirection, customSortFunction, sortType) {
            var sortColIndex = null;
            if (rows.length > 0) {
                var firstRow = rows[0];
                var colLength = firstRow.Columns.length;

                for (var colIndex = 0; colIndex < colLength; colIndex++) {
                    if (firstRow.Columns[colIndex].Name === sortField) {
                        sortColIndex = colIndex;
                        break;
                    }
                }
            }

            if (sortType != null) {
                sortType = sortType.toLowerCase();
            }

            sortDirection = sortDirection.toLowerCase();

            if (sortDirection === 'asc') {
                return rows.sort(function (row1, row2) {
                    return Pager.Grid.Helper.CompareRow(sortColIndex, row1, row2, sortField, sortType, function (col1Value, col2Value) {
                        if (typeof (customSortFunction) === 'function') {
                            return customSortFunction(col1Value, col2Value, sortDirection);
                        }

                        if (sortType != null) {
                            switch (sortType) {
                                case 'number':
                                    return Pager.Grid.Helper.SortByNumber(col1Value, col2Value, sortDirection);
                                case 'string':
                                    break;
                            }
                        }

                        return col1Value > col2Value ? 1 : -1;
                    });
                });
            }
            else {
                return rows.sort(function (row1, row2) {
                    return Pager.Grid.Helper.CompareRow(sortColIndex, row1, row2, sortField, sortType, function (col1Value, col2Value) {
                        if (typeof (customSortFunction) === 'function') {
                            return customSortFunction(col1Value, col2Value, sortDirection);
                        }

                        if (sortType != null) {
                            switch (sortType) {
                                case 'number':
                                    return Pager.Grid.Helper.SortByNumber(col1Value, col2Value, sortDirection);
                                case 'string':
                                    break;
                            }
                        }

                        return col1Value < col2Value ? 1 : -1;
                    });
                });
            }
        },
        CompareRow: function (sortColIndex, row1, row2, sortField, sortType, compareFunction) {
            //            var col1Value = row1.Columns[sortColIndex].Value;
            //            var col2Value = row2.Columns[sortColIndex].Value;
            //            if (sortType != null) {
            //                switch (sortType) {
            //                    case 'number':
            //                        
            //                }
            //            }

            return compareFunction(row1.Columns[sortColIndex].Value, row2.Columns[sortColIndex].Value);
        },
        SetColumnDisplay: function (columns, showHideArray) {
            var columnsLengh = columns.length;
            for (var colIndex = 0; colIndex < columnsLengh; colIndex++) {
                columns[colIndex].CanShowHide = false;
            }
            var showhidelength = showHideArray.length;
            for (var index = 0; index < showhidelength; index++) {
                columns[showHideArray[index]].CanShowHide = true;
            }
            return columns;
        },
        ComputeNewFrozenColumn: function (showhideArray, frozenColumnNumber) {
            var currentFrozenNumber = frozenColumnNumber;
            for (var index = 0; index < showhideArray.length; index++) {
                if (showhideArray[index] < currentFrozenNumber) {
                    frozenColumnNumber--;
                }
            }
            return frozenColumnNumber;
        },
        HideHeaderGroupWhenShowHide: function (hideColumns, startIndex, mergeColNumber) {
            var length = startIndex + mergeColNumber;
            for (var index = startIndex; index < length; index++) {
                if (!Pager.Grid.Helper.ArrayContains(hideColumns, index)) {
                    return false;
                }
            }
            return true;
        },
        ReComputeMergeColumAfterShowHide: function (hideColumns, startIndex, mergeColNumber) {
            var currentMergeCol = mergeColNumber;
            var length = startIndex + mergeColNumber;
            for (var index = startIndex; index < length; index++) {
                if (Pager.Grid.Helper.ArrayContains(hideColumns, index)) {
                    currentMergeCol--;
                }
            }
            return currentMergeCol;
        },
        UpdateSortInforAfterShowHideColumns: function (options, sortOption) {
            if (isValid(sortOption)) {
                var colsLength = options.columns.length;
                var customSortFunction = null;
                for (var colIndex = 0; colIndex < colsLength; colIndex++) {
                    if (options.columns[colIndex].Name === sortOption.SortColumnName) {
                        options.columns[colIndex].SortDirection = sortOption.SortDirection.toLowerCase();
                        customSortFunction = options.columns[colIndex].CustomSortFunction;
                    }
                }
                options.bodyRows = Pager.Grid.Helper.GetSortedArray(options.bodyRows, sortOption.SortColumnName, sortOption.SortDirection, customSortFunction);
            }
        },
        RemoveSpaceIE9: function (html) {
            if (ub.msie && parseInt(ub.version, 10) === 9 && html !== undefined) {
                var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
                html = html.replace(expr, '><');
            }

            return html;
        },
        CreateHeaderColumnsFromOptionsColumn: function (columns) {
            var colLength = columns.length;
            var colArray = [];
            for (var colIndex = 0; colIndex < colLength; colIndex++) {
                var currentCol = clone(columns[colIndex]);
                var currentWidth = currentCol.Width;
                if (isValid(currentCol.MergeHeaderColNumber) && currentCol.MergeHeaderColNumber > 0) {
                    var currentMaxLength = currentCol.MergeHeaderColNumber + colIndex;
                    colIndex++;
                    for (; colIndex < currentMaxLength && colIndex < colLength; colIndex++) {
                        currentWidth += columns[colIndex].Width + 5;
                    }
                    colIndex--;
                }
                currentCol.Width = currentWidth;
                colArray.push(currentCol);
            }
            return colArray;
        },
        ArrayContains: function (array, obj) {
            var i = array.length;
            while (i--) {
                if (array[i] === obj) {
                    return true;
                }
            }
            return false;
        },
        ComputeResizeColumn: function (mainContainer, options) {
            var resizeObject = {},
                columnHashtable = Pager.Grid.Helper.GetColumnsHastable(options.columns),
                pixelsPerCharacter = options.pixelsPerCharacter;

            resizeObject = Pager.Grid.Helper.ComputeMaxWidthInRows(options.bodyRows, resizeObject, columnHashtable, pixelsPerCharacter);

            if (options.showFooter) {
                resizeObject = Pager.Grid.Helper.ComputeMaxWidthInRows(options.footerRows, resizeObject, columnHashtable, pixelsPerCharacter);
            }

            var mainColLength = options.columns.length;
            for (var mainColIndex = 0; mainColIndex < mainColLength; mainColIndex++) {
                var currentResizeObject = resizeObject[options.columns[mainColIndex].Name];
                if (currentResizeObject != null) {
                    if (currentResizeObject.calculated || options.calTextWidthWithFontSize) {
                        options.columns[mainColIndex].Width = resizeObject[options.columns[mainColIndex].Name].length;
                    }
                    else {
                        options.columns[mainColIndex].Width = Pager.Grid.Helper.ComputeTextWidth(mainContainer, currentResizeObject.rawData) + 20;
                    }
                }
            }

            options = Pager.Grid.Helper.AutoAddWidthForFullScreen(options, mainContainer);

            return options;
        },
        AutoAddWidthForFullScreen: function (options, mainContainer) {
            var currentContainerWidth = mainContainer.parent().width(),
                totalCalulatedWidth = 0,
                colLength = options.columns.length,
                resizeCols = [];

            for (var i = 0; i < colLength; i++) {
                var currentCol = options.columns[i];
                if (currentCol.CanResize === true) {
                    if (typeof (currentCol.MaxResizeWidth) !== 'undefined' && currentCol.Width > currentCol.MaxResizeWidth) {
                        currentCol.Width = currentCol.MaxResizeWidth;
                    }

                    resizeCols.push({
                        colIndex: i,
                        colName: currentCol.Name,
                        colWidth: currentCol.Width
                    });
                }
                totalCalulatedWidth += currentCol.Width;

            }

            //// Add width for others columns
            totalCalulatedWidth += (options.columns.length - 1) * 5 + options.marginRight + (options.hideYBackGroundScroller ? 0 : options.scrollWidth);
            if (resizeCols.length > 0 && currentContainerWidth > totalCalulatedWidth) {
                var totalAddWidth = currentContainerWidth - totalCalulatedWidth,
                    addRowForEachColumn = totalAddWidth / resizeCols.length;

                for (i = 0; i < resizeCols.length; i++) {
                    var currentResizeCol = resizeCols[i];
                    options.columns[currentResizeCol.colIndex].Width = currentResizeCol.colWidth + addRowForEachColumn;
                }
            }

            return options;
        },
        ComputeMaxWidthInRows: function (rows, resizeObject, columnHashtable, pixelsPerCharacter) {
            var rowLength = rows.length;
            //currentPixelsPerChar = 0;

            for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                var currentRow = rows[rowIndex],
                    colLength = currentRow.Columns.length;
                for (var colIndex = 0; colIndex < colLength; colIndex++) {
                    var currentCol = currentRow.Columns[colIndex];
                    if (columnHashtable[currentCol.Name].CanResize === true) {
                        var textLength = 0;
                        var calculated = true;
                        if (typeof (resizeObject[currentCol.Name]) === 'undefined') {
                            resizeObject[currentCol.Name] = {
                                length: columnHashtable[currentCol.Name].Width,
                                calculated: true,
                                rawData: ''
                            };
                        }

                        if (columnHashtable[currentCol.Name].CalResizeFunction != null) {
                            textLength = columnHashtable[currentCol.Name].CalResizeFunction(currentCol.Value);
                        }
                        else {
                            if (columnHashtable[currentCol.Name].PixelsPerCharacter != null) {
                                if (currentCol.Value != null) {
                                    textLength = currentCol.Value.toString().length * columnHashtable[currentCol.Name].PixelsPerCharacter;
                                }
                            }
                            else {
                                //currentpixelsPerChar = Pager.Grid.;
                                if (currentCol.Value != null) {
                                    textLength = currentCol.Value.toString().length * pixelsPerCharacter;
                                }
                                calculated = false;
                            }

                            ////resizeResult = currentCol.Value.toString().length * currentpixelsPerChar;
                        }

                        if (resizeObject[currentCol.Name].length < textLength) {
                            resizeObject[currentCol.Name].length = textLength;
                            if (calculated === false) {
                                resizeObject[currentCol.Name].calculated = calculated;
                                if (currentCol.Value != null) {
                                    resizeObject[currentCol.Name].rawData = currentCol.Value.toString();
                                }
                            }
                        }
                    }
                }
            }

            return resizeObject;
        },
        ComputeTextWidth: function (mainContainer, text) {
            var tempElement = $('<div>' + text + '</div>')
            .css({
                'position': 'absolute',
                'float': 'left',
                'white-space': 'nowrap',
                'visibility': 'hidden'
            }).appendTo(mainContainer);
            var textWidth = tempElement.width();

            tempElement.remove();

            return textWidth;
        }
    };

    Pager.Grid.List = Pager.Grid.List || {};

    Pager.Grid.Constant = Pager.Grid.Constant ||
    {
        NO_DATA_INFO: $.fn.PagerGrid.defaults.noDataText
    };

    Pager.Grid.Language = Pager.Grid.Language || {};

    $.fn.gridScroller = function (opts) {
        return this.each(function () {
            var o = $(this);
            var xscrollbar = o.find(".x-scrollbar");
            var yscrollbar = o.find(".y-scrollbar");
            var container = o.find(".grid-container");
            var rowheader = o.find(".row_header");
            o.parent().removeClass('display-none');
            o.parent().show();
            o.show();
            o.parent().find('.grid-title').removeClass('display-none');
            var options = $.extend({}, $.fn.renderScroller.defaults, opts);

            if (!isValid(Pager.Grid.List[options.tblContentId])) {
                $(window).resize(function () {
                    if (!o.hasClass("display-none")) {
                        //o.resetGrid(options.tblContentId);
                        var opt = $.extend({}, {}, Pager.Grid.List[options.tblContentId].gridOptions);
                        opt.manualCopyHeader = true;
                        o.renderScroller(opt);
                        //                        o.find('.grid-fixed-table').each(function () {
                        //                            $(this).append(' ');
                        //                        });
                        //console.log("resize-" + options.tblContentId);
                    }
                });
                Pager.Grid.List[options.tblContentId] =
                {
                    gridOptions: options,
                    pagerOption: null,
                    sortOption: null
                };
            }
            else {
                Pager.Grid.List[options.tblContentId].gridOptions = options;
            }

            o.renderScroller(options);
            //o.find('.grid-fixed-table').append(' ');

            if (options.isResetScroller) {
                o.resetScroller(o, container, rowheader, xscrollbar, yscrollbar);
            } else {
                var top = yscrollbar.scrollTop();
                container.prop("scrollTop", top);
                rowheader.prop("scrollTop", top);
            }

            return new Scroller(o, container, rowheader, xscrollbar, yscrollbar);
        });
    };

    $.fn.initGrid = function (options) {
        return this.each(function () {
            var o = $(this);
            //Render Free Cell
            var freeCellTpl = '<div class="free-cell free-bottom-left">\
                    <table class="grid-fixed-table">\
                        <thead>\
                            <tr>\
                                <th class="free-cell-bottom-left">\
                                    <div>\
                                    </div>\
                                </th>\
                            </tr>\
                        </thead>\
                    </table>\
                </div>\
                <div class="free-cell free-top-right">\
                    <table class="grid-fixed-table">\
                        <thead>\
                            <tr>\
                                <th class="free-cell-top-right">\
                                    <div>\
                                    </div>\
                                </th>\
                            </tr>\
                        </thead>\
                    </table>\
                </div>\
                <div class="free-cell free-bottom-right">\
                    <table class="grid-fixed-table">\
                        <thead>\
                            <tr>\
                                <th class="free-cell-bottom-right">\
                                    <div>\
                                    </div>\
                                </th>\
                            </tr>\
                        </thead>\
                    </table>\
                </div>';
            o.append(freeCellTpl);
            //Render Scrollbar
            var scrollbarTpl = '<div class="y-scrollbar">\
                    <div class="scrollbar-y-content">\
                        &nbsp;</div>\
                </div>\
                <div class="x-scrollbar">\
                    <div class="scrollbar-x-content">\
                        &nbsp;</div>\
                </div>';
            o.append(scrollbarTpl);
            if (options.isShowPager) {
                var pagerTpl = '<div class="grid-pager">\
                                <div class="grid-pager-content">\
                                    <div id="pagination">&nbsp;</div>\
                                </div>\
                            </div>';
                o.append(pagerTpl);
            }
        });
    };

    $.fn.resetGrid = function () {
        return this.each(function () {
            var o = $(this);
            var xscrollbar = o.find(".x-scrollbar");
            var container = o.find(".grid-container");
            var colHeaderContainer = o.find(".col_header");
            var colFooterContainer = o.find(".col_footer");

            o.css("width", "");
            container.css("width", "");
            o.find(".content-container").css("width", "");
            xscrollbar.css("width", "");
            colHeaderContainer.css("width", "");
            colFooterContainer.css("width", "");
            colHeaderContainer.find(".header-container").css("width", "");
            o.find(".footer-container").css("width", "");
            o.find(".scrollbar-x-content").css("width", "");
            o.find(".free-cell-bottom-left").css("width", "");
        });
    };

    $.fn.resetScroller = function (o, container, rowheader, xscrollbar, yscrollbar) {
        yscrollbar.prop("scrollTop", 0);
        container.prop("scrollTop", 0);
        rowheader.prop("scrollTop", 0);

        container.prop("scrollLeft", 0);
        xscrollbar.prop("scrollLeft", 0);
        o.find(".col_header").prop("scrollLeft", 0);
        o.find(".col_footer").prop("scrollLeft", 0);
    };

    $.fn.renderScroller = function (options) {
        return this.each(function () {
            var bar = 17;
            var o = $(this);

            var isParentShow = o.parent().is(':visible');
            if (!isParentShow) {
                o.parent().css({ position: "absolute", visibility: "hidden", display: "block" });
            }

            var title = o.find(".grid-title");
            var titleHeight = (!title.hasClass('display-none') && title.length > 0) ? title.height() : 0;
            var pager = o.find(".grid-pager");
            var pagerHeight = pager.length > 0 ? pager.height() : 0;
            var xscrollbar = o.find(".x-scrollbar");
            var yscrollbar = o.find(".y-scrollbar");
            var container = o.find(".grid-container");
            var tblContent = o.find("#" + options.tblContentId);

            var freeCellTop = o.find(".free-top-right");
            var freeCellBottom = o.find(".free-bottom-right");

            var colHeaderContainer = o.find(".col_header");
            var rowHeaderContainer = o.find(".row_header");
            var rowHeaderWarpper = o.find(".row_header_wrapper");
            var colFooterContainer = o.find(".col_footer");
            var rowFooterContainer = o.find(".row_footer");
            var isShowFooter = !colFooterContainer.hasClass('display-none') && colFooterContainer.find("thead tr").length > 0;

            var numOfFreezeCol = options.numberFreezeCol;
            var col = options.column.length,
                i;
            if (col > 0) {
                options.gridWidth = 0;
                options.freezeWidth = 0;
                for (i = 0; i < col; i++) {
                    var colw = options.column[i];
                    options.gridWidth += colw;
                    if (i < numOfFreezeCol) {
                        options.freezeWidth += colw;
                    }
                }

                // (padding + border + padding) * col
                //options.gridWidth += (options.padding + 1 + options.padding) * col;
                options.gridWidth += (options.padding + 1 + options.padding) * col;
                options.freezeWidth += (numOfFreezeCol - 1) * options.padding * 2 + numOfFreezeCol - 1;
            }

            if (tblContent.height() === 0 && options.fullHeight === false) {
                tblContent.height(options.gridHeight);
            }

            var tblWidth = Math.max(tblContent.width(), options.gridWidth);
            var freezeWidth = options.freezeWidth;

            var parentWidth = o.parent().width();
            var browserWindowWidth = $(window).width();
            if (parentWidth > browserWindowWidth) {
                parentWidth = browserWindowWidth;
            }

            var gridWidth = options.fullWidth ? ((parentWidth < options.minWidth ? options.minWidth : parentWidth) - options.marginRight) : options.gridWidth;
            var isScrollX = gridWidth < tblWidth + 17;
            gridWidth = isScrollX ? gridWidth : (tblWidth + bar);

            o.css("width", gridWidth + "px");
            o.find(".content-container").css("width", tblWidth + "px");
            o.find(".col_header_content").css("width", tblWidth + "px");
            container.css("width", gridWidth + "px");
            xscrollbar.css("width", (gridWidth - freezeWidth - bar - (options.padding) * 2 - 1) + "px");
            colHeaderContainer.css("width", gridWidth + "px");
            colHeaderContainer.find(".header-container").css("width", tblWidth + "px");
            o.find(".footer-container").css("width", tblWidth + "px");
            o.find(".scrollbar-x-content").css("width", (tblWidth - freezeWidth - (isOnChromeBrowser ? 5 : 0)) + "px");
            o.find(".free-cell-bottom-left").css("width", freezeWidth + "px");
            pager.css("width", gridWidth + "px");
            rowHeaderContainer.css({
                "width": (freezeWidth + 5 + 17 + options.highlightFrozenWidth) + "px"
            });
            rowHeaderWarpper.css({
                "width": (freezeWidth + 5 + options.highlightFrozenWidth) + "px"
            });

            var tblHeight = tblContent.height();
            var freezeHeight = tblContent.find("thead").height();
            //var freezeFooterHeight = isShowFooter ? colFooterContainer.find("thead").height() + 3 : 0;
            var freezeFooterHeight = isShowFooter ? colFooterContainer.find("thead").height() + options.bottomBorderWidth : 0;
            var gridHeight = options.fullHeight ? ($(window).height() - options.gridHeight) : options.gridHeight;
            var isScrollY = gridHeight - titleHeight - pagerHeight - bar - freezeFooterHeight < tblHeight;
            gridHeight = isScrollY ? gridHeight : tblHeight + titleHeight + pagerHeight + bar + freezeFooterHeight;

            if (options.hideYBackGroundScroller) {
                o.css("width", (gridWidth - (!isScrollY && !isScrollX ? 18 : 0)) + "px");
                pager.css("width", (gridWidth - ((!isScrollY && !isScrollX ? 18 : 0) ? 18 : 0)) + "px");
            }

            var containerHeight = gridHeight - titleHeight - freezeFooterHeight - pagerHeight - bar + 1 - extraPosition;
            o.css("height", (gridHeight - 1 - (isScrollX ? -1 : bar)) + "px");
            rowHeaderContainer.css("height", containerHeight + "px");
            container.css("height", containerHeight + "px");
            rowHeaderWarpper.css("height", containerHeight + "px");
            yscrollbar.css("height", (containerHeight - freezeHeight - (ub.chrome || ub.msie ? 1 : 0) - options.heightScrollYAdd) + "px");
            o.find(".free-cell-top-right")
             .css("height", (freezeHeight - ((ub.msie || ub.chrome || ff16) ? (options.padding * 2 + 1) : 0) + (ub.chrome ? 1 : 0)) + "px");
            if (isShowFooter) {
                o.find(".free-cell-bottom-right").css("height", (freezeFooterHeight + (isScrollX ? bar : 0) + 1) + "px");
            }
            freeCellBottom.css("top", (gridHeight - pagerHeight - freezeFooterHeight - bar) + "px");
            o.find(".scrollbar-y-content").css("height", (tblHeight - freezeHeight) + "px");

            //// Fixed bug for IE10, wrong body Height
            var newTblHeight = tblContent.height();
            if (ub.msie && tblHeight !== newTblHeight) {
                tblHeight = newTblHeight;
                o.find(".scrollbar-y-content").css("height", (tblHeight - freezeHeight) + "px");
            }

            yscrollbar.css("top", (freezeHeight + titleHeight -
                                    (ub.chrome ? (colHeaderContainer.find("thead tr").length - 2) : 0) +
                                    options.heightScrollYAdd) + "px");
            xscrollbar.css("top", (gridHeight - pagerHeight - bar - 1 + extraPosition) + "px");
            if (numOfFreezeCol > 0) {
                o.find(".free-bottom-left").css("top", (gridHeight - pagerHeight - bar - 1 + extraPosition) + "px");
            }
            else {
                o.find(".free-bottom-left").remove();
            }

            rowFooterContainer.css({
                "top": (gridHeight - pagerHeight - freezeFooterHeight - bar + 1 - extraPosition) + "px",
                "border-top-width": options.bottomBorderWidth + "px"
            });
            colFooterContainer.css({
                "width": gridWidth + "px",
                "top": (gridHeight - pagerHeight - freezeFooterHeight - bar + 1 - extraPosition) + "px",
                "border-top-width": options.bottomBorderWidth + "px"
            });
            //pager.css("top", (gridHeight - pagerHeight - (isScrollX ? -(isShowFooter ? 0 : 1) : bar) - (isShowFooter ? 1 : 1)) + "px");
            pager.css("top", (gridHeight - pagerHeight - (isScrollX ? -(isShowFooter ? 0 : 1) : bar) - 2 + extraPosition * 2) + "px");

            xscrollbar.css("left", (freezeWidth + (options.padding) * 2 + 1 - extraPosition) + "px");
            yscrollbar.css("left", (gridWidth - bar - 1 + extraPosition) + "px");
            freeCellTop.css("left", (gridWidth - bar - 1 + extraPosition) + "px");
            freeCellBottom.css("left", (gridWidth - bar - 1) + "px");

            if (isScrollY) {
                yscrollbar.css("overflow-y", "scroll");
            }
            else {
                yscrollbar.css("overflow-y", "hidden");
            }

            if (isScrollX) {
                xscrollbar.css("overflow-x", "scroll");
            }
            else {
                xscrollbar.css("overflow-x", "hidden");
            }

            ////Recalculate Title Width
            var gridTitle = o.parent().find(".grid-title");
            if (gridTitle.length > 0) {
                gridTitle.width(o.width());
            }
            //// Fixbug show scroller on row header on chrome
            if (isOnChromeBrowser) {
                rowHeaderContainer.css("overflow", "hidden !important");
            }

            ////fix bug scoll in IE
            if (ub.msie) {
                yscrollbar.addClass("y-scrollbar-fix-width");
                xscrollbar.addClass("x-scrollbar-fix-height");
            }

            if (!isParentShow) {
                o.parent().css({ position: "", visibility: "", display: "" });
            }
        });
    };

    $.fn.renderScroller.defaults =
    {
        tblContentId: 'grid1',
        isUseLeftTable: false,
        isShowPager: false,
        column: [],
        numberFreezeCol: 2,
        fullWidth: true,
        fullHeight: true,
        gridWidth: 0,
        //=totalColumnWidth + totalColumn*4 +totalColumn
        minWidth: 600,
        gridHeight: 300,
        freezeWidth: 241,
        //=totalColumnWidth + (totalColumn-1)*2 + (totalColumn-1)
        padding: 2,
        marginRight: 20,
        isResetScroller: true,
        highlightFrozenWidth: 0,
        heightScrollYAdd: 0,
        hideYBackGroundScroller: true,
        bottomBorderWidth: 3
    };

    var Scroller = function (obj, container, rowheader, xscrollbar, yscrollbar) {
        this.preLeft = xscrollbar.scrollLeft();
        this.preTop = yscrollbar.scrollTop();
        this.colHeaderContainer = $(obj).find(".col_header");
        this.rowHeaderContainer = $(obj).find(".row_header");
        this.colFooterContainer = $(obj).find(".col_footer");
        this.init(container, rowheader, xscrollbar, yscrollbar);
    };

    Scroller.prototype =
    {
        init: function (container, rowheader, xscrollbar, yscrollbar) {
            var me = this;
            yscrollbar.scroll(function () {
                var top = yscrollbar.scrollTop();
                if (me.preTop !== top) {
                    container.prop("scrollTop", top);
                    me.rowHeaderContainer.prop("scrollTop", top);
                    me.preTop = top;
                }
            });

            container.scroll(function () {
                var top = container.scrollTop();
                if (me.preTop !== top) {
                    me.rowHeaderContainer.prop("scrollTop", top);
                    yscrollbar.prop("scrollTop", top);
                    me.preTop = top;
                }
                //
                if (isOnSmartPhoneBrowser) {
                    var left = container.scrollLeft();
                    if (me.preLeft !== left) {
                        me.colHeaderContainer.prop("scrollLeft", left);
                        me.colFooterContainer.prop("scrollLeft", left);
                        xscrollbar.prop("scrollLeft", top);
                        me.preLeft = left;
                    }
                }
            });

            rowheader.scroll(function () {
                var top = rowheader.scrollTop();
                if (me.preTop !== top) {
                    container.prop("scrollTop", top);
                    yscrollbar.prop("scrollTop", top);
                    me.preTop = top;
                }
            });

            xscrollbar.scroll(function () {
                var left = xscrollbar.scrollLeft();
                if (me.preLeft !== left) {
                    me.colHeaderContainer.prop("scrollLeft", left);
                    me.colFooterContainer.prop("scrollLeft", left);
                    container.prop("scrollLeft", left);
                    me.preLeft = left;
                }
            });

            if (isOnSmartPhoneBrowser) {
                me.colHeaderContainer.scroll(function () {
                    var left = me.colHeaderContainer.scrollLeft();
                    if (me.preLeft !== left) {
                        container.prop("scrollLeft", left);
                        me.colFooterContainer.prop("scrollLeft", left);
                        xscrollbar.prop("scrollLeft", top);
                        me.preLeft = left;
                    }
                });
                me.colFooterContainer.scroll(function () {
                    var left = me.colFooterContainer.scrollLeft();
                    if (me.preLeft !== left) {
                        container.prop("scrollLeft", left);
                        me.colHeaderContainer.prop("scrollLeft", left);
                        xscrollbar.prop("scrollLeft", top);
                        me.preLeft = left;
                    }
                });
            }
        }
    };


    //----------------------------------------------
    // Search Devives

    var deviceIphone = "iphone";
    var deviceIpod = "ipod";
    var deviceIpad = "ipad";
    var deviceS60 = "series60";
    var deviceSymbian = "symbian";
    var engineWebKit = "webkit";
    var deviceAndroid = "android";
    var deviceBB = "blackberry";
    var devicePalm = "palm";
    var deviceWinMob = "windows ce";

    var uagent = navigator.userAgent.toLowerCase();
    var currentDevice = "";
    function detectSmartPhone() {
        if (uagent.indexOf(deviceIphone) > -1) {
            currentDevice = deviceIphone;
            return true;
        }
        else if (uagent.indexOf(deviceIpod) > -1) {
            currentDevice = deviceIpod;
            return true;
        }
        else if (uagent.indexOf(deviceIpad) > -1) {
            currentDevice = deviceIpad;
            return true;
        }
        else if (uagent.indexOf(deviceS60) > -1) {
            currentDevice = deviceS60;
            return true;
        }
        else if (uagent.indexOf(deviceSymbian) > -1) {
            currentDevice = deviceSymbian;
            return true;
        }
        else if (uagent.indexOf(engineWebKit) > -1) {
            currentDevice = engineWebKit;
            return true;
        }
        else if (uagent.indexOf(deviceAndroid) > -1) {
            currentDevice = deviceAndroid;
            return true;
        }
        else if (uagent.indexOf(deviceBB) > -1) {
            currentDevice = deviceBB;
            return true;
        }
        else if (uagent.indexOf(devicePalm) > -1) {
            currentDevice = devicePalm;
            return true;
        }
        else if (uagent.indexOf(deviceWinMob) > -1) {
            currentDevice = deviceWinMob;
            return true;
        }
        else {
            return false;
        }
    }

    var isOnSmartPhoneBrowser = detectSmartPhone();
    var isOnChromeBrowser = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    var ub = Pager.Grid.Helper.DetectBrowser();
    ub.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    var ff16 = ub.mozilla && parseInt(ub.version, 10) >= 16;
    var ff18 = ub.mozilla && (parseInt(ub.version, 10) >= 18 && parseInt(ub.version, 10) < 25);
    var extraPosition = ff18 ? 1 : 0;

    function isValid(obj) {
        if (typeof obj !== "undefined" && obj != null) {
            return true;
        }
        return false;
    }

    function clone(obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    }

    //    Array.prototype.contains = function (obj) {
    //        var i = this.length;
    //        while (i--) {
    //            if (this[i] === obj) {
    //                return true;
    //            }
    //        }
    //        return false;
    //    };
})(jQuery);

//// Language
/* jshint ignore:start */
if (typeof (PagerGridLanguage) === 'undefined') {
    /* File Created: December 4, 2013 */
    var PagerGridLanguage = {};
    PagerGridLanguage['en-US'] = {
        noData: 'There is no data',
        pageSize: 'Page size',
        goToPage: 'Go To Page',
        pagingText: 'Displaying <b>{0}</b> to <b>{1}</b> of <b>{2}</b> item(s)'
    };

    var PagerGridCurrentLanguage = PagerGridLanguage['en-US'];
}
/* jshint ignore:end */
// Array Remove - By John Resig (MIT Licensed)
//Array.prototype.removeArrayItem1 = function (from, to) {
//    var rest = this.slice((to || from) + 1 || this.length);
//    this.length = from < 0 ? this.length + from : from;
//    return this.push.apply(this, rest);
//};



