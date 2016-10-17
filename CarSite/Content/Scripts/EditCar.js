$(function () {

    EditCarHandler.bindingEvents();
    
    EditCarHandler.handlerElements();

    if (typeof (_isBuy) !== 'undefined' && _isBuy == true) {
        EditCarHandler.renderDataForBuying();
    }
    else {
        EditCarHandler.renderData();
        EditCarHandler.loadImages(_images, _carPath);
    }

    EditCarHandler.bindingData();

});

var jqXHRData;

var EditCarHandler = {

    loadImages: function (images, path) {
        _images.forEach(function (fileName) {
            if (fileName != "") {
                EditCarHandler.attachFiles(fileName, path);
            }
        });
    },

    attachFiles: function (fileName, path) {

        path += "/" + fileName;

        var idImage = "div_" + fileName.replace('.', '');

        var divImage = Dropzone.createElement("<div id='" + idImage + "' class='dz-preview dz-processing dz-image-preview dz-success'>	<div class='dz-details'>    		<div class='dz-filename'><span data-dz-name=''>" + fileName + "</span></div>   		<div class='dz-size' data-dz-size=''><strong>17.3</strong> KiB</div>    		<img data-dz-thumbnail='' alt='" + fileName + "' src='" + path + "'>  	</div> 	<div class='dz-progress'>span class='dz-upload' data-dz-uploadprogress='' style='width: 100%;'></span></div>  	<div class='dz-success-mark'><span>✔</span></div>  	<div class='dz-error-mark'><span>✘</span></div>  	<div class='dz-error-message'><span data-dz-errormessage=''></span></div> </div>");

        // Create the remove button
        var removeButton = Dropzone.createElement("<button>Remove file</button>");

        // Listen to the click event
        removeButton.addEventListener("click", function (e) {
            // Make sure the button click doesn't submit the form:
            e.preventDefault();
            e.stopPropagation();

            // If you want to the delete the file on the server as well,
            // you can do the AJAX request here.
            var deletedFile = { 'fileName': path };
            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: "/File/RemoveUploadedFileForEditing",
                data: JSON.stringify(deletedFile),
                success: function (result) {
                    $("#" + idImage).remove();
                },
                error: function (xhr) {
                }
            });

        });

        divImage.appendChild(removeButton);
        $("#dropzoneForm").append(divImage);
    },

    bindingData: function () {
        $("#carInsert_select_firm").val($("#Firm").val())
        RenderFactory.renderModels($("#Firm").val(), '#carInsert_select_model');

        $("#carInsert_select_model").val($("#Model").val());

        $("#carInsert_select_type").val($("#TypeId").val());
        $("#carInsert_select_province").val($("#ProvinceId").val());

        var currency = common.FormatNumber($("#CurrencyVN").val());
        $("#carInsert_select_CurrencyVN").val(currency);

        $("#select_price_from").val($("#PriceFromVN").val());

        $("#select_price_to").val($("#PriceToVN").val());

        $("#carInsert_select_year").val($("#Year").val());

        $("#carInsert_select_exterior_color").val($("#ExteriorColorId").val());
        $("#carInsert_select_interior_color").val($("#InteriorColorId").val());

        $("#carInsert_select_Fuel").val($("#FuelId").val());
        $("#carInsert_select_FuelSystem").val($("#FuelSystem").val());
        $("#carInsert_select_WheelDrive").val($("#WheelDriveId").val());
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

        $("#carInsert_select_CurrencyVN").change(
                function () {
                    $("#CurrencyVN").val(this.value);

                    var value = common.FormatNumber(this.value);
                    $(this).val(value);
                }
           );

        $("#select_price_from").change(
                function () {
                    $("#PriceFromVN").val(this.value);
                }
           );

        $("#select_price_to").change(
               function () {
                   $("#PriceToVN").val(this.value);
               }
          );

        $("#carInsert_select_GearBox").click(
                function () {

                    $("#GearBox").val(this.value);

                    if (this.value == "4") {
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

        $("#uploadCar").click(
              function () {
                  if (EditCarHandler.validateData()) {
                      EditCarHandler.editCar(_carId);
                  } else {                      
                      common.ShowInfoMessage("Vui lòng nhập Tiêu đề và Thông tin mô tả ");
                      if($("#Title").val() == "")
                      {
                          $("#Title").focus();
                      }
                      else {
                          $("#Description").focus();
                      }
                  }
              }
          );

        $("#buyCar").click(
              function () {
                  if (EditCarHandler.validateData()) {
                      EditCarHandler.editCarBuying(_carId);
                  } else {
                      common.ShowInfoMessage("Vui lòng nhập Tiêu đề và Thông tin mô tả ");
                      if ($("#Title").val() == "") {
                          $("#Title").focus();
                      }
                      else {
                          $("#Description").focus();
                      }
                  }
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

    renderDataForBuying: function () {
        RenderFactory.renderModels('', '#carInsert_select_model');
        RenderFactory.renderTypes('#carInsert_select_type', true);
        RenderFactory.renderProvinces('#carInsert_select_province', true);
        RenderFactory.renderColors('#carInsert_select_exterior_color', true);
        RenderFactory.renderColors('#carInsert_select_interior_color', true);
        RenderFactory.renderFuels('#carInsert_select_Fuel', true);
        RenderFactory.renderFuelSystems('#carInsert_select_FuelSystem', true);
        RenderFactory.renderWheelDrive('#carInsert_select_WheelDrive', true);
        RenderFactory.renderGearBox("#carInsert_select_GearBox", true);
        RenderFactory.renderGearBoxNumber("#GearBoxNumber");

        RenderFactory.renderYear("carInsert_select_year", true);
    },

    handlerElements: function () {
        EditCarHandler.hideElements();
        EditCarHandler.adjustWidth(200);
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
        $("#PriceFromVN").hide();
        $("#PriceToVN").hide();
        $("#Year").hide();
    },

    adjustWidth: function (width) {
        $("#divCarEdit input").width(width);
        $("#divCarEdit select").width(width);

        $("#select_price_from").width(80);
        $("#select_price_to").width(80);

    },

    validateData: function () {

        return $("#Title").val() != "" && $("#Description").val() != "";
    },

    editCar: function (carId) {

        var criteria = {
            CarId: carId,
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
            url: "/Car/EditCar",
            data: JSON.stringify(criteria),
            success: function (error) {
                if (error <= 0) {
                    common.ShowInfoMessage("Sửa tin thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                } else {
                    common.ShowErrorMessage("Lỗi sưả tin, vui lòng thử lại !");
                }
            },
            error: function (xhr) {
                common.ShowErrorMessage("Lỗi sưả tin, vui lòng thử lại !");                
            }
        });
    },

    editCarBuying: function (carId) {

        var criteria = {
            CarId: carId,
            Title: $("#Title").val(),
            Firm: $("#Firm").val(),
            Model: $("#Model").val(),
            IsNew: $("#IsNew").is(":checked"),
            IsImport: $("#IsImport").is(":checked"),
            TypeId: $("#TypeId").val(),
            PriceFromVN: $("#PriceFromVN").val(),
            PriceToVN: $("#PriceToVN").val(),
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
            url: "/Car/EditCarBuying",
            data: JSON.stringify(criteria),
            success: function (error) {
                if (error <= 0) {                    
                    common.ShowInfoMessage("Sửa tin thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                    window.location = '/car/yours';
                }
                else {
                    common.ShowErrorMessage("Lỗi sưả tin, vui lòng thử lại !");
                }

            },
            error: function (xhr) {
                common.ShowErrorMessage("Lỗi sưả tin, vui lòng thử lại !");
            }
        });
    }
}

