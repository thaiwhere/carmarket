var handler = {
    hideDivLeft: function () {
        $("#div-left").hide();
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

    redirectSearching: function (index) {
        $.cookie("tabIndex", index, { path: '/' });
        if (index == 0) {
            handler.showSearchCarFirm();
        }
        else{
            handler.hideSearchCarFirm();
            //if (location.href.indexOf("SearchingCars") < 0) {
            //    location.href = "/car/SearchingCars";
            //}
            switch(index)
            {
                case 1: location.href = "/car/SearchingCarsForYou"; break;
                case 2: location.href = "/car/SearchingNewCars"; break;
                case 3: location.href = "/car/SearchingOldCars"; break;
            }
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

        $("#select-firm").change(
            function () {
                SearchingHandler.renderModels(this.value);
            }
        );
    }
}