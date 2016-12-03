function ApproveCar(element, carId, username, email, isBuy) {
    common.ShowTitleConfirmMessage("Xoá tin", "Bạn muốn duyệt (approve) tin này?", function () {
        var criteria = { CarId: carId, UserName: username, Email: email, IsBuy: isBuy };

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: '/Car/ApproveCar',
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result > 0) {
                    common.ShowInfoMessage("Tin đã được approved thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                }
                else if (result == 0) {
                    common.ShowErrorMessage('Bạn không có quyền duyệt tin đăng này!');
                }
                else {
                    common.ShowErrorMessage('Lỗi approve tin');
                }
            },
            error: function (xhr) {
                common.ShowErrorMessage('Lỗi approve tin');
            }
        });
    });
}

function DisApproveCar(element, carId, username, email, isBuy) {
    common.ShowTitleConfirmMessage("Xoá tin", "Bạn muốn từ chối (disapprove) tin này?", function () {
        var criteria = { CarId: carId, UserName: username, Email: email, IsBuy: isBuy };

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: '/Car/DisApproveCar',
            data: JSON.stringify(criteria),
            success: function (result) {
                if (result > 0) {
                    common.ShowInfoMessage("Tin đã bị disapproved thành công", function () { $(":button").prop('disabled', 'disabled'); }, function () { setTimeout(function () { location.href = '/car/yours'; }, 1000) });
                }
                else if (result == 0) {
                    common.ShowErrorMessage('Bạn không có quyền từ chối duyệt tin đăng này!');
                }
                else {
                    common.ShowErrorMessage('Lỗi disapprove tin');
                }
            },
            error: function (xhr) {
                common.ShowErrorMessage('Lỗi disapprove tin');
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