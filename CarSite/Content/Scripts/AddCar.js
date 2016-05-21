$(function () {
    RenderFactory.renderModels('Acura', '#carInsert_select_model');
    RenderFactory.renderTypes('#carInsert_select_type');
    RenderFactory.renderProvinces('#carInsert_select_province');
    RenderFactory.renderColors('#carInsert_select_exterior_color');
    RenderFactory.renderColors('#carInsert_select_interior_color');
    RenderFactory.renderFuels('#carInsert_select_Fuel');
    RenderFactory.renderFuelSystems('#carInsert_select_FuelSystem');
    RenderFactory.renderWheelDrive('#carInsert_select_WheelDrive');

    AddCarHandler.hideElements();
    AddCarHandler.adjustWidth(200);

    $("#carInsert_select_firm").change(
           function () {
               RenderFactory.renderModels(this.value, '#carInsert_select_model');
               $("#Firm").val(this.value);
           }
       );

});


var AddCarHandler = {
    hideElements: function () {
        $("#Firm").hide();
        $("#Model").hide();
        $("#Type").hide();
        $("#ProvinceId").hide();
        $("#InteriorColorId").hide();
        $("#ExteriorColorId").hide();
        $("#FuelId").hide();
        $("#FuelSystem").hide();
        $("#WheelDriveId").hide();
    },

    adjustWidth: function(width)
    {
        $("#divCarInsert input").width(width);
        $("#divCarInsert select").width(width);        
    }

}

