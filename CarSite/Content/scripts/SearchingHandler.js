function expandSearching() {
    $("#search-car-firm").show();
    $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");
}

function collapseSearching() {
    $("#search-car-firm").hide();
    $("#span_searching").removeClass("collapse_searching").addClass("expand_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");
}

function renderModels(firm) {

    var modelItem = "<div><input type='checkbox' class='checkbox-model' checked='checked' /> <label>@carModel</label></div>";
    var modelsName = "";
    
    switch (firm) {
        case "Acura": modelsName = "CL, EL, ILX, Intergra, Legend"; break;
        case "Audi": modelsName = "Audi1, Audi2, Audi3"; break;
        default: modelsName = "CL, EL, ILX, Intergra, Legend";
    }

    var models = "";
    var modelsArray = modelsName.split(',');
    for (var i = 0 ; i < modelsArray.length; i++)
    {
        models += modelItem.replace("@carModel", modelsArray[i]);
    }
    
    $("#search_model_box").html(models);
}

$(function () {
    renderModels("Acura");
});
