﻿var handler = {
    hideDivLeft: function () {
        $("#div-left").hide();
    },

    hideSearchCarFirm: function () {
        $("#search_car_firm").hide();
        $("#span_searching").removeClass("collapse-searching").addClass("expand-searching");
    },

    bindEvents: function () {
        $("#car-similar-model").click(function () {
            $("#car-similar-model").addClass("tabactive");
            $("#car-similar-price").removeClass("tabactive");
        });

        $("#car-similar-price").click(function () {
            $("#car-similar-price").addClass("tabactive");
            $("#car-similar-model").removeClass("tabactive");
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