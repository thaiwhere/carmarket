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
                    common.ShowInfoMessage("Tin đã được xoá thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
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