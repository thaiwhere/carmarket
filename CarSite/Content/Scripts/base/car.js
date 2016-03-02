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
    $("#search-car-firm").toggle();

    if ($('#span_searching').hasClass("expand_searching")) {
        $("#span_searching").removeClass("expand_searching").addClass("collapse_searching");
    }
    else {
        $("#span_searching").removeClass("collapse_searching").addClass("expand_searching");
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

$(function () {
    $("#search-car-firm").hide();
});