﻿var handler = {
    expandDivCenter: function () {
        $("#div-center").removeClass("div-center").addClass("div-center-searching");
    },

    collapseDivCenter: function () {
        $("#div-center").removeClass("div-center-searching").addClass("div-center");
    },

    hideDivLeft: function () {
        $("#div-left").hide();
    },

    showDivRight: function () {
        $("#div-right").show();
    },

    hideDivRight: function () {
        $("#div-right").hide();
    },

    hideSearchCarFirm: function () {
        $("#search_car_firm").hide();                
    },

    showSearchCarFirm: function () {
        $("#search_car_firm").show();
    },

    inActiveTab: function(parent){
        var obj = parent.find(".tabactive");
        if (obj) {
            obj.removeClass("tabactive");
        }
    },

    setSearchingActiveTab:function(){
        handler.inActiveTab($("#div_searching_criteria"));
        var tabIndex = $.cookie("tabIndex");
        if (tabIndex != 'undefined') {
            switch (tabIndex) {
                case "0": $("#car_searching").addClass("tabactive"); break;
                case "1": $("#car_for_you").addClass("tabactive"); break;
                case "2": $("#car_new").addClass("tabactive"); break;
                case "3": $("#car_old").addClass("tabactive"); break;
                case "4": $("#car_import").addClass("tabactive"); break;
                case "5": $("#car_domestic").addClass("tabactive"); break;
            }
        }
    },

    showResultSearching:function(){
        shrinkGrid = false;        
        handler.hideDivRight();
        handler.expandDivCenter();
    },

    showHomePage: function () {
        shrinkGrid = true;
        handler.showDivRight();
        handler.collapseDivCenter();
    },

    redirectSearching: function (index) {
        $.cookie("tabIndex", index, { path: '/' });
        if (index == 0) {
            shrinkGrid = true;
            handler.showSearchCarFirm();            
        }
        else {
            handler.hideSearchCarFirm();
            handler.showResultSearching();            
            
            switch(index)
            {
                case 1:
                    searchingUrl = "/Car/SearchingCarsForYou";                                        
                    break;
                case 2:
                    searchingUrl = "/Car/SearchingNewCars";                    
                    break;
                case 3:
                    searchingUrl = "SearchingOldCars";                    
                    break;
                case 4:
                    searchingUrl = "SearchingImportCars";
                    break;
                case 5:
                    searchingUrl = "SearchingDomesticCars";
                    break;
            }
           
            SearchingCar.Searching(searchingUrl, { itemsPerPage: itemsPerPage, currentPageIndex: 0 });

            //if (location.href.indexOf("SearchingCars") < 0) {
            //    $.cookie("searchingUrl", searchingUrl, { path: '/' });
            //    location.href = "/car/SearchingCars";
            //}
            //else {
            //    SearchingCar.Searching(searchingUrl, { itemsPerPage: itemsPerPage, currentPageIndex: 0 });
            //}
        }

        handler.inActiveTab($("#div_searching_criteria"));
    },

    bindEvents: function () {
        
        $("#car_searching").click(function () {
            handler.redirectSearching(0);            
            $("#car_searching").addClass("tabactive");            
        });

        $("#car_for_you").click(function () {
            handler.redirectSearching(1);
            $("#car_for_you").addClass("tabactive");            
        });

        $("#car_new").click(function () {
            handler.redirectSearching(2);
            $("#car_new").addClass("tabactive");
        });

        $("#car_old").click(function () {
            handler.redirectSearching(3);
            $("#car_old").addClass("tabactive");
        });

        $("#car_import").click(function () {
            handler.redirectSearching(4);
            $("#car_import").addClass("tabactive");
        });

        $("#car_domestic").click(function () {
            handler.redirectSearching(5);
            $("#car_domestic").addClass("tabactive");
        });

        $("#car_similar_model").click(function () {
            handler.inActiveTab($("#div_car_detail_similar"));
            $("#car_similar_model").addClass("tabactive");            
        });

        $("#car_similar_price").click(function () {
            handler.inActiveTab($("#div_car_detail_similar"));
            $("#car_similar_price").addClass("tabactive");            
        });

        $("#car_detail_info_basic_tab").click(function () {
            handler.inActiveTab($("#div_car_detail_info"));
            $("#car_detail_info_basic_tab").addClass("tabactive");

            $("#car_detail_info_basic").css('display', 'inline-block');
            $("#car_detail_info_technical").hide();
        });

        $("#car_detail_info_technical_tab").click(function () {
            handler.inActiveTab($("#div_car_detail_info"));
            $("#car_detail_info_technical_tab").addClass("tabactive");

            $("#car_detail_info_technical").css('display', 'inline-block');
            $("#car_detail_info_basic").hide();
        });        

        $("#select-model-all").change(function () {
            $(".checkbox-model").prop('checked', $(this).prop("checked"));
        });

        $("#span_searching").click(function () {
            $("#search_car_firm").toggle();

            if ($('#span_searching').hasClass("expand-searching")) {
                $("#span_searching").removeClass("expand-searching").addClass("collapse-searching");
            }
            else {
                $("#span_searching").removeClass("collapse-searching").addClass("expand-searching");
            }
        });

        $(".car-photo").hover(
          function () {
              var img_name = $(this).find("img").attr('src').split("/").pop();
              var img_name_only = img_name.substring(1, img_name.length - 4);
              var new_img_src = $(this).find("img").attr('src').replace(img_name_only, img_name_only + "_big");

              $(this).append($("<div class='car-div-large'><img class='car-img-large' src='" + new_img_src + "'></img></div>"));
          }, function () {
              $(this).find("div:last").remove();
          }
        );

        $("#menu li").click(
            function () {
                $("#menu li").removeClass("active");
                $(this).addClass("active");
            }
        );

        $("#select_firm").change(
            function () {
                SearchingHandler.renderModels(this.value);
            }
        );
    }
}