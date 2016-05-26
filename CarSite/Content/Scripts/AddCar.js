$(function () {

    //AddCarHandler.initFileUploadWithCheckingSize();
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
                   AddCarHandler.insertCar();
                   //AddCarHandler.uploadFiles();
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
    },

    adjustWidth: function (width) {
        $("#divCarInsert input").width(width);
        $("#divCarInsert select").width(width);
    },

    insertCar: function () {

        var criteria = {
            Title: $("#Title").val(),
            Firm: $("#Firm").val(),
            Model: $("#Model").val(),
            IsNew: $("#IsNew").checked,
            IsImport: $("#IsImport").checked,
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
                callback(gridId, result);
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    },

    uploadFiles:function(){
        if (jqXHRData) {
            var isStartUpload = true;
            var uploadFile = jqXHRData.files[0];

            //jqXHRData.files = jqXHRData.originalFiles;

            if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(uploadFile.name)) {
                alert('You must select an image file only');
                isStartUpload = false;
            } else if (uploadFile.size > 4000000) { // 4mb
                alert('Please upload a smaller image, max size is 4 MB');
                isStartUpload = false;
            }
            if (isStartUpload) {
                jqXHRData.submit();
            }
        }
    },

    initFileUploadWithCheckingSize: function () {
        'use strict';
        
        Dropzone.autoDiscover = false;
        //Simple Dropzonejs
        $("#dZUpload").dropzone({
            url: "/File/ProcessRequest",
            maxFiles: 5,
            addRemoveLinks: true,
            success: function (file, response) {
                alert('success');
                var imgName = response;
                file.previewElement.classList.add("dz-success");
                console.log("Successfully uploaded :" + imgName);
            },
            error: function (file, response) {
                alert('failt');
                file.previewElement.classList.add("dz-error");
            }
        });

        //$('.dz-hidden-input').fileupload({
        //    url: '/File/UploadFile',
        //    dataType: 'json',
        //    add: function (e, data) {
        //        jqXHRData = data;
        //        //Dropzone.prototype.addFile(data);
        //    },
        //    done: function (event, data) {
        //        if (data.result.isUploaded) {

        //        }
        //        else {

        //        }
        //        alert(data.result.message);
        //    },
        //    fail: function (event, data) {
        //        if (data.files[0].error) {
        //            alert(data.files[0].error);
        //        }
        //    }
        //});
    }


}

