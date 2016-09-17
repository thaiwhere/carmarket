function DeleteCar(element, carId) {
    common.ShowTitleConfirmMessage("Xoá tin", "Bạn muốn xoá tin này?", function () {
        var criteria = { CarId: carId };

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: '/Car/DeleteCar',
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result > 0) {                    
                    common.ShowInfoMessage("Tin đã được xoá thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                }
                else if(result == 0){
                    common.ShowErrorMessage('Bạn không có quyền xoá tin đăng này!');
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

function SaledCar(element, carId) {
    common.ShowTitleConfirmMessage("Xe đã bán", "Bạn muốn thông báo xe đã bán?", function () {
        var criteria = { CarId: carId };

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: '/Car/SaledCar',
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result > 0) {
                    common.ShowInfoMessage("Cập nhật thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                }
                else if (result == 0) {
                    common.ShowErrorMessage('Bạn không có quyền cập nhật tin đăng này!');
                }
                else {
                    common.ShowErrorMessage('Lỗi cập nhật');
                }
            },
            error: function (xhr) {
                common.ShowErrorMessage('Lỗi cập nhật');
            }
        });
    });
}