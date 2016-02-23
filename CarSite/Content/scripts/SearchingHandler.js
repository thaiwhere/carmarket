
$("#select-model-all").change(function () {
    $(".checkbox-model").prop('checked', $(this).prop("checked"));
});

$(".car-photo").hover(
  function () {
      var img_name = $(this).find("img").attr('src').split("/").pop();      
      var img_name_only = img_name.substring(1, img_name.length - 4);
      var new_img_src = $(this).find("img").attr('src').replace(img_name_only, img_name_only + "_big");

      $(this).append($("<div class='car-div-large'><img class='car-img-large' src='" + new_img_src +"'></img></div>"));
  }, function () {
      $(this).find("div:last").remove();
  }
);

$(function () {    
    $("#div-left").hide();
    $("#search-car-firm").show();
    $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    $("#div-center").removeClass("div-center").addClass("div-center-searching");    
});