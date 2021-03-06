﻿function DeleteCar(element, carId, isBuy) {
    common.ShowTitleConfirmMessage("Xoá tin", "Bạn muốn xoá tin này?", function () {
        var criteria = { CarId: carId, IsBuy: isBuy };

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
                else if (result == 0) {
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

function RedirectAfterDeleted()
{    
    switch (tabYourCars)
    {
        case "car_showing": handler.inActiveTab($("#div-car-yours"));
                            $("#car_showing").addClass("tabactive");
                            $(".freegrid").hide();
                            $("#gridCarShowing").show(); break;
                
        case "car_waiting": handler.inActiveTab($("#div-car-yours"));
                            $("#car_waiting").addClass("tabactive");
                            $(".freegrid").hide();
                            $("#gridCarWaiting").show(); break;

        case "car_saled": handler.inActiveTab($("#div-car-yours"));
                            $("#car_saled").addClass("tabactive");
                            $(".freegrid").hide();
                            $("#gridCarSaled").show(); break;

        case "car_notAllow": handler.inActiveTab($("#div-car-yours"));
                            $("#car_notAllow").addClass("tabactive");
                            $(".freegrid").hide();
                            $("#gridCarNotAllow").show(); break;

        case "car_expired": handler.inActiveTab($("#div-car-yours"));
                            $("#car_expired").addClass("tabactive");
                            $(".freegrid").hide();
                            $("#gridCarExpired").show(); break;
    }
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