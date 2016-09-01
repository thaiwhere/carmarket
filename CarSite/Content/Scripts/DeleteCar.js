function DeleteCar(element, carId) {
    common.ShowConfirmMessage("Bạn muốn xoá tin này?", function () {
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
                    common.ShowInfoMessage('Tin đã được xoá thành công');
                }
                else {
                    common.ShowErrorMessage('Lỗi xoá tin');
                }
            },
            error: function (xhr) {
                common.ShowErrorMessage('Lỗi xoá tin');
            }
        });
    });    
}