var handler = {
    expandDivCenter: function () {
        $("#div-center").removeClass("narrow-div-center").addClass("div-center-searching");
    },

    collapseDivCenter: function () {
        $("#div-center").removeClass("div-center-searching").addClass("narrow-div-center");
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
        handler.inActiveTab($("#div_searching_tab"));
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
        //shrinkGrid = false;        
        //handler.hideDivRight();
        //handler.expandDivCenter();
    },

    showHomePage: function () {
        //shrinkGrid = true;
        //handler.showDivRight();
        //handler.collapseDivCenter();
    },

    redirectSearching: function (index) {
        $.cookie("tabIndex", index, { path: '/' });
        if (index == 0) {
            //shrinkGrid = true;
            handler.showSearchCarFirm();            
        }
        else {
            handler.hideSearchCarFirm();
            handler.showResultSearching();

            var searchingUrl = "";            
            var criteria = { ItemsPerPage: ItemsPerPage, CurrentPageIndex: 0 };

            switch(index)
            {
                case 1:
                    searchingUrl = "/Car/SearchingCarsForYou";                    
                    break;
                case 2:
                    searchingUrl = "/Car/SearchingCarsNewOld";
                    criteria.IsNew = 1;
                    break;
                case 3:
                    searchingUrl = "/Car/SearchingCarsNewOld";
                    criteria.IsNew = 0;
                    break;
                case 4:
                    searchingUrl = "/Car/SearchingCarsImportDomestic";
                    criteria.IsImport = 1;
                    break;
                case 5:
                    searchingUrl = "/Car/SearchingCarsImportDomestic";
                    criteria.IsImport = 0;
                    break;
            }
           
            SearchingCar.Searching(searchingUrl, criteria);
        }

        handler.inActiveTab($("#div_searching_tab"));
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
            $("#gridCarSimilarModel").show();
            $("#gridCarSimilarPrice").hide();            
            $("#car_similar_model").addClass("tabactive");            
        });

        $("#car_similar_price").click(function () {
            handler.inActiveTab($("#div_car_detail_similar"));
            $("#gridCarSimilarPrice").show();
            $("#gridCarSimilarModel").hide();            
            $("#car_similar_price").addClass("tabactive");

            var CarDetail = new Car.CarDetail();
            CarDetail.showSimilarPriceCarsList(carDetailId, carDetailPrice);
        }); 

        $("#car_showing").click(function () {
            handler.inActiveTab($("#div-car-yours"));
            $("#car_showing").addClass("tabactive");
            $(".freegrid").hide();
            $("#gridCarShowing").show();
            $.cookie("tabYourCars", "car_showing", { path: '/' });            
        });

        $("#car_waiting").click(function () {
            handler.inActiveTab($("#div-car-yours"));
            $("#car_waiting").addClass("tabactive");
            $(".freegrid").hide();
            $("#gridCarWaiting").show();
            $.cookie("tabYourCars", "car_waiting", { path: '/' });            
        });

        $("#car_saled").click(function () {
            handler.inActiveTab($("#div-car-yours"));
            $("#car_saled").addClass("tabactive");
            $(".freegrid").hide();
            $("#gridCarSaled").show();
            $.cookie("tabYourCars", "car_saled", { path: '/' });            
        });
      
        $("#car_notAllow").click(function () {
            handler.inActiveTab($("#div-car-yours"));
            $("#car_notAllow").addClass("tabactive");
            $(".freegrid").hide();
            $("#gridCarNotAllow").show();
            $.cookie("tabYourCars", "car_notAllow", { path: '/' });            
        });

        $("#car_expired").click(function () {
            handler.inActiveTab($("#div-car-yours"));
            $("#car_expired").addClass("tabactive");
            $(".freegrid").hide();
            $("#gridCarExpired").show();
            $.cookie("tabYourCars", "car_expired", { path: '/' });

            
            
            var SearchingCar = new Car.SearchingCar();
            SearchingCar.YourExpiredCar("/Car/YourExpiredCar", criteria);
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
               RenderFactory.renderModels(this.value, "#select_model");
           }
       );
    }
}