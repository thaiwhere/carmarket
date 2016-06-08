$(function () {

    AddCarHandler.bindingEvents();
    AddCarHandler.renderData();
    AddCarHandler.initData();
    AddCarHandler.handlerElements();    

});

var jqXHRData;

var AddCarHandler = {

    initData: function () {
        $("#Firm").val($("#carInsert_select_firm").val());
        $("#Model").val($("#carInsert_select_model").val());
        $("#TypeId").val($("#carInsert_select_type").val());
        $("#ProvinceId").val($("#carInsert_select_province").val());

        $("#ExteriorColorId").val($("#carInsert_select_exterior_color").val());
        $("#InteriorColorId").val($("#carInsert_select_interior_color").val());
        $("#FuelId").val($("#carInsert_select_Fuel").val());
        $("#FuelSystem").val($("#carInsert_select_FuelSystem").val());
        $("#WheelDriveId").val($("#carInsert_select_WheelDrive").val());
    },

    bindingEvents: function () {
        $("#carInsert_select_firm").change(
          function () {
              RenderFactory.renderModels(this.value, '#carInsert_select_model');
              $("#Firm").val(this.value);
          }
      );

        $("#carInsert_select_model").change(
               function () {
                   $("#Model").val(this.value);
               }
           );

        $("#carInsert_select_type").change(
               function () {
                   $("#TypeId").val(this.value);
               }
           );

        $("#carInsert_select_year").change(
              function () {
                  $("#Year").val(this.value);
              }
          );

        $("#carInsert_select_province").change(
               function () {
                   $("#ProvinceId").val(this.value);
               }
           );

        $("#carInsert_select_exterior_color").change(
               function () {
                   $("#ExteriorColorId").val(this.value);
               }
           );

        $("#carInsert_select_interior_color").change(
               function () {
                   $("#InteriorColorId").val(this.value);
               }
           );

        $("#carInsert_select_Fuel").change(
               function () {
                   $("#FuelId").val(this.value);
               }
           );

        $("#carInsert_select_FuelSystem").change(
               function () {
                   $("#FuelSystem").val(this.value);
               }
           );

        $("#carInsert_select_WheelDrive").change(
               function () {
                   $("#WheelDriveId").val(this.value);
               }
           );

        $("#uploadCar").click(
               function () {
                   if (AddCarHandler.validateData()) {
                       AddCarHandler.insertCar();
                   } else {
                       alert("Vui lòng nhập Tiêu đề và Thông tin mô tả ");
                   }
               }
           );

        $("#carInsert_select_CurrencyVN").change(
                function () {
                    $("#CurrencyVN").val(this.value);

                    var value = common.FormatNumber(this.value);
                    $(this).val(value);
                }
           );
        
        $("#carInsert_select_GearBox").click(
                function () {

                    $("#GearBox").val(this.value);

                    if(this.value == "4")
                    {
                        $("#GearBoxNumber").show();                        
                    }
                    else {
                        $("#GearBoxNumber").hide();
                    }
                }
           );

        $("#GearBoxNumber").click(
              function () {
                  $("#GearBox").val(this.value);                 
              }
         );
    },

    renderData: function () {
        RenderFactory.renderModels('Acura', '#carInsert_select_model');
        RenderFactory.renderTypes('#carInsert_select_type');
        RenderFactory.renderProvinces('#carInsert_select_province');
        RenderFactory.renderColors('#carInsert_select_exterior_color');
        RenderFactory.renderColors('#carInsert_select_interior_color');
        RenderFactory.renderFuels('#carInsert_select_Fuel');
        RenderFactory.renderFuelSystems('#carInsert_select_FuelSystem');
        RenderFactory.renderWheelDrive('#carInsert_select_WheelDrive');
        RenderFactory.renderGearBox("#carInsert_select_GearBox");
        RenderFactory.renderGearBoxNumber("#GearBoxNumber");

        RenderFactory.renderYear("carInsert_select_year");
    },

    handlerElements: function () {
        AddCarHandler.hideElements();
        AddCarHandler.adjustWidth(200);
    },

    hideElements: function () {
        $("#Firm").hide();
        $("#Model").hide();
        $("#TypeId").hide();
        $("#ProvinceId").hide();
        $("#InteriorColorId").hide();
        $("#ExteriorColorId").hide();
        $("#FuelId").hide();
        $("#FuelSystem").hide();
        $("#WheelDriveId").hide();
        $("#GearBox").hide();
        $("#GearBoxNumber").hide();
        $("#CurrencyVN").hide();
        $("#Year").hide();
    },

    adjustWidth: function (width) {
        $("#divCarInsert input").width(width);
        $("#divCarInsert select").width(width);
    },

    validateData: function () {

        return $("#Title").val() != "" && $("#Description").val() != "";       
    },

    insertCar: function () {

        var criteria = {
            Title: $("#Title").val(),
            Firm: $("#Firm").val(),
            Model: $("#Model").val(),
            IsNew: $("#IsNew").is(":checked"),
            IsImport: $("#IsImport").is(":checked"),
            TypeId: $("#TypeId").val(),
            CurrencyVN: $("#CurrencyVN").val(),
            Year: $("#Year").val(),
            Km: $("#Km").val(),
            Description: $("#Description").val(),

            ProvinceId: $("#ProvinceId").val(),
            SeatNo: $("#SeatNo").val(),
            GateNo: $("#GateNo").val(),
            ExteriorColorId: $("#ExteriorColorId").val(),
            InteriorColorId: $("#InteriorColorId").val(),
            FuelConsumption: $("#FuelConsumption").val(),
            FuelId: $("#FuelId").val(),
            FuelSystem: $("#FuelSystem").val(),
            GearBox: $("#GearBox").val(),
            WheelDriveId: $("#WheelDriveId").val()
        };

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: "/Car/InsertCar",
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result > 0) {                    
                    alert("Đăng tin thành công");
                    window.location = '/home/index';
                } else {
                    alert("Lỗi đăng tin, vui lòng thử lại !");
                }
            },
            error: function (xhr) {
                alert("Lỗi đăng tin, vui lòng thử lại !");
                //common.HandleAjaxError(xhr);
            }
        });
    }    
}

