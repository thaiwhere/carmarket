function DeleteCar(element, carId) {
    var result = confirm("Bạn muốn xoá tin này?");
    if (result) {
        var criteria = { CarId: carId };
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: '/Car/DeleteCar',
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result) {
                    element.closest("tr").remove();
                    alert('Tin đã được xoá thành công');
                }
                else {
                    alert('Lỗi xoá tin');
                }
            },
            error: function (xhr) {
                common.HandleAjaxError(xhr);
            }
        });
    }
}